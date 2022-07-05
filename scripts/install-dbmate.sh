#!/bin/bash

set -e

DBMATE_VERSION=${1:-v1.12.1}

function check_requirements() {
  if [[ -z "$(command -v curl)" ]]; then
    echo "Please install 'curl' before running this script"
    exit 1
  fi
}

function download_and_install_dbmate() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    if [[ `uname -m` == 'arm64' ]]; then
      DBMATE_SOURCE_URL="https://github.com/amacneil/dbmate/releases/download/$DBMATE_VERSION/dbmate-macos-arm64"
    else
      DBMATE_SOURCE_URL="https://github.com/amacneil/dbmate/releases/download/$DBMATE_VERSION/dbmate-macos-amd64"
    fi
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    DBMATE_SOURCE_URL="https://github.com/amacneil/dbmate/releases/download/$DBMATE_VERSION/dbmate-linux-amd64"
  else
    echo "Please install 'pack' using a supported operating system (macos or linux)"
    exit 1
  fi

  (mkdir -p bin || true) && curl -sSL "$DBMATE_SOURCE_URL" > bin/dbmate
  chmod +x ./bin/dbmate
}

function main() {
  check_requirements

  if [[ -z "$(command -v bin/dbmate)" ]]; then
    download_and_install_dbmate
  fi
}

main
