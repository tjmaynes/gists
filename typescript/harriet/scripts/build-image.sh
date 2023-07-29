#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v docker)" ]]; then
    echo "Please install 'docker' before running this script"
    exit 1
  elif [[ -z "$REGISTRY_USERNAME" ]]; then
    echo "Please provide environment variable 'REGISTRY_USERNAME' before running this script"
    exit 1
  elif [[ -z "$IMAGE_NAME" ]]; then
    echo "Please provide environment variable 'IMAGE_NAME' before running this script"
    exit 1
  elif [[ -z "$TAG" ]]; then
    echo "Please provide environment variable 'TAG' before running this script"
    exit 1
  fi
}

function main() {
  check_requirements

  docker build . -t "$REGISTRY_USERNAME/$IMAGE_NAME:$TAG"
}

main
