#!/bin/bash

set -e

# export RUBY_VERSION=2.6.5
# export RBENV_ROOT="$HOME/.rbenv"
# export PATH="$RBENV_ROOT/bin:$PATH"
# if command -v rbenv 1>/dev/null 2>&1; then
#   eval "$(rbenv init -)"
# fi

RUBY_VERSION=$1

function install_ruby_package() {
  if [[ -x "$(command -v $1)" ]]; then
    echo "$1 already installed..."
  else
    echo "Installing $1..."
    gem install $1
  fi
}

function install_package() {
  if brew list -1 | grep -q "^$1\$"; then
    echo "Package '$1' is already installed..."
  else
    echo "Package '$1' is not installed..."
    brew install $1
  fi
}

function install_homebrew() {
  if [ -f "`which brew`" ]; then
    echo "Homebrew has already been installed..."
  else
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  fi
}

function install_ruby_version_manager() {
  install_package rbenv
}

function install_ruby() {
  if [[ -x "$(command -v rbenv)" ]]; then
    echo "Rbenv is not installed!"
  else
    if rbenv versions --bare | grep -q "^$RUBY_VERSION\$"; then
      echo "Ruby v$RUBY_VERSION is already installed..."
    else
      rbenv install $RUBY_VERSION
    fi

    rbenv global $RUBY_VERSION
  fi
}

function install_xcode_dependencies() {
  install_ruby_package bundler
  install_ruby_package xcode-install
}

function install_xcode() {

}

function main() {
  install_homebrew
  install_ruby_version_manager
  install_ruby
  install_xcode_dependencies
  install_xcode
}

main