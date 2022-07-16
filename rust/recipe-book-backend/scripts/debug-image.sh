#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$REGISTRY_USERNAME" ]]; then
    echo "Please provide an environment variable 'REGISTRY_USERNAME' for debugging the image."
    exit 1
  elif [[ -z "$IMAGE_NAME" ]]; then
    echo "Please provide an environment variable 'IMAGE_NAME' for debugging the image."
    exit 1
  elif [[ -z "$TAG" ]]; then
    echo "Please provide an environment variable 'TAG' for debugging the image."
    exit 1
  elif [[ -z "$PORT" ]]; then
    echo "Please provide an environment variable 'PORT' for debugging the image."
    exit 1
  elif [[ -z "$DATABASE_CONNECTION_STRING" ]]; then
    echo "Please provide an environment variable 'DATABASE_CONNECTION_STRING' for debugging the image."
    exit 1
  fi
}

function main() {
  check_requirements

  docker run --rm \
    --env DATABASE_CONNECTION_STRING=$DATABASE_CONNECTION_STRING \
    --env PORT=$PORT \
    --publish $PORT:$PORT \
    $REGISTRY_USERNAME/$IMAGE_NAME:$TAG
}

main
