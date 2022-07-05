#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v docker)" ]]; then
    echo "Please install 'docker' before running this script."
    exit 1
  elif [[ -z "$NEXTCLOUD_DATABASE" ]]; then
    echo "Please set an environment variable for 'NEXTCLOUD_DATABASE' before running this script"
    exit 1
  elif [[ -z "$NEXTCLOUD_DATABASE_PASSWORD" ]]; then
    echo "Please set an environment variable for 'NEXTCLOUD_DATABASE_PASSWORD' before running this script"
    exit 1
  fi
}

function print_preamble() {
  CONTAINER_NAME=$1

  echo "Backing up '$CONTAINER_NAME' container volume..."
}

function print_postamble() {
  CONTAINER_NAME=$1

  echo "Finished backing up: '$CONTAINER_NAME'"
}

function backup_nextcloud() {
  print_preamble "nextcloud-web"

  docker exec -i "nextcloud-web" \
    bash -c "chown -R www-data /var/www/html"

  docker cp nextcloud-web:/var/www/html/data backups/data
  docker cp nextcloud-web:/var/www/html/themes backups/themes
  docker cp nextcloud-web:/var/www/html/config backups/config

  docker exec -u www-data -i "nextcloud-web" \
    bash -c "php /var/www/html/occ maintenance:mode --on"

  docker exec -i "nextcloud-db" \
    bash -c "pg_dump -U $NEXTCLOUD_USER -d $NEXTCLOUD_DATABASE > dump.sql"

  docker cp nextcloud-db:/dump.sql backups/dump.sql
  docker cp nextcloud-db:/var/lib/postgresql/data backups/postgresql

  docker exec -u www-data -i "nextcloud-web" \
    bash -c "php /var/www/html/occ maintenance:mode --off"

  print_postamble "nextcloud-web" 
}

function package_backup() {
  tar -cf nextcloud.tar.gz -C backups . 

  rm -rf backups && mkdir -p backups

  mv nextcloud.tar.gz backups/
}

function main() {
  check_requirements

  mkdir -p backups

  backup_nextcloud

  package_backup
}

main
