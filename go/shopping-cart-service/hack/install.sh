#!/bin/bash

set -e

PACK_VERSION=v0.21.1
DBMATE_VERSION=v1.12.1

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

function download_and_install_pack() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    if [[ `uname -m` == 'arm64' ]]; then
      PACK_SOURCE_URL="https://github.com/buildpacks/pack/releases/download/$PACK_VERSION/pack-$PACK_VERSION-macos-arm64.tgz"
    else
      PACK_SOURCE_URL="https://github.com/buildpacks/pack/releases/download/$PACK_VERSION/pack-$PACK_VERSION-macos.tgz"
    fi
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PACK_SOURCE_URL="https://github.com/buildpacks/pack/releases/download/$PACK_VERSION/pack-$PACK_VERSION-linux.tgz"
  else
    echo "Please install 'pack' using a supported operating system (macos or linux)"
    exit 1
  fi

  if [[ ! -f "bin/pack-$PACK_VERSION.tgz" ]]; then
    (mkdir -p bin || true) && curl -sSL "$PACK_SOURCE_URL" > bin/pack-$PACK_VERSION.tgz
  fi

  tar -xzf bin/pack-$PACK_VERSION.tgz -C bin
  rm -rf bin/pack-$PACK_VERSION*
}

function main() {
  check_requirements

  if [[ -z "$(command -v bin/pack)" ]]; then
    download_and_install_pack
  fi

  if [[ -z "$(command -v bin/dbmate)" ]]; then
    download_and_install_dbmate
  fi

  go install github.com/matryer/moq@latest
  go install github.com/jstemmer/go-junit-report
  go install github.com/axw/gocov/gocov
	go install github.com/AlekSi/gocov-xml
	go install github.com/matm/gocov-html
}

main
