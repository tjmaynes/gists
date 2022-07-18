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
    elif [[ -z "$ENVIRONMENT" ]]; then
        echo "Please provide an environment for the env-file."
        exit 1
    elif [[ -z "$PORT" ]]; then
        echo "Please provide an port to expose."
        exit 1    
    fi
}

function main() {
    check_requirements

    docker run --rm \
        --publish "$PORT:$PORT" \
        --env-file ".env.${ENVIRONMENT}" \
        $REGISTRY_USERNAME/$IMAGE_NAME:$TAG
}

main