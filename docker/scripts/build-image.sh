#!/bin/bash

set -e

DOCKERFILE_LOCATION="./Dockerfile"

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
  elif [[ ! -f "$DOCKERFILE_LOCATION" ]]; then
    echo "Please provide a real location for Dockerfile: ${DOCKERFILE_LOCATION}"
    exit 1
  fi
}

function build_image() {
  docker build \
    --tag $REGISTRY_USERNAME/$IMAGE_NAME:$TAG \
    $DOCKERFILE_LOCATION
}

function main() {
  check_requirements
  build_image
}

main