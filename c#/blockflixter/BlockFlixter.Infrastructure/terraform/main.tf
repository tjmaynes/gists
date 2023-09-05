resource "azurerm_resource_group" "blockflixter_rg" {
  location = var.resource_group_location
  name     = "blockflixter-rg"
}

# resource "azurerm_virtual_network" "blockflixter_vnet" {
#   name                = "blockflixter-vnet"
#   resource_group_name = azurerm_resource_group.blockflixter_rg.name
#   location            = azurerm_resource_group.blockflixter_rg.location
#   address_space       = ["10.0.0.0/16"]
# }

# resource "azurerm_subnet" "blockflixter_subnet" {
#   name                 = "blockflixter-subnet"
#   resource_group_name  = azurerm_resource_group.blockflixter_rg.name
#   virtual_network_name = azurerm_virtual_network.blockflixter_vnet.name
#   address_prefixes     = ["10.0.1.0/24"]

#   service_endpoints = ["Microsoft.ContainerRegistry"]
# }

resource "azurerm_kubernetes_cluster" "blockflixter_kubernetes_cluster" {
  name                = "blockflixter"
  location            = azurerm_resource_group.blockflixter_rg.location
  resource_group_name = azurerm_resource_group.blockflixter_rg.name
  dns_prefix          = "blockflixter"

  kubernetes_version = "1.26.3"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  # network_profile {
  #   network_plugin     = "azure"
  #   service_cidr       = "172.17.0.0/16"
  #   dns_service_ip     = "172.17.0.10"
  #   docker_bridge_cidr = "172.17.0.1/16"
  #   load_balancer_sku  = "standard"

  #   network_policy = "azure"

  #   # network_plugin {
  #   #   azure {
  #   #     subnet_id = azurerm_subnet.blockflixter_subnet.id
  #   #   }
  #   # }
  # }
}