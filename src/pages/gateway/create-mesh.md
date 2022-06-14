---
title: Create a Mesh
description: Create a configuration file for your mesh, access the gateway, and update your configuration file.
---

# Create a mesh

This page provides the basic steps for creating your first mesh.  

## Requirements

Before creating a mesh, create a project or a templated project and workspace for the mesh. For other requirements see [Prerequisites].
### Create a project

When you [create a mesh], you must assign the mesh to a specific project. To create a new project, log in to the [Adobe Developer Console] and [create a project].

### Add a workspace to your project

If you are [creating a templated project], you can add [workspaces]. Workspaces allow you to create separate environments. You can also create workspaces for each developer on your team.

<InlineAlert variant="info" slots="text"/>

When creating or updating a mesh, the file to upload must have the `.json` filename extension.

## Create a mesh

1. Create and save a JSON configuration file that defines the properties of your mesh. Your mesh is defined by a combination of [handlers] and [transforms]. In this example, the file name is `mesh.json`.

  The following mesh file can be used with minimal setup to access the endpoint of the [Venia] demo store.

  ``` json
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
  ```

1. Run the login command and provide your credentials in the browser window.

    ```bash
    aio auth:login
    ```

1. Run the following command to create a mesh. In this example, the file name is `mesh.json`.

    ```bash
    aio api-mesh:create mesh.json
    ```

1. Select the project and workspace that you want to create the mesh in. You will be assigned a `meshId`, which is the case-sensitive, readable name you will use to refer to your mesh in the future. Your assigned `meshId` will look something like this: `12a3b4c5-6d78-4012-3456-7e890fa1bcde`. If you do not have a project, see [Create a project](#create-a-project).

<InlineAlert variant="info" slots="text"/>

Each workspace within a project can only have one mesh associated with it at a time.

## Mesh example

The following example adds both an Adobe Commerce instance (with Live Search enabled) and an Adobe Experience Manager instance to the mesh. The GraphQL endpoints for Commerce and Live Search are different, therefore you must configure them separately.

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

## Create an API Key

<InlineAlert variant="info" slots="text"/>

Only mesh owners can create API Keys. If you do not have access to [Adobe Developer Console], contact your mesh owner.

To access the gateway and perform GraphQL queries, you need to provide an API Key to authorize access to your mesh. To create your API Key:

1. In [Adobe Developer Console], select the desired organization from the dropdown in the top-right corner.

    ![create a project](../_images/create-project.png)

1. Select an existing project or [create a new one](#create-a-project).

1. Inside the project, click **Add API**.

    ![add an api](../_images/add-api.png)

1. Select **API Mesh for Adobe Developer App Builder** and click **Next**.

    ![add an api mesh](../_images/add-api-mesh.png)

1. The **Allowed Domain** field is not currently enforced. Enter any valid test domain to proceed.

    ![add an allowed domain](../_images/allowed-domain.png)

1. Click **Save configured API**. Copy your **API Key** from the Project Overview page.

    ![api key](../_images/api-key.png)

You can return to the Project Overview page whenever you need to retrieve your API Key.

## Access the gateway

After you [create a mesh] and [create an API Key](#create-an-api-key), you can access the GraphQL endpoint in any GraphQL browser by modifying the following URL:

`https://graph.adobe.io/api/<meshId>/graphql?api_key=<your_apiKey>`

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
[venia]: https://developer.adobe.com/commerce/pwa-studio/guides/packages/venia/
[Adobe Developer Console]: https://developer.adobe.com/console
[create a project]: https://developer.adobe.com/developer-console/docs/guides/projects/#create-a-new-project
[create a mesh]: create-mesh.md
[creating a templated project]: https://developer.adobe.com/developer-console/docs/guides/projects/projects-template/
[workspaces]: https://developer.adobe.com/developer-console/docs/guides/projects/projects-template/#workspaces
[Prerequisites]: ./getting-started.md#prerequisites
