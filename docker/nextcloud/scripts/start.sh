#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v docker)" ]]; then
    echo "Please install 'docker' before running this script."
    exit 1
  elif [[ -z "$NEXTCLOUD_USER" ]]; then
    echo "Please set an environment variable for 'NEXTCLOUD_USER' before running this script"
    exit 1
  elif [[ -z "$NEXTCLOUD_ADMIN_USER" ]]; then
    echo "Please set an environment variable for 'NEXTCLOUD_ADMIN_USER' before running this script"
    exit 1
  elif [[ -z "$NEXTCLOUD_ADMIN_PASSWORD" ]]; then
    echo "Please set an environment variable for 'NEXTCLOUD_ADMIN_PASSWORD' before running this script"
    exit 1
  elif [[ -z "$NEXTCLOUD_DATABASE" ]]; then
    echo "Please set an environment variable for 'NEXTCLOUD_DATABASE' before running this script"
    exit 1
  elif [[ -z "$NEXTCLOUD_DATABASE_PASSWORD" ]]; then
    echo "Please set an environment variable for 'NEXTCLOUD_DATABASE_PASSWORD' before running this script"
    exit 1
  elif [[ -z "$NEXTCLOUD_DATABASE_PORT" ]]; then
    echo "Please set an environment variable for 'NEXTCLOUD_DATABASE_PORT' before running this script"
    exit 1
  elif [[ -z "$NEXTCLOUD_REDIS_PORT" ]]; then
    echo "Please set an environment variable for 'NEXTCLOUD_REDIS_PORT' before running this script"
    exit 1
  fi
}

function main() {
  check_requirements

  docker compose --env-file ../.env.$ENVIRONMENT up -d
}

main
