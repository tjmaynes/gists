#!/bin/bash

set -e

PACK_VERSION=v0.21.1

function check_requirements() {
  if [[ -z "$(command -v curl)" ]]; then
    echo "Please install 'curl' before running this script"
    exit 1
  fi
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
}

main
