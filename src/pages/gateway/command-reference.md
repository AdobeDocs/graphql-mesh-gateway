---
title: Command Reference
description: A description of the CLI commands available for API Mesh for Adobe Developer App Builder.
---

# Command Reference

The API Mesh for Adobe Developer App Builder CLI allows you to manage and modify meshes. This page covers commands exclusive to the API Mesh. For authorization and other Adobe I/O Extensible CLI commands, refer to the [Adobe IO CLI command list]. For installation instructions, refer to [Getting Started].

All commands on this page support the `--help` argument, which provides information about the command.

## aio api-mesh:create

Creates a new mesh based on the settings in the specified `JSON` file in your working directory. After creating your mesh, you will receive a  `meshId`, like `12a3b4c5-6d78-4012-3456-7e890fa1bcde`, to refer to it in the future. For more information, see [Creating a mesh].

### Usage

```bash
aio api-mesh:create [FILE]
```

### Arguments

`FILE` The JSON file that contains your mesh's handlers and transforms.

### Example

```bash
aio api-mesh:create mesh.json
```

#### Response

```terminal
Successfully created mesh: 12a3b4c5-6d78-4012-3456-7e890fa1bcde
{
"meshConfig": {
    "sources": [
      {
        "name": "Commerce",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql/"
          }
        }
      }
    ]
  }
}
Successfully create API Key: 1234567ab8c901a2b345c67d8ef9012a
Successfully subscribed API Key 1234567ab8c901a2b345c67d8ef9012a to API Mesh service.
Mesh Endpoint: https://graph.adobe.io/api/12a3b4c5-6d78-4012-3456-7e890fa1bcde/graphql?api_key=1234567ab8c901a2b345c67d8ef9012a
```

## aio api-mesh:update

Updates an existing mesh based on the settings in the specified `JSON` file. For more information, see [Updating a mesh].

### Usage

```bash
aio api-mesh:update [MESHID] [FILE]
```

### Arguments

`MESHID` The name of the existing meshId that you want to update.

`FILE` The JSON file that contains your mesh's handlers and transforms.

### Example

```bash
aio api-mesh:update mesh1 mesh.json
```

#### Response

```terminal
Successfully updated the mesh with the id: 12a3b4c5-6d78-4012-3456-7e890fa1bcde
```

## aio api-mesh:get

Retrieves the current `JSON` mesh file for the specified mesh.

### Usage

```bash
aio api-mesh:get [MESHID] [DOWNLOAD]
```

### Arguments

`MESHID` The name of the existing meshId that you want to view.
  
`DOWNLOAD` (Optional) specify the local filename to create from the mesh.

### Example

```bash
aio api-mesh:get 12a3b4c5-6d78-4012-3456-7e890fa1bcde
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
  "meshId": "12a3b4c5-6d78-4012-3456-7e890fa1bcde",
  "lastUpdatedBy": {
    "firstName": "User",
    "lastName": "Name",
    "userEmail": "uname@domain.com",
    "userId": "A4BF2F3C61FC531A0A494210@AdobeID",
    "displayName": "User%20Name"
  }
}
```

## aio api-mesh:delete meshId

Deletes the mesh from the selected workspace and unsubscribes the API key from the API Mesh service.

<InlineAlert variant="info" slots="text"/>

The `aio api-mesh:delete` command does not delete the API key in case other services use it.

### Usage

```bash
aio api-mesh:delete [MESHID]
```

### Arguments

  MESHID    The name of the existing meshId that you want to view.

### Example

```bash
aio api-mesh:delete 12a3b4c5-6d78-4012-3456-7e890fa1bcde
```

### Response

```terminal
Successfully deleted 12a3b4c5-6d78-4012-3456-7e890fa1bcde
```

## aio api-mesh:describe

Returns a list of projects. Select a project to display its organization, project, workspace, and mesh IDs.

### Usage

```bash
aio api-mesh:describe
```

### Response

```terminal
Successfully retrieved mesh details

Org ID: 123456
Project ID: 1234567890123456789
Workspace ID: 2345678901234567890
Mesh ID: 12a3b4c5-6d78-4012-3456-7e890fa1bcde
```

<!-- Link Definitions -->
[Getting Started]: getting-started.md
[Adobe IO CLI command list]: https://github.com/adobe/aio-cli#commands
[Creating a mesh]: create-mesh.md
[Updating a mesh]: create-mesh.md#update-an-existing-mesh
