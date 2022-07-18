use actix_web::{App, HttpResponse, HttpServer, post, get, middleware, web::{self, Data, ServiceConfig}};
use crate::{config::{app_config::AppConfig, database_config::DBConn}, extensions::json::Jsonify, health_check::{domain::HealthCheck, use_cases::HealthcheckUseCases}, oauth::{domain::{NewClientRequest, NewClientResponseError}, use_cases::register_client}};

#[post("/clients")]
async fn create_client(req_body: web::Json<NewClientRequest>, data: Data<AppState>) -> HttpResponse {
    match register_client(&data.db_conn, req_body.into_inner()).await {
        Ok(result) =>
            HttpResponse::Accepted()
                .content_type("application/json")
                .body(result.to_json().to_string()),
        Err(err) => match err {
            NewClientResponseError::Unknown(reason) => HttpResponse::InternalServerError().body(reason)
        }
    }
}

#[get("/health")]
async fn get_health_status(data: Data<AppState>) -> HttpResponse {
    let health_check = HealthCheck::is_ready(&data.db_conn).await;

    if health_check.database_ready {
        return HttpResponse::Ok()
            .content_type("application/json")
            .body(health_check.to_json().to_string());
    } else {
        return HttpResponse::ServiceUnavailable()
            .content_type("application/json")
            .body(health_check.to_json().to_string());
    }
}

fn get_service_config() -> Box<dyn Fn(&mut ServiceConfig)> {
    return Box::new(move |cfg: &mut ServiceConfig| {
        cfg
            .service(get_health_status)
            .service(
                web::scope("/oauth")
                    .service(create_client)
            );
    });
}

struct AppState { db_conn: DBConn }

pub async fn run_service(app_config: AppConfig) -> std::io::Result<()> {
    let app_data = web::Data::new(AppState {
        db_conn: app_config.db_conn
    });

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Compress::default())
            .app_data(app_data.clone())
            .configure(get_service_config())
    })
    .bind(format!("127.0.0.1:{}", app_config.port))?
    .run()
    .await
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{test, App};
    use test::{init_service, call_service, TestRequest, read_body_json};

    use crate::config::{app_config::get_app_config};

    #[actix_rt::test]
    async fn when_user_requests_for_healthcheck_and_db_is_up_it_should_return_healthy() {
        let app_state = web::Data::new(AppState {
            db_conn: get_app_config().await.unwrap().db_conn
        });

        let mut app = init_service(App::new().app_data(app_state).configure(get_service_config())).await;
        let request = TestRequest::get().uri("/health").to_request();
        let response = call_service(&mut app, request).await;
        assert!(response.status().is_success());

        let body: HealthCheck = read_body_json(response).await;
        assert_eq!(body, HealthCheck { database_ready: true })
    }

        // #[actix_rt::test]
        // async fn when_user_creates_a_new_client_and_db_is_up_it_should_return_client_id() {
        //     let app_state = web::Data::new(AppState {
        //         db_conn: get_app_config().await.unwrap().db_conn
        //     });

        //     let mut app = init_service(App::new().app_data(app_state).configure(get_service_config())).await;
        //     let payload = json!({
        //         "application_type": "web",
        //         "redirect_uris": vec![ "https://client.example.org/callback", "https://client.example.org/callback2" ],
        //         "client_name": "My Cool App",
        //         "logo_uri": "https://client.example.org/logo.png",
        //         "token_endpoint_auth_method": "client_secret_basic",
        //         "contacts": vec![ "admin@example.org" ]
        //     });
        //     let request = TestRequest::post().uri("/oauth/clients").set_json(&payload).to_request();
        //     let response = call_service(&mut app, request).await;
        //     assert!(response.status().is_success());

        //     let body = read_body(response).await;
        //     assert_eq!(body, "{\"database_ready\":true}")
        // }
}