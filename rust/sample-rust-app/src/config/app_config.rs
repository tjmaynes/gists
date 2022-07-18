use super::{database_config::{DBConn, DatabaseConfigError, DatabaseConfig, DatabaseConnection}, environment_config::{EnvironmentConfig, EnvironmentConfigError}};

pub struct AppConfig {
    pub db_conn: DBConn,
    pub port: String
}

#[derive(Debug, PartialEq)]
pub enum AppConfigError {
    EnvironmentConfig(EnvironmentConfigError),
    DatabaseConfiguration(DatabaseConfigError),
    Unknown
}

impl AppConfigError {
    pub fn to_string(self) -> String {
        match self {
            Self::DatabaseConfiguration(err) => format!("Database Config: {}", message = err.to_string()),
            Self::EnvironmentConfig(err) => format!("Environment Config: {}", message = err.to_string()),
            Self::Unknown => format!("Something happened!")
        }
    }
}

pub async fn get_app_config() -> Result<AppConfig, AppConfigError> {
    let config_result = EnvironmentConfig::new();

    if let Ok(config) = config_result {
        match DatabaseConfig::get_db_conn(config.database_url.as_str(), None).await {
            Ok(database_config) => Ok(AppConfig {
                db_conn: database_config.db_conn,
                port: config.port
            }),
            Err(err) => Err(AppConfigError::DatabaseConfiguration(err))
        }
    } else if let Err(err) = config_result {
        Err(AppConfigError::EnvironmentConfig(err))
    } else {
        Err(AppConfigError::Unknown)
    }
}

#[cfg(test)]
mod integration_tests {
    use super::get_app_config;

    #[actix_rt::test]
    async fn when_a_database_connection_is_found_it_should_eventually_return_an_app_config() {
        match get_app_config().await {
            Ok(config) => {
                assert_eq!(config.port, std::env::var("PORT").expect("'PORT' should be set!"))
            },
            Err(_) => assert!(false, "Should have received an AppConfig!")
        }
    }
}