---
title: Command Reference
description: A description of the CLI commands available for API Mesh for Adobe Developer App Builder.
---

# Command Reference

The API Mesh for Adobe Developer App Builder CLI allows you to manage and modify meshes. This page covers commands exclusive to the API Mesh. For authorization and other Adobe I/O Extensible CLI commands, refer to the [Adobe IO CLI command list]. For installation instructions, refer to [Getting Started].

## aio api-mesh:create

Creates a new mesh based on the settings in the specified `JSON` file in your working directory. After creating your mesh, you will receive a  `meshId`, like `12a3b4c5-6d78-4012-3456-7e890fa1bcde`, to refer to it in the future. For more information, see [Creating a mesh].

### Usage

```bash
aio api-mesh:create [FILE]
```

### Arguments

`FILE` The JSON file that contains your mesh's handlers and transforms.

### Flags

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to create a mesh in a different workspace. You can also manually [modify the cache](work-with-mesh.md#modify-projects-and-workspaces).

`-c` or `--autoConfirmAction` automatically confirms the mesh creation instead of prompting the user to confirm.

`-j` or `--json` outputs the `json` of the created mesh.

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:create mesh.json
```

#### Response

```terminal
Your mesh is being provisioned. Wait a few minutes before checking the status of your mesh: 12a3b4c5-6d78-4012-3456-7e890fa1bcde
To check the status of your mesh, run:

aio api-mesh:status
```

## aio api-mesh:update

Updates the mesh for the workspace you select based on the settings specified in the `JSON` file. For more information, see [Updating a mesh].

### Usage

```bash
aio api-mesh:update [FILE]
```

### Arguments

`FILE` The JSON file that contains your mesh's handlers and transforms.

### Flags

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to update a mesh in a different workspace. You can also manually [modify the cache](work-with-mesh.md#modify-projects-and-workspaces).

`-c` or `--autoConfirmAction` automatically confirms the mesh update instead of prompting the user to confirm.

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:update mesh.json
```

#### Response

```terminal
Successfully updated the mesh with the id: 12a3b4c5-6d78-4012-3456-7e890fa1bcde
```

## aio api-mesh:status

Retrieves the current status of your create or update command.

### Example

```bash
aio api-mesh:status
```

#### Response

There are four possible responses that reflect the status of your mesh:

- Success - Your mesh was successfully created or updated.

  ```terminal
  Success: Your mesh has been successfully built.
  ```

- Pending - Your mesh is queued and awaiting processing.

  ```terminal
  Pending: Your mesh is awaiting processing.
  ```

- Building - Our servers are currently processing your mesh.

  ```terminal
  Pending: Your mesh is currently being provisioned. Wait a few minutes before checking again.
  ```

- Error - Your mesh encountered an error.

  ```terminal
  Unable to get the mesh status. If the error persists please contact support. RequestId: 1234567890
  ```

## aio api-mesh:get

Retrieves the current `JSON` mesh file for the workspace you select.

### Usage

```bash
aio api-mesh:get [DOWNLOAD]
```

### Arguments
  
`DOWNLOAD` (Optional) specify the local filename to create from the mesh.

### Flags

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to retrieve a mesh from a different workspace. You can also manually [modify the cache](work-with-mesh.md#modify-projects-and-workspaces).

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:get
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

## aio api-mesh:delete

Deletes the mesh from the selected workspace and unsubscribes the API key from the API Mesh service.

<InlineAlert variant="info" slots="text"/>

The `aio api-mesh:delete` command does not delete the API key in case other services use it.

### Usage

```bash
aio api-mesh:delete
```

### Flags

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to delete a mesh from a different workspace. You can also manually [modify the cache](work-with-mesh.md#modify-projects-and-workspaces).

`-c` or `--autoConfirmAction` automatically confirms the mesh deletion instead of prompting the user to confirm.

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:delete
```

### Response

```terminal
Successfully deleted 12a3b4c5-6d78-4012-3456-7e890fa1bcde
```

## aio api-mesh:describe

Describes the mesh for the selected workspace.

### Usage

```bash
aio api-mesh:describe
```

### Flags

`-i` or`--ignoreCache` ignores the cached organization, project, and workspace, which allows you to get the description of a different workspace. You can also manually [modify the cache](work-with-mesh.md#modify-projects-and-workspaces).

`--help` provides information on the specified command

### Response

```terminal
Successfully retrieved mesh details

Org ID: 123456
Project ID: 1234567890123456789
Workspace ID: 2345678901234567890
Mesh ID: 12a3b4c5-6d78-4012-3456-7e890fa1bcde
```

## aio api-mesh:source:discover

Lists all available sources. Select a source to view its configuration file and copy its content to your clipboard. You can also view available sources directly in the [api-mesh-sources](https://github.com/adobe/api-mesh-sources/tree/main/connectors) repo.

<InlineAlert variant="info" slots="text"/>

Sources are prebuilt mesh configuration files that are formatted for a specific combination of handlers. Each source contains a mesh configuration file designed for a specific first or third-party source. Third parties can submit their sources as a pull request to the [api-mesh-sources](https://github.com/adobe/api-mesh-sources) repo. See [Create a mesh from a source](./create-mesh.md#create-a-mesh-from-a-source) for more information.

### Usage

```bash
aio api-mesh:source:discover
```

### Flags

`--help` provides information on the specified command.

### Response

```terminal
[
  {
      "name": "Adobe Commerce Compare List",
      "version": "0.0.2",
      "description": "Source to get information about Compare list",
      "author": "Adobe team",
      "provider": {
          "name": "Commerce",
          "handler": {
            "graphql": {
              "endpoint": "https://venia.magento.com/graphql/"
            }
          },
          "transforms": [
            {
              "rename": {
                "mode": "bare | wrap",
                "renames": [
                  {
                    "from": {
                      "type": "Query",
                      "field": "compareList"
                    },
                    "to": {
                      "type": "Query",
                      "field": "productCompareList"
                    }
                  }
                ]
              }
            },
            {
              "filterSchema": {
                "mode": "bare | wrap",
                "filters": [
                  "Query.!category",
                  "Query.!customerOrders",
                  "Query.!urlResolver",
                  "Query.!wishlist"
                ]
              }
            },
          ]
        }
  }
]
```

## aio api-mesh:source:get

Prints the specified source's mesh file and allows you to copy it to the clipboard.

<InlineAlert variant="info" slots="text"/>

Sources are prebuilt mesh configuration files that are formatted for a specific combination of handlers. Each source contains a mesh configuration file designed for a specific first or third-party source. Third parties can submit their sources as a pull request to the [api-mesh-sources](https://github.com/adobe/api-mesh-sources) repo. See [Create a mesh from a source](./create-mesh.md#create-a-mesh-from-a-source) for more information.

### Usage

```bash
aio api-mesh:source:get -s "<source_name>"
```

### Flags

`-s` or `--source` (required) allows you to specify the name of the source you want to copy.
`-m` or `--multiple` allows you to add multiple sources, which are returned in an array.
`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:source:get -s "AEM Assets API"
```

With multiple sources:

```bash
aio api-mesh:source:get -m -s "AEM Assets API" -s "Adobe Target API"
```

### Response

```terminal
[
  {
      "name": "AEM Assets API",
      "version": "0.0.2",
      "description": "A source for the AEM Assets API",
      "author": "Adobe team",
      "provider": {
          "name": "Commerce",
          "handler": {
            "graphql": {
              "endpoint": "https://venia.magento.com/graphql/"
            }
          },
          "transforms": [
            {
              "rename": {
                "mode": "bare | wrap",
                "renames": [
                  {
                    "from": {
                      "type": "Query",
                      "field": "compareList"
                    },
                    "to": {
                      "type": "Query",
                      "field": "productCompareList"
                    }
                  }
                ]
              }
            },
            {
              "filterSchema": {
                "mode": "bare | wrap",
                "filters": [
                  "Query.!category",
                  "Query.!customerOrders",
                  "Query.!urlResolver",
                  "Query.!wishlist"
                ]
              }
            },
            {
              "cache": [
                {
                  "field": "Query.storeConfig",
                  "invalidate": {
                    "ttl": 3600
                  }
                }
              ]
            }
          ]
        }
  }
]
```

## aio api-mesh:source:install

The `install` command adds the specified source to the currently selected workspace's mesh configuration.

<InlineAlert variant="info" slots="text"/>

Sources are prebuilt mesh configuration files that are formatted for a specific combination of handlers. Each source contains a mesh configuration file designed for a specific first or third-party source. Third parties can submit their sources as a pull request to the [api-mesh-sources](https://github.com/adobe/api-mesh-sources) repo. See [Create a mesh from a source](./create-mesh.md#create-a-mesh-from-a-source) for more information.

### Usage

```bash
aio api-mesh:source:install "<source_name>"
```

To install a specific version of a source, use the following command:

```bash
aio api-mesh:source:install "<source_name>"@source_version_number
```

The two variable flags, `-v` and `-f`, described in the following section, allow you to automatically replace any of the variables defined in the source that you are installing with your own values.

When using the `-f` or `--variable-file` flag, you must specify the variables in a separate file. The following example defines the variable file formatting:

```json
{
"ENDPOINT_URL": "https://venia.magento.com/graphql"
}
```

### Flags

`-v` or `--variable` specifies the values of any variables defined in the `variables` array of the mesh configuration file for the source. Use commas to separate multiple variables.

`-f` or `--variable-file` specifies a file location that contains variables to use in the mesh configuration file for the source. The file must be in `.json` format.

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:source:install "AEM Assets API"
```

With a variable:

```bash
aio api-mesh:source:install "AEM Assets API" -v ENDPOINT_URL:https://venia.magento.com/graphql
```

With a variable file:

```bash
aio api-mesh:source:install "AEM Assets API" -f documents/my_variables.json
```

Install a specific version:

```bash
aio api-mesh:source:install "AEM Assets API"@0.0.1
```

### Response

```bash
Successfully updated the mesh with the id: MESH_ID
```

<!-- Link Definitions -->
[Getting Started]: getting-started.md
[Adobe IO CLI command list]: https://github.com/adobe/aio-cli#commands
[Creating a mesh]: create-mesh.md
[Updating a mesh]: create-mesh.md#update-an-existing-mesh
