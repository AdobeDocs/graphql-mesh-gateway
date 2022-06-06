---
title: Create a Mesh
description: Create a configuration file for your mesh, access the gateway, and update your configuration file.
---

# Create a mesh

1. Create and save a JSON configuration file that defines the properties of your mesh. Your mesh is defined by a combination of [handlers] and [transforms]. In this example, the file name is `mesh.json`.

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
          }
      }
  ```

1. Run the login command and provide your credentials in the browser window.

    ```bash
    aio auth:login
    ```

1. Run the following command to create a mesh:

    ```bash
    aio api-mesh:create mesh.json
    ```

<InlineAlert variant="info" slots="text"/>

When creating or updating a mesh, the file to upload must have the `.json` filename extension.

1. Select the project and workspace that you want to create the mesh in. You will be assigned a `meshId`, which is the case-sensitive, readable name you will use to refer to your mesh in the future. Your assigned `meshId` will look something like this: `bright-cloud-plastic-2pUkDmZd`.

<InlineAlert variant="info" slots="text"/>

Each workspace within a project can only have one mesh associated with it at a time.

## Access the gateway

After creating a mesh, you should be able to access the GraphQL endpoint by entering the following URL in any GraphQL browser:

`https://graph.adobe.io/api/<chosen_mesh_name>/graphql?api_key=<your_apiKey>`

## Update an existing mesh

If you make any changes to your mesh file, such as adding [transforms], you must publish them before the changes will be reflected in your gateway. The following command will update the `meshId` with the settings specified in the `update-mesh.json` file.

```bash
aio api-mesh:update meshId update-mesh.json
```

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
