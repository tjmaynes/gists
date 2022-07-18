use crate::config::database_config::DBConn;

use super::domain::{NewClientRequest, NewClientResponse, NewClientResponseError};

pub async fn register_client(_db_conn: &DBConn, _client: NewClientRequest) -> Result<NewClientResponse, NewClientResponseError> {
    return Err(NewClientResponseError::Unknown("not implemented!".to_string()))
}