#!/bin/bash

set -e

function check_requirements() {
  if [[ -z $REGISTRY_USERNAME ]]; then
    echo "Please provide a registry username for the image."
    exit 1
  elif [[ -z $IMAGE_NAME ]]; then
    echo "Please provide an image name for the image."
    exit 1
  elif [[ -z $TAG ]]; then
    echo "Please provide an tag for the image."
    exit 1
  elif [[ -z $REGISTRY_PASSWORD ]]; then
    echo "Please provide a registry password for the image."
    exit 1
  fi
}

function push_image() {
  docker login --username "$REGISTRY_USERNAME" --password "$REGISTRY_PASSWORD"
  docker push "$REGISTRY_USERNAME/$IMAGE_NAME:$TAG"
}

function main() {
  check_requirements
  push_image
}

main