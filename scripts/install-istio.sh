#!/usr/bin/env bash

set -e

SERVICE_USER=$1
ISTIO_CHART_VERSION=$2
ISTIO_NAMESPACE=$3
TILLER_NAMESPACE=$4

function check_requirements() {
  if [[ -z "$SERVICE_USER" ]]; then
    echo "Please provide user to allow credentials."
    exit 1
  elif [[ -z "$(command -v helm)" ]]; then
    echo "Please install 'helm' on this machine"
    exit 1
  elif [[ -z "$ISTIO_CHART_VERSION" ]]; then
    echo "Please specify a Helm Istio chart version to use."
    exit 1
  elif [[ -z "$ISTIO_NAMESPACE" ]]; then
    echo "Please specify a namespace for Istio on Kubernetes."
    exit 1
  fi
}

function setup_istio() {
  if [[ -x $(kubectl get namespaces | grep "$ISTIO_NAMESPACE") ]]; then
    kubectl create namespace "$ISTIO_NAMESPACE"
  fi

  helm repo add istio.io "https://storage.googleapis.com/istio-release/releases/$ISTIO_CHART_VERSION/charts/"

  helm fetch --untar --untardir charts "istio.io/istio-init"

  helm template charts/istio-init \
    --name istio-init \
    --namespace $ISTIO_NAMESPACE \
    --set sidecarInjectorWebhook.enabled=false \
    --set grafana.enabled=true \
    --set servicegraph.enabled=true |
    kubectl apply -f -
}

function main() {
  check_requirements

  setup_istio
}

main
