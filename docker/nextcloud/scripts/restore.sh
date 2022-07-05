#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v docker)" ]]; then
    echo "Please install 'docker' before running this script."
    exit 1
  elif [[ ! -d "$BACKUP_DIRECTORY" ]]; then
    echo "No backup directories exist in the file system. Nothing to restore!"
    exit 1
  elif [[ ! -f "$BACKUP_DIRECTORY/nextcloud.tar.gz" ]]; then
    echo "No nextcloud backup directories exist in the file system. Nothing to restore!"
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

function unpack_tarred_backup() {
  BACKUP_LOCATION=$BACKUP_DIRECTORY/$1

  if [[ -d "$BACKUP_DIRECTORY" ]]; then
    rm -rf $BACKUP_LOCATION
    mkdir -p $BACKUP_LOCATION

    tar -xf $BACKUP_LOCATION.tar.gz -C $BACKUP_LOCATION
  fi
}

function print_preamble() {
  CONTAINER_NAME=$1

  echo "Restoring '$CONTAINER_NAME' container volume from backup: $BACKUP_DIRECTORY"
}

function print_postamble() {
  CONTAINER_NAME=$1

  echo "Finished restoring '$CONTAINER_NAME'"
}

function wait_until_host_is_up() {
  HOST=$1

  curl --retry 10 -f --retry-all-errors --retry-delay 5 \
    -s -o /dev/null "$HOST"
}

function wait_until_postgres_is_up() {
  RETRIES=5

  until docker exec -i "nextcloud-db" bash -c "psql -U $NEXTCLOUD_USER -c \"select 1\"" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
    echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
    sleep 1
  done
}

function restore_nextcloud_db() {
  print_preamble "nextcloud-db"

  docker compose --env-file ../.env.$ENVIRONMENT up -d db

  wait_until_postgres_is_up

  docker exec -i "nextcloud-db" \
    bash -c "psql -U $NEXTCLOUD_USER -c \"DROP DATABASE \"$NEXTCLOUD_DATABASE\";\"" || true

  docker exec -i "nextcloud-db" \
    bash -c "psql -U $NEXTCLOUD_USER -c \"CREATE DATABASE \"$NEXTCLOUD_DATABASE\";\""

  docker cp "$BACKUP_DIRECTORY/nextcloud/dump.sql" nextcloud-db:/tmp
  docker exec -i "nextcloud-db" \
    bash -c "psql -U $NEXTCLOUD_USER < /tmp/dump.sql"

  print_postamble "nextcloud-db"
}

function restore_nextcloud() {
  print_preamble "nextcloud-web"

  docker compose --env-file ../.env.$ENVIRONMENT up -d

  wait_until_host_is_up "localhost:8080"

  docker exec -i "nextcloud-web" \
    bash -c "chown -R www-data /var/www/html"

  docker exec -u www-data -i "nextcloud-web" \
    bash -c "php /var/www/html/occ maintenance:mode --on"

  if [[ -d "$BACKUP_DIRECTORY/nextcloud/config" ]]; then
    docker cp "$BACKUP_DIRECTORY/nextcloud/config" nextcloud-web:/var/www/html
  fi

  if [[ -d "$BACKUP_DIRECTORY/nextcloud/themes" ]]; then
    docker cp "$BACKUP_DIRECTORY/nextcloud/themes" nextcloud-web:/var/www/html
  fi

  if [[ -d "$BACKUP_DIRECTORY/nextcloud/data" ]]; then
    docker cp "$BACKUP_DIRECTORY/nextcloud/data" nextcloud-web:/var/www/html
  fi

  docker exec -u www-data -i "nextcloud-web" \
    bash -c "php /var/www/html/occ maintenance:mode --off"

  print_postamble "nextcloud-web" 
}

function restore() {
  unpack_tarred_backup "nextcloud"

  restore_nextcloud_db

  restore_nextcloud
}

function main() {
  check_requirements

  echo "Nextcloud restore needs to be done manually..."
}

main
