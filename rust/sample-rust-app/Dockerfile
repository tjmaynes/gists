FROM rust:1.54 as builder

WORKDIR /build

COPY Cargo.lock Cargo.lock
COPY Cargo.toml Cargo.toml
ADD src src

RUN cargo build --release

FROM debian:buster-slim

ARG APP=/app

ENV TZ=Etc/UTC \
    APP_USER=appuser \
    APP_NAME=oauth-service

RUN apt-get update \
    && apt-get install -y ca-certificates tzdata \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd ${APP_USER} \
    && useradd -g ${APP_USER} ${APP_USER} \
    && mkdir -p ${APP}

COPY --from=builder /build/target/release/${APP_NAME} ${APP}/${APP_NAME}

RUN chown -R ${APP_USER}:${APP_USER} ${APP}

USER ${APP_USER}

WORKDIR ${APP}

CMD ["./oauth-service"]