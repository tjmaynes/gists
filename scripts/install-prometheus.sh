#!/bin/bash

set -e

function main() {
  helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
  helm repo add kube-state-metrics https://kubernetes.github.io/kube-state-metrics
  helm repo update

  helm install prometheus prometheus-community/prometheus
}

main
