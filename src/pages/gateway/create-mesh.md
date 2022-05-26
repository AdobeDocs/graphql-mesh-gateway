---
title: Create a Mesh
description: Create a configuration file for your mesh, access the gateway, and update your configuration file.
---

# Create a mesh

1. Create and save a JSON configuration file that defines the properties of your mesh. Your mesh is defined by a combination of [handlers] and [transforms]. In this example, the file name is `mesh.json`. The `meshId` is the case-sensitive name you want to assign to your mesh configuration.

    **NOTE:** The following example adds both an Adobe Commerce instance (with Live Search enabled) and an Adobe Experience Manager instance to the mesh. The GraphQL endpoints for Commerce and Live Search are different, therefore you must configure them separately.

  ```json
      {
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
                      "x-api-key": "search_gql",
                      "Magento-Environment-Id": "<your_environment_id>",
                      "Magento-Website-Code": "base",
                      "Content-Type": "application/json",
                      "Magento-Store-Code": "main_website_store",
                      "Magento-Store-View-Code": "default"
                    },
                    "schemaHeaders": {
                      "x-api-key": "search_gql",
                      "Magento-Environment-Id": "<your_environment_id>",
                      "Magento-Website-Code": "base",
                      "Content-Type": "application/json",
                      "Magento-Store-Code": "main_website_store",
                      "Magento-Store-View-Code": "default"
                    }
                  }
                }
              }
            ]
          },
        "meshId": "<your_mesh_Id>"
      }
  ```

1. Run the login command and provide your credentials in the browser window.

    ```bash
    aio auth:login
    ```

1. Run the following command to create a mesh:

    ```bash
    aio api-manager:mesh:get:create mesh.json
    ```

<InlineAlert variant="info" slots="text"/>

When creating or updating a mesh, the file to upload must have the `.json` filename extension.

## Access the gateway

After creating a mesh, you should be able to access the GraphQL endpoint by entering the following URL in any GraphQL browser:

`https://graph.adobe.io/api/<chosen_mesh_name>/graphql?api_key=<your_apiKey>`

## Update an existing mesh

If you make any changes to your mesh file, such as adding [transforms], you must publish them before the changes will be reflected in your gateway. The following command will update the `meshId` with the settings specified in the `update-mesh.json` file.

```bash
aio api-manager:mesh:get:update meshId update-mesh.json
```

When updating a mesh, do not include a meshId in your mesh `JSON` file. Compare the following example to the previous [Creating a mesh](#creating_a_mesh) example on this page and note the absence of the `meshId`.

```json
    {
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
                    "x-api-key": "search_gql",
                    "Magento-Environment-Id": "<your_environment_id>",
                    "Magento-Website-Code": "base",
                    "Content-Type": "application/json",
                    "Magento-Store-Code": "main_website_store",
                    "Magento-Store-View-Code": "default"
                  },
                  "schemaHeaders": {
                    "x-api-key": "search_gql",
                    "Magento-Environment-Id": "<your_environment_id>",
                    "Magento-Website-Code": "base",
                    "Content-Type": "application/json",
                    "Magento-Store-Code": "main_website_store",
                    "Magento-Store-View-Code": "default"
                  }
                }
              }
            }
          ]
        }
    }
```

<!-- Link Definitions -->
[handlers]: source-handlers.md
[transforms]: transforms.md
