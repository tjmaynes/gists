#!/bin/bash

set -e

DB_LOCATION="$PWD/.tmp/$DB_NAME"

function check_requirements() {
  if [[ -z "$DB_NAME" ]]; then
    echo "Please set 'DB_NAME' environment variable for naming the database"
    exit 1
  elif [[ -z "$DB_USER" ]]; then
    echo "Please set 'DB_USER' environment variable for accessing the database."
    exit 1
  elif [[ -z "$DB_HOST" ]]; then
    echo "Please set 'DB_HOST' environment variable for connecting to the database."
    exit 1
  elif [[ -z "$(command -v pg_ctl)" ]]; then
    echo "Please install postgres to the machine."
    exit 1
  elif [[ -z "$(command -v createuser)" ]]; then
    echo "Please install postgres to the machine."
    exit 1
  fi
}

function initialize_db() {
  if [[ ! -d "$DB_LOCATION" ]]; then
    pg_ctl initdb --pgdata="$DB_LOCATION"
  fi
}

function stop_db() {
  pg_ctl stop --pgdata="$DB_LOCATION" || true
}

function start_db() {
  stop_db

  pg_ctl start \
    --pgdata="$DB_LOCATION" \
    --log="$DB_LOCATION/server.log" \
    --options="--unix_socket_directories='$DB_LOCATION'"

  pg_ctl status --pgdata="$DB_LOCATION"
}

function create_db() {
  if [[ -z "$DB_NAME" ]]; then
    echo "Name not given for database!"
    exit 1
  fi

  psql "$DB_NAME" -c '\q' || {
    echo "Creating '$1' database..."
    createdb "$DB_NAME" --host="$DB_HOST"
  }
}

function create_user() {
  createuser --host="$DB_HOST" --superuser "$DB_USER" || true
}

function main() {
  check_requirements

  initialize_db
  start_db
  create_db
  create_user
}

main