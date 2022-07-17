#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v bazel)" ]]; then
    echo "Please install bazel before being able to setup Tulsi.app"
    exit 1
  elif [[ -z "$XCODE_VERSION" ]]; then
    echo "Please set an XCODE_VERSION environment variable for installing Tulsi.app"
    exit 1
  fi
}

function install_tulsi_app() {
  bazel build @build_bazel_tulsi//:tulsi \
    --use_top_level_targets_for_symlinks \
    --xcode_version=$XCODE_VERSION

  (mkdir -p bin/tulsi || true) && unzip \
    -oq "bazel-bin/external/build_bazel_tulsi/tulsi.zip" \
    -d "bin/tulsi"

  open bin/tulsi/Tulsi.app
}

function main() {
  check_requirements

  [[ ! -f ./bin/tulsi/Tulsi.app ]] && install_tulsi_app
}

main
