# Health Check Rust
> This project is the source repository for a [blog post](https://tjmaynes.com/posts/adding-a-health-api-endpoint-to-your-rust-microservice/) on building a custom health check endpoint into a rust microservice.

## Requirements

- [Rust](https://www.rust-lang.org/)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)
- [Docker](https://www.docker.com/get-started)

## Usage

To install rust stable, run the following command:
```bash
rustup toolchain install stable
```

To install project dependencies, run the following command:
```bash
cargo install --path .
```

To run the project, run the following command:
```bash
DATABASE_URL=postgres://root:postgres@localhost:5432?sslmode=disable \
cargo run
```

To run PostgreSQL using Docker Compose, run the following command:
```bash
docker compose up
```