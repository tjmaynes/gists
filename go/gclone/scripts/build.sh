#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v go)" ]]; then
    echo "Please install 'go' before running this script"
    exit 1
  fi
}

function build_executable() {
  echo "Building application for $1 on '$2'"
  GOOS=$1 GOARCH=$2 go build -o ./dist/github-repo-downloader-$1-$2 .
  chmod +x ./dist/github-repo-downloader-$1-$2
}

function build_executables() {
  build_executable $1 "arm64"
  build_executable $1 "amd64"
}

function main() {
  check_requirements

  build_executables "darwin"
  build_executables "linux"
  build_executables "windows"

  echo ""

  echo "Completed building application in ./dist!"
}

main