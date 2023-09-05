#!/bin/bash

set -e

function check_requirements() {
    if [[ -z "$(command -v az)" ]]; then
        echo "Please install 'az' tool before running this script"
        exit 1
    elif [[ -z "$(command -v kubectl)" ]]; then
        echo "Please install 'kubectl' tool before running this script"
        exit 1
    fi
}

function main() {
    check_requirements

    # az login

    kubectl delete -f k8s/elastic-cloud.yml || true

    pushd terraform
    terraform destroy
    popd
}

main