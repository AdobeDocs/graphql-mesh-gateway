---
title: Command Reference
description: A description of the CLI commands available for API Mesh for Adobe Developer App Builder.
---

# Command Reference

The API Mesh for Adobe Developer App Builder CLI allows you to manage and modify meshes. This page covers commands exclusive to API Mesh for Adobe Developer App Builder. For authorization and other Adobe I/O Extensible CLI commands, refer to the [Adobe IO CLI command list]. For installation instructions, refer to [Getting Started].

All commands on this page support the `--help` argument, which provides information about the command.

## aio api-manager:mesh:create

Creates a new mesh based on the settings in the specified `JSON` file in your working directory. After creating your mesh, you will receive a  `meshId`, like `bright-cloud-plastic-2pUkDmZd`, to refer to it in the future. For more information, see [Creating a mesh].

### Usage

```bash
aio api-manager:mesh:create [FILE]
```

### Arguments

  FILE    The JSON file that contains your mesh's handlers and transforms.

### Example

```bash
aio api-manager:mesh:create mesh.json
```

#### Response

```terminal
Successfully created a mesh with the ID: bright-cloud-plastic-2pUkDmZd
```

## aio api-manager:mesh:update

Updates an existing mesh based on the settings in the specified `JSON` file. For more information, see [Updating a mesh].

### Usage

```bash
aio api-manager:mesh:update [MESHID] [FILE]
```

### Arguments

  MESHID  The name of the existing meshId that you want to update.

  FILE    The JSON file that contains your mesh's handlers and transforms.

### Example

```bash
aio api-manager:mesh:update mesh1 mesh.json
```

#### Response

```terminal
Successfully updated the mesh with the id: bright-cloud-plastic-2pUkDmZd
```

## aio api-manager:mesh:get

Retrieves the current `JSON` mesh file for the specified mesh.

### Usage

```bash
aio api-manager:mesh:get [MESHID] [DOWNLOAD]
```

### Arguments

  MESHID    The name of the existing meshId that you want to view.
  
  DOWNLOAD  (Optional) specify the local filename to create from the mesh.

### Example

```bash
aio api-manager:mesh:get bright-cloud-plastic-2pUkDmZd
```

#### Response

```terminal
Successfully retrieved mesh {
  "lastUpdated": "2022-06-01T12:12:12.0000",
  "meshConfig": {
    "sources": [
      {
        "name": "Commerce",
        "handler": {
          "graphql": {
            "endpoint": "https://<your_commerce_site>/graphql/"
          }
        }
      },
      {
        "name": "AEM",
        "handler": {
          "graphql": {
            "endpoint": "https://<your_AEM_site>/endpoint.json"
          }
        }
      },
      {
        "name": "LiveSearch",
        "handler": {
          "graphql": {
            "endpoint": "https://<your_commerce_site>/search/graphql",
            "operationHeaders": {
              "Magento-Store-View-Code": "default",
              "Magento-Website-Code": "base",
              "Magento-Store-Code": "main_website_store",
              "Magento-Environment-Id": "<your_environment_id>",
              "x-api-key": "search_gql",
              "Content-Type": "application/json"
            },
            "schemaHeaders": {
              "Magento-Store-View-Code": "default",
              "Magento-Website-Code": "base",
              "Magento-Store-Code": "main_website_store",
              "Magento-Environment-Id": "<your_environment_id>",
              "x-api-key": "search_gql",
              "Content-Type": "application/json"
            }
          }
        }
      }
    ]
  },
  "meshId": "bright-cloud-plastic-2pUkDmZd",
  "lastUpdatedBy": {
    "firstName": "User",
    "lastName": "Name",
    "userEmail": "uname@domain.com",
    "userId": "A4BF2F3C61FC531A0A494210@AdobeID",
    "displayName": "User%20Name"
  }
}
```

## aio api-manager:mesh:delete meshId

Deletes the mesh from the selected workspace.

### Usage

```bash
aio api-manager:mesh:delete [MESHID]
```

### Arguments

  MESHID    The name of the existing meshId that you want to view.

### Example

```bash
aio api-manager:mesh:delete bright-cloud-plastic-2pUkDmZd
```

### Response

```terminal
Successfully deleted bright-cloud-plastic-2pUkDmZd
```

<!-- Link Definitions -->
[Getting Started]: getting-started.md
[Adobe IO CLI command list]: https://github.com/adobe/aio-cli#commands
[Creating a mesh]: create-mesh.md
[Updating a mesh]: create-mesh.md#update_an_existing_mesh
