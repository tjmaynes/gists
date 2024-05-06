#!/bin/bash

set -e

CLOUDFLARE_WORKER_PROJECT_NAME=$1
CLOUDFLARE_WORKER_FILE=$2

function check_requirements() {
  if [[ -z "$(command -v node)" ]]; then
    echo "Please install 'node' program before running this script"
    exit 1
  elif [[ -z "$CLOUDFLARE_ACCOUNT_ID" ]]; then
    echo "Please ensure environment variable 'CLOUDFLARE_ACCOUNT_ID' exists before running this script"
    exit 1
  elif [[ -z "$CLOUDFLARE_API_TOKEN" ]]; then
    echo "Please ensure environment variable 'CLOUDFLARE_API_TOKEN' exists before running this script"
    exit 1
  elif [[ -z "$CLOUDFLARE_WORKER_PROJECT_NAME" ]]; then
    echo "Arg 1 for script 'CLOUDFLARE_WORKER_PROJECT_NAME' was not given..."
    exit 1
  elif [[ -z "$CLOUDFLARE_WORKER_FILE" ]]; then
    echo "Arg 2 for script 'CLOUDFLARE_WORKER_FILE' was not given..."
    exit 1
  fi
}

function main() {
  check_requirements

  ./node_modules/.bin/wrangler deploy "$CLOUDFLARE_WORKER_FILE" \
    --name "$CLOUDFLARE_WORKER_PROJECT_NAME" \
    --compatibility-flags "nodejs_compat" \
    --compatibility-date "2023-10-30"

  echo "Done!"
}

main
