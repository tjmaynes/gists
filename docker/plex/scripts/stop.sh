#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v docker)" ]]; then
    echo "Please install 'docker' before running this script."
    exit 1
  elif [[ -z "$PLEX_BASE_DIRECTORY" ]]; then
    echo "Please set an environment variable for 'PLEX_BASE_DIRECTORY' before running this script"
    exit 1
  elif [[ -z "$PLEX_HOSTNAME" ]]; then
    echo "Please set an environment variable for 'PLEX_HOSTNAME' before running this script"
    exit 1
  elif [[ -z "$PLEX_TIMEZONE" ]]; then
    echo "Please set an environment variable for 'PLEX_TIMEZONE' before running this script"
    exit 1
  elif [[ -z "$PLEX_UID" ]]; then
    echo "Please set an environment variable for 'PLEX_UID' before running this script"
    exit 1
  elif [[ -z "$PLEX_GID" ]]; then
    echo "Please set an environment variable for 'PLEX_GID' before running this script"
    exit 1
  fi
}

function main() {
  check_requirements

  docker compose down
}

main
