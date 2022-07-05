#!/bin/bash

set -e

function install_program() {
  APT_GET_PACKAGE_NAME=$1; BREW_PACKAGE_NAME=$2

  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo apt-get install $APT_GET_PACKAGE_NAME 
  elif [[ "$OSTYPE" == "darwin"* ]] && [[ -n "$(command -v brew)" ]]; then
    brew install $BREW_PACKAGE_NAME 
  else
    echo "Operating system not supported!"
    exit 1
  fi
}

function main() {
  install_program "smbclient" "samba"
}

main
