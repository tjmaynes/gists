use log::info;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
use async_trait::async_trait;

use std::{fmt, time::Duration};

#[derive(Debug, PartialEq)]
pub enum DatabaseConfigError {
    Timeout,
    Unknown(String)
}

impl fmt::Display for DatabaseConfigError {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_fmt(format_args!("EnvironmentConfigError(error=\"{}\")", self))
    }
}

impl DatabaseConfigError {
    pub fn to_string(self) -> String {
        match self {
            Self::Timeout => "Connection timeout".to_string(),
            Self::Unknown(reason) => reason
        }
    }
}

pub type DBConn = Pool<Postgres>;

pub struct DatabaseConfig {
    pub db_conn: DBConn
}

#[async_trait]
pub trait DatabaseConnection {
    async fn get_db_conn(database_connection_url: &str, connection_timeout: Option<Duration>) -> Result<DatabaseConfig, DatabaseConfigError>;
}

#[async_trait]
impl DatabaseConnection for DatabaseConfig {
    async fn get_db_conn(database_connection_url: &str, connection_timeout: Option<Duration>) -> Result<DatabaseConfig, DatabaseConfigError> {
        info!("Attempting database connection...");

        match PgPoolOptions::new()
            .max_connections(5)
            .connect_timeout(connection_timeout.unwrap_or(Duration::new(30, 0)))
            .connect(database_connection_url)
            .await {
                Ok(db_conn_pool) => Ok(DatabaseConfig { db_conn: db_conn_pool }),
                Err(e) => match e {
                    sqlx::Error::PoolTimedOut => Err(DatabaseConfigError::Timeout),
                    _ => Err(DatabaseConfigError::Unknown(format!("{:?}", e)))
                }
            }
    }
}

#[cfg(test)]
mod integration_test {
    use std::time::Duration;
    use crate::config::database_config::{DatabaseConfig, DatabaseConfigError, DatabaseConnection};

    #[actix_rt::test]
    async fn when_a_database_connection_is_received_it_should_return_a_database_config() {
        let database_connection_url = std::env::var("DATABASE_URL").expect("'DATABASE_URL' should be set!");
        let connection_timeout = Some(Duration::new(5, 0));

        match DatabaseConfig::get_db_conn(database_connection_url.as_str(), connection_timeout).await {
            Ok(_) => assert!(true, "Received a DatabaseConfig"),
            Err(_) => assert!(false, "Should have received a DatabaseConfig!")
        }
    }

    #[actix_rt::test]
    async fn when_a_database_connection_timeout_received_it_should_return_a_database_config_error() {
        let database_connection_url = "http://hello.com";
        let connection_timeout = Some(Duration::new(0, 5));

        match DatabaseConfig::get_db_conn(database_connection_url, connection_timeout).await {
            Ok(_) => assert!(false, "Should not have received a DatabaseConfig!"),
            Err(err) => assert_eq!(err, DatabaseConfigError::Timeout)
        }
    }

    #[actix_rt::test]
    async fn when_a_database_connection_failed_for_an_unknown_reason_it_should_return_a_database_config_error() {
        let database_connection_url = "postgres://postgres@localhost:5432/somedb?sslmode=disable";
        let connection_timeout = Some(Duration::new(5, 0));

        match DatabaseConfig::get_db_conn(database_connection_url, connection_timeout).await {
            Ok(_) => assert!(false, "Should not have received a DatabaseConfig!"),
            Err(err) => assert!(matches!(err, DatabaseConfigError::Unknown {..}))
        }
    }
}