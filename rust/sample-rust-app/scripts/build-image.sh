#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$REGISTRY_USERNAME" ]]; then
    echo "Please provide a registry username for the image."
    exit 1
  elif [[ -z "$IMAGE_NAME" ]]; then
    echo "Please provide an image name for the image."
    exit 1
  elif [[ -z "$TAG" ]]; then
    echo "Please provide an tag for the image."
    exit 1
  fi
}

function main() {
  check_requirements

  docker build --tag "$REGISTRY_USERNAME/$IMAGE_NAME:$TAG" .
}

main