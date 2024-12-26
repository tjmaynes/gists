#!/bin/bash

set -e

function check_requirements() {
  if [[ -z "$(command -v python3)" ]]; then
    echo "Please install 'python3' before running this script"
    exit 1
  fi
}

function main() {
  check_requirements

  # create a virtual environment and activate it
  [[ -z "$(command -v virtualenv)" ]] && \
    pip3 install virtualenv

  test -d .venv || virtualenv .venv
  source ".venv/bin/activate"

  # upgrade pip to the latest version
  python3 -m pip install --upgrade pip

  # install dependencies from requirements.txt file
  pip3 install --no-cache -r requirements.txt
}

main