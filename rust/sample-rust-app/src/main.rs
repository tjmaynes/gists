mod extensions;
mod health_check;
mod oauth;
mod api;
mod config;

use std::process;
use log::error;

use api::service::run_service;
use config::{app_config::get_app_config};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    match get_app_config().await {
        Ok(app_config) => run_service(app_config).await,
        Err(err) => {
            error!("{}\n", err.to_string());
            process::exit(1)
        }
    }
}