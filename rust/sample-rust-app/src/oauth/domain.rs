use serde_json::json;
use serde::Deserialize;

use crate::extensions::json::Jsonify;

pub struct OAuth {}

impl Jsonify for OAuth {
    fn to_json(self) -> serde_json::Value {
        json!({})
    }
}

#[derive(Debug, Deserialize)]
pub struct NewClientRequest {
    pub application_type: String,
    pub redirect_uris: Vec<String>,
    pub client_name: String,
    pub logo_uri: String,
    pub token_endpoint_auth_method: String,
    pub contacts: Vec<String>
}

pub struct NewClientResponse {
    pub client_id: String,
    pub client_secret: String,
    pub client_secret_expires_at: u16,
    pub registration_access_token: String,
    pub registration_client_uri: String,
    pub client_name: String,
    pub logo_uri: String,
    pub contacts: Vec<String>,
    pub application_type: String,
    pub grant_types: Vec<String>,
    pub response_types: Vec<String>,
    pub redirect_uris: Vec<String>,
    pub token_endpoint_auth_method: String, 
    pub id_token_signed_response_alg: String,
    pub subject_type: String
}

impl Jsonify for NewClientResponse {
    fn to_json(self) -> serde_json::Value {
        json!({
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "client_secret_expires_at": self.client_secret_expires_at,
            "registration_access_token": self.registration_access_token,
            "registration_client_uri": self.registration_client_uri,
            "client_name": self.client_name,
            "logo_uri": self.logo_uri,
            "contacts": self.contacts,
            "application_type": self.application_type,
            "grant_types": self.grant_types,
            "response_types": self.response_types,
            "redirect_uris": self.redirect_uris,
            "token_endpoint_auth_method": self.token_endpoint_auth_method,
            "id_token_signed_response_alg": self.id_token_signed_response_alg,
            "subject_type": self.subject_type
        })
    }
}

pub enum NewClientResponseError {
    Unknown(String)
}