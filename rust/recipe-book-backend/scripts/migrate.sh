#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v bin/dbmate)" ]]; then
    echo "Please install 'dbmate' before running the migration script"
    exit 1
  elif [[ -z "$DATABASE_CONNECTION_STRING" ]]; then
    echo "Please provide a connection string for accessing the database."
    exit 1
  fi
}

function main() {
  check_requirements

  bin/dbmate \
  --url "$DATABASE_CONNECTION_STRING" \
  wait

  bin/dbmate \
    --migrations-dir db/migrations \
    --schema-file db/schema.sql \
    --url "$DATABASE_CONNECTION_STRING" \
    up
}

main
