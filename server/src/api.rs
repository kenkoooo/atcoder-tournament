use crate::auth;
use crate::db::{self, UserData};
use actix_web::cookie::{Cookie, CookieJar, SameSite};
use actix_web::http::header::{ACCESS_CONTROL_ALLOW_CREDENTIALS, ACCESS_CONTROL_ALLOW_ORIGIN};
use actix_web::http::StatusCode;
use actix_web::{get, post, web, HttpRequest, HttpResponse, HttpResponseBuilder};
use anyhow::Context;
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::fmt::{Debug, Display, Formatter};

#[derive(Deserialize)]
pub struct StageRequest {
    user_id: String,
}

#[derive(Serialize)]
struct StageResponse {
    token: String,
}

#[post("/api/stage")]
pub async fn post_stage(
    request: web::Json<StageRequest>,
    pg_pool: web::Data<PgPool>,
) -> actix_web::Result<HttpResponse> {
    let token = r(auth::stage(&request.user_id, pg_pool.as_ref()).await)?;
    let response = StageResponse { token };

    let response = HttpResponseBuilder::new(StatusCode::OK)
        .append_header(("Access-Control-Allow-Origin", "*"))
        .append_header((ACCESS_CONTROL_ALLOW_CREDENTIALS, "true"))
        .json(&response);
    Ok(response)
}

#[derive(Deserialize)]
pub struct SignupRequest {
    user_id: String,
}

#[post("/api/signup")]
pub async fn post_signup(
    request: web::Json<SignupRequest>,
    pg_pool: web::Data<PgPool>,
) -> actix_web::Result<HttpResponse> {
    let token = r(auth::signup(&request.user_id, pg_pool.as_ref()).await)?;
    CookieJar::new();
    let response = HttpResponseBuilder::new(StatusCode::OK)
        .cookie(
            Cookie::build("token", token)
                .same_site(SameSite::None)
                .finish(),
        )
        .cookie(
            Cookie::build("user_id", &request.user_id)
                .same_site(SameSite::None)
                .finish(),
        )
        .append_header((ACCESS_CONTROL_ALLOW_ORIGIN, "*"))
        .append_header((ACCESS_CONTROL_ALLOW_CREDENTIALS, "true"))
        .finish();
    Ok(response)
}

fn r<T>(result: anyhow::Result<T>) -> actix_web::Result<T> {
    let value = result.map_err(|e| {
        log::error!("{:?}", e);
        IntermediateError(format!("{:?}", e))
    })?;
    Ok(value)
}

#[derive(Serialize)]
struct VerifyResponse {
    user_id: String,
}

#[get("/api/verify")]
pub async fn get_verify(
    http_request: HttpRequest,
    pg_pool: web::Data<PgPool>,
) -> actix_web::Result<HttpResponse> {
    let token = http_request.get_token()?;
    let user_id = http_request.get_user_id()?;
    let verified = r(auth::verify(&user_id, &token, pg_pool.as_ref()).await)?;
    if verified {
        let response = VerifyResponse { user_id };
        let response = HttpResponseBuilder::new(StatusCode::OK)
            .append_header(("Access-Control-Allow-Origin", "*"))
            .append_header((ACCESS_CONTROL_ALLOW_CREDENTIALS, "true"))
            .json(&response);
        Ok(response)
    } else {
        Ok(HttpResponse::new(StatusCode::UNAUTHORIZED))
    }
}

#[post("/api/save_data")]
pub async fn post_save_data(
    http_request: HttpRequest,
    request: web::Json<UserData>,
    pg_pool: web::Data<PgPool>,
) -> actix_web::Result<HttpResponse> {
    let token = http_request.get_token()?;
    let user_id = http_request.get_user_id()?;
    let verified = r(auth::verify(&user_id, &token, pg_pool.as_ref()).await)?;
    if verified {
        r(db::put_user_data(&user_id, &request.0, pg_pool.as_ref()).await)?;
        let response = HttpResponseBuilder::new(StatusCode::OK)
            .append_header(("Access-Control-Allow-Origin", "*"))
            .append_header((ACCESS_CONTROL_ALLOW_CREDENTIALS, "true"))
            .finish();
        Ok(response)
    } else {
        Ok(HttpResponse::new(StatusCode::UNAUTHORIZED))
    }
}

#[get("/api/data")]
pub async fn get_data(
    http_request: HttpRequest,
    pg_pool: web::Data<PgPool>,
) -> actix_web::Result<HttpResponse> {
    let token = http_request.get_token()?;
    let user_id = http_request.get_user_id()?;
    let verified = r(auth::verify(&user_id, &token, pg_pool.as_ref()).await)?;
    if verified {
        let data = r(db::get_user_data(&user_id, pg_pool.as_ref()).await)?;
        let response = HttpResponseBuilder::new(StatusCode::OK)
            .append_header(("Access-Control-Allow-Origin", "*"))
            .append_header((ACCESS_CONTROL_ALLOW_CREDENTIALS, "true"))
            .json(&data);
        Ok(response)
    } else {
        Ok(HttpResponse::new(StatusCode::UNAUTHORIZED))
    }
}

#[get("/api/users")]
pub async fn get_users(pg_pool: web::Data<PgPool>) -> actix_web::Result<HttpResponse> {
    let users = r(db::get_users(pg_pool.as_ref()).await)?;
    let response = HttpResponseBuilder::new(StatusCode::OK)
        .append_header(("Access-Control-Allow-Origin", "*"))
        .append_header((ACCESS_CONTROL_ALLOW_CREDENTIALS, "true"))
        .json(&users);
    Ok(response)
}

#[derive(Debug)]
struct IntermediateError(String);

impl Display for IntermediateError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl actix_web::ResponseError for IntermediateError {}

trait HttpRequestExt {
    fn get_token(&self) -> actix_web::Result<String>;
    fn get_user_id(&self) -> actix_web::Result<String>;
}

impl HttpRequestExt for HttpRequest {
    fn get_token(&self) -> actix_web::Result<String> {
        let token = r(self.cookie("token").context("No token"))?;
        Ok(token.value().to_string())
    }

    fn get_user_id(&self) -> actix_web::Result<String> {
        let user_id = r(self.cookie("user_id").context("No user_id"))?;
        Ok(user_id.value().to_string())
    }
}
