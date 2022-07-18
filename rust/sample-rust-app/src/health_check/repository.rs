use crate::config::database_config::DBConn;

pub struct HealthcheckRepository {}

impl HealthcheckRepository {
    pub async fn is_database_ready(db_conn: &DBConn) -> bool {
        let h = sqlx::query("SELECT 1")
            .fetch_one(db_conn)
            .await;

        println!(h)

        return h.is_ok()
    }
}
