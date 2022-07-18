use async_trait::async_trait;
use crate::config::database_config::DBConn;
use super::{domain::HealthCheck, repository::HealthcheckRepository};

#[async_trait]
pub trait HealthcheckUseCases {
    async fn is_ready(db_conn: &DBConn) -> HealthCheck;
}

#[async_trait]
impl HealthcheckUseCases for HealthCheck {
    async fn is_ready(db_conn: &DBConn) -> HealthCheck {
        HealthCheck { database_ready: HealthcheckRepository::is_database_ready(db_conn).await }
    }
}