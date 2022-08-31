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

1. If you have not already [selected a project and workspace manually](#select-a-project-or-workspace), choose the organization, project, and workspace that you want to create the mesh in. If you do not have a project, see [Create a project](#create-a-project).

  You will also need to indicate if you want to automatically select the specified organization and workspace in the future. If you answer **Yes** to either of these prompts and you want to select an organization or workspace other than the cached organization and workspace. You can use the `-i` or `-ignoreCache` flag to clear the cache and allow you to select another organization and workspace. You can also manually [modify the selected project or workspace](#modify-projects-and-workspaces).

  **Note:** Each workspace within a project can only have one mesh associated with it at a time.

1. When you are prompted to confirm that you want to create a mesh, select **Yes**. If you want to automatically confirm the creation, add the `-c` or `--autoConfirmAction` flag to your create command.

  The `aio api-mesh:create` response assigns you a `meshId`, an `apiKey`, and provides a GraphQL endpoint that you can use to query your mesh.

<InlineAlert variant="info" slots="text"/>

Refer to the [command reference] for a detailed description of `aio api-mesh:create`.

### Access the gateway

The `aio api-mesh:create` response automatically assigns you an API key and subscribes that API key to the mesh service. You can also retrieve the API key by viewing the project in the [Adobe Developer Console].

After you [create a mesh], you can access the GraphQL endpoint in any GraphQL browser by modifying the following URL: `https://graph.adobe.io/api/<meshId>/graphql?api_key=<your_apiKey>`

The `aio api-mesh:create` response provides the exact url to access the gateway for your mesh.

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

## Update an existing mesh

If you make any changes to your mesh file, such as adding [transforms], you must publish them before the changes will be reflected in your gateway. The following command will update the mesh in the selected workspace with the settings specified in the `update-mesh.json` file.

```bash
aio api-mesh:update update-mesh.json
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

## Modify projects and workspaces

<InlineAlert variant="info" slots="text"/>

When creating a mesh for the first time, you must select the project and workspace that you want to create the mesh in. Alternatively, you can use the following [aio commands](https://github.com/adobe/aio-cli#commands) to select or deselect a project or workspace without interacting with your mesh.

[aio commands](https://github.com/adobe/aio-cli#commands) allow you to list the current selections, manually select a project or workspace, or remove the currently selected project or workspace from the cache.

### View cached project and workspace

To see your current cache configuration, use the [`aio config:get console`](https://github.com/adobe/aio-cli#aio-configget-key) command, which includes the currently selected organization, project, and workspace.

### Select a project or workspace

If you want to change the selected project, use the [`aio console:project:sel`](https://github.com/adobe/aio-cli#aio-consoleprojectsel-projectidorname) or [`aio console:project:select`](https://github.com/adobe/aio-cli#aio-consoleprojectselect-projectidorname) commands followed by the name or id of the project. You will be prompted to select a project.

If you want to change the selected workspace, use the [`aio console:workspace:sel`](https://github.com/adobe/aio-cli#aio-consoleworkspacesel-workspaceidorname) or [`aio console:workspace:select`](https://github.com/adobe/aio-cli#aio-consoleworkspaceselect-workspaceidorname) commands followed by the name or id of the workspace. You will be prompted to select a workspace.

By [default](https://developer.adobe.com/app-builder/docs/getting_started/first_app/#2-creating-a-new-project-on-developer-console) projects have `prod` and `stage` workspace.

### Delete a cached project or workspace

If you want to clear a previously selected project or workspace from your cache, use the [`aio config:del`](https://github.com/adobe/aio-cli#aio-configdel-keys) [`aio config:delete`](https://github.com/adobe/aio-cli#aio-configdelete-keys) followed by the object you want to remove from your cached config.

For example:

-  `aio config:del console.project` Removes the current project from the cache.
-  `aio config:del console.workspace` Removes the current workspace from the cache.
-  `aio config:del console` will deselect the selected project, and workspace.

## Retrieve a previously created `meshId`

If you need to retrieve a `meshId` from a previously created mesh, use the following command:

```bash
aio api-mesh:describe
```

The command returns a list of projects. Use the arrow and enter keys to select your project and organization. Alternatively, you can type to search for your project and workspace. The console then displays details about the project.

## Manually create an API Key (optional)

<InlineAlert variant="warning" slots="text"/>

API keys are now automatically generated and associated with your project as part of the mesh creation process. Use the following process if you need to manually add an API to a project.

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
[command reference]: ./command-reference.md#aio-api-meshcreate
