#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v docker)" ]]; then
    echo "Please install 'docker' before running this script"
    exit 1
  elif [[ -z "$IMAGE_NAME" ]]; then
    echo "Please provide environment variable 'IMAGE_NAME' before running this script"
    exit 1
  elif [[ -z "$PORT" ]]; then
    echo "Please provide environment variable 'PORT' before running this script"
    exit 1
  fi
}

function main() {
  check_requirements

  docker run -d -p "$PORT:$PORT" -e PORT="$PORT" "$IMAGE_NAME"
}

main
