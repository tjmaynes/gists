#!/bin/sh

set -e

VERSION=${1:-v0.9.1}
OS_DISTRIBUTION=${2:-linux}
ARCHITECTURE=${3:-amd64}

function check_requirements() {
  if [[ -z "$(command -v docker)" ]]; then
    echo "Please install 'docker' before running this script"
    exit 1
  elif [[ -z "$(command -v kubectl)" ]]; then
    echo "Please install 'kubectl' before running this script"
    exit 1
  fi
}

function install_tap() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    if [[ -z "$(command -v brew)" ]]; then
      echo "Please install 'homebrew' before running this script"
      exit 1
    fi

    brew install vmware-tanzu/tanzu/tanzu-community-edition
    $(brew --prefix vmware-tanzu/tanzu/tanzu-community-edition)/libexec/configure-tce.sh
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    mkdir -p "tmp" || true

    pushd tmp
      curl -H "Accept: application/vnd.github.v3.raw" \
        -L https://api.github.com/repos/vmware-tanzu/community-edition/contents/hack/get-tce-release.sh | \
        bash -s "$VERSION" "$OS_DISTRIBUTION"

      tar xzvf "tce-$OS_DISTRIBUTION-$ARCHITECTURE-$VERSION.tar.gz"
      cd "tce-$OS_DISTRIBUTION-$ARCHITECTURE-$VERSION" && ./install.sh
    popd
  else
    echo "Operating system not supported!"
    exit 1
  fi
}

function main() {
  check_requirements

  if [[ -z "$(command -v tanzu)" ]]; then
    install_tap
  fi
}

main