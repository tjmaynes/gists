#!/bin/bash

set -e

function check_requirements() {
  if [[ ! -f "./Makefile" ]]; then
    echo "This script assumes a Makefile containing 'test' target exists in root of project."
    exit 1
  fi
}

function check_for_unstaged_code() {
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "You have unstaged code that needs to be committed!"
    exit 1
  fi
}

function run_all_tests() {
  make test
}

function push_code() {
  git push
}

function main() {
  check_for_unstaged_code
  run_all_tests
  push_code
}

main