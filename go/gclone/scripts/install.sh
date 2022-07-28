#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v go)" ]]; then
    echo "Please install 'go' before running this script"
    exit 1
  fi
}

function main() {
  check_requirements

  go install github.com/spf13/cobra-cli@v1.3.0
  go get -u github.com/spf13/cobra@v1.4.0
}

main
