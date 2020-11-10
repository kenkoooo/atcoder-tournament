FROM rust:1.44.0 AS builder

WORKDIR /app

RUN mkdir ./src
RUN touch ./src/lib.rs
ADD ./server/Cargo.toml .
ADD ./Cargo.lock .

RUN cargo build --release
RUN rm -rf ./src
ADD ./server/src ./src
RUN cargo build --release

FROM rust:1.44.0
COPY --from=builder /app/target/release/server /usr/bin/server

CMD server
