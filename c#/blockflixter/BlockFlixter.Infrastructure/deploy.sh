#!/bin/bash

set -e

function check_requirements() {
    if [[ -z "$(command -v az)" ]]; then
        echo "Please install 'az' before running this script"
        exit 1
    elif [[ -z "$(command -v kubectl)" ]]; then
        echo "Please install 'kubectl' before running this script"
        exit 1
    elif [[ -z "$(command -v helm)" ]]; then
        echo "Please install 'helm' before running this script"
        exit 1
    fi
}

function deploy_aks() {
    pushd terraform || exit
    terraform init
    terraform apply
    popd || exit
}

function test_elk_stack() {
    ELASTICSEARCH_PASSWORD=$(kubectl get secret blockflixter-es-elastic-user -n blockflixter-search -o=jsonpath='{.data.elastic}' | base64 --decode)

    ELASTICSEARCH_IP=$(kubectl get svc blockflixter-es-http -n blockflixter-search -o=jsonpath='{.status.loadBalancer.ingress[0].ip}')
    ELASTICSEARCH_URL="https://$ELASTICSEARCH_IP:9200"

    echo "Pinging elasticsearch url: $ELASTICSEARCH_URL..."

    until curl --silent --head --fail -u "elastic:$ELASTICSEARCH_PASSWORD" -k "$ELASTICSEARCH_URL"; do
        printf '.'
        sleep 5
    done

    KIBANA_IP=$(kubectl get svc blockflixter-kb-http -n blockflixter-search -o=jsonpath='{.status.loadBalancer.ingress[0].ip}')
    KIBANA_URL="https://$KIBANA_IP:5601/login"

    echo "Pinging kibana url: $KIBANA_URL..."

    until curl --silent --head --fail -k "$KIBANA_URL"; do
        printf '.'
        sleep 5
    done

    echo -e "***\nKibana credentials\nURL: ${KIBANA_URL}\nUsername: elastic\nPassword: $ELASTICSEARCH_PASSWORD\n***"
}

function deploy_elk_stack() {
    az aks get-credentials --resource-group blockflixter-rg --name blockflixter

    if ! kubectl get ns | grep "elastic-" >& /dev/null; then
        helm repo add elastic https://helm.elastic.co
        helm repo update

        helm install elastic-operator elastic/eck-operator -n elastic-system --create-namespace
    fi

    if ! kubectl get namespace | grep "blockflixter-search" >& /dev/null; then
        kubectl create namespace blockflixter-search
    fi

    kubectl apply -f k8s/elastic-cloud.yml

    echo -e "\n"

    test_elk_stack
}

function main() {
    check_requirements

    # deploy_aks
    deploy_elk_stack
}

main