terraform {
  required_version = ">=0.12"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.59.0"
    }
  }
}

provider "azurerm" {
  features {}
}
