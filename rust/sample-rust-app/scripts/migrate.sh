#!/bin/bash

set -e

HOST=$1
PORT=$2

function check_requirements() {
  if [[ -z "$HOST" ]]; then
    echo "Please provide a host to listen for."
    exit 1
  elif [[ -z "$PORT" ]]; then
    echo "Please provide a port to listen for."
    exit 1
  elif [[ -z "$(command -v pg_isready)" ]]; then
    echo "Please install 'pg_isready' to ensure PostgreSQL is ready to be connected to."
    exit 1
  fi        
}

function wait_for_postgres() {
  while ! pg_isready --host "$HOST" --port "$PORT" --quiet; do sleep 1 ; done
}

function main() {
  check_requirements

  wait_for_postgres
  if [[ -d "migrations" ]]; then
    sqlx database setup
  fi
}

main
