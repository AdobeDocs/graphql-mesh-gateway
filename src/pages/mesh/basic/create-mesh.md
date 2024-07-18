---
title: Create a Mesh
description: Create a configuration file for your mesh, access the gateway, and update your configuration file.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Create a mesh

This page provides the basic steps for creating your first mesh.

## Requirements

Before creating a mesh, create a project or a templated project and workspace for the mesh. For other requirements see [Prerequisites](./index.md#prerequisites).

### Create a project

When you [create a mesh](../basic/create-mesh.md), you must assign the mesh to a specific project. To create a new project, log in to the [Adobe Developer Console](https://developer.adobe.com/console) and [create a project](https://developer.adobe.com/developer-console/docs/guides/projects/#create-a-new-project).

### Add a workspace to your project

If you are [creating a templated project](https://developer.adobe.com/developer-console/docs/guides/projects/projects-template/), you can add [workspaces](https://developer.adobe.com/developer-console/docs/guides/projects/projects-template/#workspaces). Workspaces allow you to create separate environments. You can also create workspaces for each developer on your team.

Workspaces that already have an API mesh will have "API Mesh" displayed on their workspace card in the developer console. To learn more about viewing, deleting, or selecting projects and workspaces, see [Projects and workspaces](work-with-mesh.md#projects-and-workspaces).

![workspace card](../../_images/workspace-card.png)

## Create a mesh

<InlineAlert variant="info" slots="text"/>

When creating or updating a mesh, the file to upload must have the `.json` filename extension.

1. Create and save a JSON configuration file that defines the properties of your mesh. Your mesh is defined by a combination of [handlers](./handlers/index.md) and [transforms](./transforms/index.md). In this example, the filenameis `mesh.json`.

  The following mesh file can be used with minimal setup to access the endpoint of the [Venia](https://developer.adobe.com/commerce/pwa-studio/guides/packages/venia/) demo store.

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

1. Run the following command to create a mesh. In this example, the filenameis `mesh.json`.

    ```bash
    aio api-mesh:create mesh.json
    ```

1. If you have not already [selected a project and workspace manually](work-with-mesh.md#select-a-project-or-workspace), choose the organization, project, and workspace that you want to create the mesh in. If you do not have a project, see [Create a project](#create-a-project).

  You must also indicate if you want to automatically select the specified organization and workspace in the future. If you answer **Yes** to either of these prompts and you want to select an organization or workspace other than the cached organization and workspace. You can use the `-i` or `-ignoreCache` flag to clear the cache, allowing you to select another organization and workspace. You can also manually [modify the selected project or workspace](work-with-mesh.md#projects-and-workspaces).

  **Note:** Each workspace within a project can only have one mesh associated with it at a time.

1. When you are prompted to confirm that you want to create a mesh, select **Yes**. If you want to automatically confirm the creation, add the `-c` or `--autoConfirmAction` flag to your create command.

  The `aio api-mesh:create` response assigns you a `meshId`. Use the [`aio api-mesh:status`](../advanced/index.md#aio-api-meshstatus) command to see the status of your mesh creation. You can run the [`aio api-mesh:describe`](../advanced/index.md#aio-api-meshdescribe) command to get your `apiKey` and a GraphQL endpoint that you can use to query your mesh.

<InlineAlert variant="info" slots="text"/>

Refer to the [command reference](../advanced/index.md#aio-api-meshcreate) for a detailed description of `aio api-mesh:create`.

### Access the gateway

The `aio api-mesh:create` response automatically assigns you an API key and subscribes that API key to the mesh service. You can also retrieve the API key by viewing the project in the [Adobe Developer Console](https://developer.adobe.com/console).

After you [create a mesh](../basic/create-mesh.md), you can access the GraphQL endpoint in any GraphQL browser by modifying the following URL: `https://graph.adobe.io/api/<meshId>/graphql?api_key=<your_apiKey>`

<InlineAlert variant="info" slots="text"/>

For security purposes, we recommend moving your API key from the provided link into a request header. The header key is `x-api-key` and the header value is your API key.

### Create a mesh from a source

The `aio api-mesh:source` commands provide several prebuilt mesh sources that you can use to create your mesh file, for example `mesh.json`. Each source contains a mesh configuration file designed for a specific first or third-party source. Third parties can submit their sources as a pull request to the [api-mesh-sources](https://github.com/adobe/api-mesh-sources) repository. Once approved, these sources will be available for selection in the CLI.

Currently, this feature serves as a way for you to quickly copy an example mesh.

1. To choose a prebuilt source from a list, run the following command:

  ```bash
  aio api-mesh:source:discover
  ```

  **Note**: Alternatively, you can use the [aio api-mesh:source:install](../advanced/index.md#aio-api-meshsourceinstall) command if you know the source you want to install.

1. Use the arrow keys to select which source you want to copy and press Enter. You can use the Spacebar to select multiple sources.

1. Confirm that you want to print the configuration in the console. The mesh configuration prints in your terminal and is automatically copied to your clipboard depending on your selections.

1. Review the mesh configuration. When you are ready to install the mesh configuration, run the `aio api-mesh:source:install` command followed by the `"<source_name>"` you want to install, for example:

```bash
aio api-mesh:source:install "AEM Assets API"
```

  You can repeat this process multiple times to add sources to your mesh.

<InlineAlert variant="info" slots="text"/>

Alternatively, you can use the [aio api-mesh:source:get](../advanced/index.md#aio-api-meshsourceget) command to print the source in the terminal or copy the source to the clipboard.

Refer to the [Command reference](../advanced/index.md#aio-api-meshsourceinstall) flags to learn how to replace variables in the source mesh configuration.

### Create a mesh from a template

You can also create a mesh automatically when [bootstrapping a new app through the CLI](https://developer.adobe.com/app-builder/docs/getting_started/first_app/#4-bootstrapping-new-app-using-the-cli):

1. Navigate to the location you want to initialize your project and enter the following command:

    ```bash
    aio app init
    ```

1. Select the desired organization, project, and workspace by using the arrow keys, or start typing to search.

1. Select the `generator-app-api-mesh` standalone application.

1. Indicate if you want this app to be a single-page application accessible through the Experience Cloud UI.

1. Indicate if you want to create a sample mesh.

1. After the process completes, you are provided a link to your [API mesh endpoint](#access-the-gateway).

1. When you are ready, you can deploy your app by running the following command:

    ```bash
    aio app deploy
    ```

1. After the process completes, you are provided a link to your app at `experience.adobe.com`.

## Mesh example

The following example adds both an Adobe Commerce instance (with Catalog Service enabled) and an Adobe Experience Manager instance to the mesh. The GraphQL endpoints for Commerce and Catalog Service are different, therefore you must configure them separately.

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
            "name": "CatalogService",
              "handler": {
                "graphql": {
                  "endpoint": "https://catalog-service.adobe.io/graphql/",
                  "operationHeaders": {
                    "x-api-key": "<api_key>",
                    "Magento-Environment-Id": "<your_environment_id>",
                    "Magento-Website-Code": "base",
                    "Magento-Customer-Group": "<customer_group_value>",
                    "Magento-Store-Code": "main_website_store",
                    "Magento-Store-View-Code": "default"
                  },
                  "schemaHeaders": {
                    "x-api-key": "<api_key>"
                  }
                }
              }
            }
          ]
        }
    }
```

## Update an existing mesh

If you make any changes to your mesh file, such as adding [transforms](./transforms/index.md), you must publish them before the changes will be reflected in your gateway. Additionally, if a source schema is modified, you must update your mesh to allow API Mesh to cache any changes.

The following command updates the mesh in the selected workspace with the settings specified in the `update-mesh.json` file.

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
            "name": "CatalogService",
              "handler": {
                "graphql": {
                  "endpoint": "https://catalog-service.adobe.io/graphql/search/graphql",
                  "operationHeaders": {
                    "x-api-key": "<api_key>",
                    "Magento-Environment-Id": "<your_environment_id>",
                    "Magento-Website-Code": "base",
                    "Magento-Customer-Group": "<customer_group_value>",
                    "Magento-Store-Code": "main_website_store",
                    "Magento-Store-View-Code": "default"
                  },
                  "schemaHeaders": {
                    "x-api-key": "<api_key>"
                  }
                }
              }
            }
          ]
        }
    }
```

## View your mesh in the Adobe Developer Console

As an alternative to running the [`aio api-mesh:get`](../advanced/index.md#aio-api-meshget) command, you can view your mesh details by selecting the **API Mesh** section in the desired workspace in the [Adobe Developer Console](https://developer.adobe.com/console).

On the API Mesh Details screen, you can use the tabs to view different segments of your mesh.

![api mesh details](../../_images/api-mesh-details.png)

To download a copy of your mesh file, click the **Download Mesh Schema** button at the top of the API Mesh Details screen.

![download mesh](../../_images/download-mesh-schema.png)

## Manually create an API Key (optional)

<InlineAlert variant="warning" slots="text"/>

API keys are now automatically generated and associated with your project as part of the mesh creation process. Use the following process if you need to manually add an API to a project.

<InlineAlert variant="info" slots="text"/>

Only mesh owners can create API Keys. If you do not have access to [Adobe Developer Console], contact your mesh owner.

To access the gateway and perform GraphQL queries, you need to provide an API Key to authorize access to your mesh. To create your API Key:

1. In [Adobe Developer Console](https://developer.adobe.com/console), select the desired organization from the dropdown in the top-right corner.

    ![create a project](../../_images/create-project.png)

1. Select an existing project or [create a new one](#create-a-project).

1. Inside the project, click **Add API**.

    ![add an api](../../_images/add-api.png)

1. Select **API Mesh for Adobe Developer App Builder** and click **Next**.

    ![add an api mesh](../../_images/add-api-mesh.png)

1. The **Allowed Domain** field is not currently enforced. Enter any valid test domain to proceed.

    ![add an allowed domain](../../_images/allowed-domain.png)

1. Click **Save configured API**. Copy your **API Key** from the Project Overview page.

    ![api key](../../_images/api-key.png)

You can return to the Project Overview page whenever you need to retrieve your API Key.
