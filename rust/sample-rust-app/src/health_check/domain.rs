use serde::{Serialize, Deserialize};
use serde_json::json;

use crate::extensions::json::Jsonify;

#[derive(Debug, Deserialize, Serialize, PartialEq)]
pub struct HealthCheck {
    pub database_ready: bool
}

impl Jsonify for HealthCheck {
    fn to_json(self) -> serde_json::Value {
        json!({ "database_ready": self.database_ready })
    }
}