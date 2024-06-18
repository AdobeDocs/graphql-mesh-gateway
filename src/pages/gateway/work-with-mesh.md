---
title: Work with your mesh
description: This page describes ways you can work with meshes that are not part of the mesh creation process.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Work with your mesh

This page describes ways you can work with meshes that contain optional processes that are not required for [mesh creation](create-mesh.md).

## Retrieve a previously created `meshId` or mesh endpoint URL

If you need to retrieve a `meshId` or mesh endpoint URL from a previously created mesh, use the following command to display your mesh details in the console.

```bash
aio api-mesh:describe
```

By default, the command describes the mesh in the selected project and workspace.

If no project or workspace is selected, the command returns a list of projects. Use the arrow and enter keys to select your project and organization. Alternatively, you can type to search for your project and workspace.

## Move a mesh to another workspace

You may need to move a mesh from one workspace to another, for example from `stage` to `production`. The following process describes how to copy a mesh from one workspace and duplicate it in another workspace.

1. [Select the workspace](#select-a-project-or-workspace) that contains the mesh you want to copy.

1. [Retrieve](#retrieve-a-previously-created-meshid-or-mesh-endpoint-url) your previously created mesh by running the following [`get` command](command-reference.md#aio-api-meshget).

    ```bash
    aio api-mesh:get download.json
    ```

  This command creates a file named `download.json` that contains a copy of the mesh from the selected workspace.

1. Run the following command and select the `production` or target workspace, see [select a project or workspace](#select-a-project-or-workspace) for more information.

    ```bash
    aio console:workspace:select
    ```

1. Run the [create](create-mesh.md#create-a-mesh) command and reference the previously created file.

    ```bash
    aio api-mesh:create download.json
    ```

## Include `httpDetails` in query responses

Adding the `includeHTTPDetails` flag to your JSON mesh configuration file determines if `httpDetails` information is included in query responses.

Setting `includeHTTPDetails` to `true` adds information like `responseTime` and response headers to every query response. Setting `includeHTTPDetails` to `false` prevents users who query your mesh from accessing this information. If you do not include the `includeHTTPDetails` property in your mesh, the setting defaults to false.

The following example mesh indicates the location of the `includeHTTPDetails` flag.

```json
{
    "meshConfig": {
        "responseConfig":{
            "includeHTTPDetails":true

        },
        "sources":[
            {
                "name":"Venia",
                "handler": {
                    "graphql": 
                    {
                        "endpoint":"https://venia.magento.com/graphql"
                    }
                }
            }
        ]
    }
}
```

When you query a mesh with `includeHTTPDetails` set to `true`, the response will include an `httpDetails` section with the following information:

- `sourceName`
- `request`
- `response`
- `responseTime`

The following example includes some additional information a user can receive as part of the response. The exact response varies, depending on your source handlers, headers, and other customizations.

```json
{   
 "data": {
        "storeConfig": {
            "timezone": "America/Los_Angeles"
        }
    },
    "extensions": {
        "httpDetails": [
            {
                "sourceName": "Venia",
                "request": {
                    "timestamp": 1676489418840,
                    "url": "https://venia.magento.com/graphql",
                    "method": "POST",
                    "headers": {
                        "accept": "application/graphql-response+json, application/json, multipart/mixed",
                        "content-type": "application/json"
                    }
                },
                "response": {
                    "timestamp": 1676489419070,
                    "status": 200,
                    "statusText": "OK",
                    "headers": {
                        "accept-ranges": "bytes",
                        "cache-control": "max-age=0, must-revalidate, no-cache, no-store",
                        "connection": "keep-alive",
                        "content-length": "63",
                        "content-type": "application/json",
                        "date": "Wed, 15 Feb 2023 19:30:19 GMT",
                        "expires": "Tue, 15 Feb 2022 19:30:19 GMT",
                    }
                },
                "responseTime": 230
            }
        ]
    }
}
```

## Projects and workspaces

<InlineAlert variant="info" slots="text"/>

When creating a mesh for the first time, you must select the project and workspace that you want to create the mesh in. Alternatively, you can use [aio commands](https://github.com/adobe/aio-cli#commands) to manually select a project or workspace, list the current selections, or remove the currently selected project or workspace from the cache.

### View the cached project and workspace

To see your current cache configuration, use the [`aio config:get console`](https://github.com/adobe/aio-cli#aio-configget-key) command, which includes the currently selected organization, project, and workspace.

You can view a list of available projects in your current organization by running the [`aio console:project:list`](https://github.com/adobe/aio-cli-plugin-console#aio-consoleprojectlist) command.

To view a list of available workspaces in the current project, run the [`aio console:workspace:list`](https://github.com/adobe/aio-cli-plugin-console#aio-consoleworkspacelist) command.

### Select a project or workspace

By [default](https://developer.adobe.com/app-builder/docs/getting_started/first_app/#2-creating-a-new-project-on-developer-console), projects have a `production` and a `stage` workspace. You can also [create your own workspaces](https://developer.adobe.com/developer-console/docs/guides/projects/projects-template/#add-a-workspace). If you do not know which workspace to use, use the `stage` workspace.

To change the selected project, use the [`aio console:project:select`](https://github.com/adobe/aio-cli#aio-consoleprojectselect-projectidorname) command, which prompts you to select your project from a list.

To change the selected workspace, use the [`aio console:workspace:select`](https://github.com/adobe/aio-cli#aio-consoleworkspaceselect-workspaceidorname) command, which prompts you to select your workspace from a list.

<InlineAlert variant="info" slots="text"/>

You must select a project before you select a workspace.

### Delete a cached project or workspace

If you want to clear a previously selected project or workspace from your cache, use the [`aio config:delete`](https://github.com/adobe/aio-cli#aio-configdelete-keys) followed by the object you want to remove from your cached config.

For example:

-  `aio config:delete console.project` Removes the current project from the cache.
-  `aio config:delete console.workspace` Removes the current workspace from the cache.

## Aliasing

In GraphQL you can use [aliasing](https://graphql.org/learn/queries/#aliases) in your query to rename fields and avoid fields with conflicting names. This is particularly useful for API Mesh because aliasing allows you to rename fields when querying.

<InlineAlert variant="info" slots="text"/>

You can also rename field names within your mesh by using the [`rename`](./transforms/rename.md) and [`prefix`](./transforms/prefix.md) transforms.

The following example renames the `name` field to `productName`.

```graphql
{
 products(search:"tops"){
   items {
       productName:name
       sku
     }
   } 
 } 
```

Due to the limitations of API Mesh, responses contain both the newly created alias field and the original field. For example, the previous query produces the following response that contains both the aliased field, `productName`, and the original field, `name`.

```json
{
  "data": {
    "products": {
      "CommerceItems": [
        {
          "productName": "Vitalia Top",
          "sku": "VT10",
          "name": "Vitalia Top"
        },
        {
          "productName": "Jillian Top",
          "sku": "VT12",
          "name": "Jillian Top"
        }
      ]
    }
  }
}
```

## Chained mutations

When you query a mesh using chained mutations, the mesh makes a separate call to the source for each mutation. This happens because GraphQL requests execute when the GraphQL server receives them, instead of proxying the calls. Because API Mesh supports multiple sources, it evaluates batched mutations and separates the information based on the source it is associated with.

These mutations are executed sequentially, calling one source after the other. When you call a source directly, it will only need one API call, but it will execute the batch mutations sequentially by calling their respective resolvers. These calls are more overt in API Mesh, because they are made by a network call, instead of an internal call. This means you will see multiple calls for chained mutations.

## HIPAA compliance

If your mesh's sources contain Protected Health Information (PHI), add the `"HIPAA": true` to your mesh configuration file. This flag ensures that your mesh is compliant with the Health Insurance Portability and Accountability Act (HIPAA).

```json
{
"meshConfig": {
    "HIPAA": true,
    "sources": [
      {
        "name": "Healthcare store",
        "handler": {
          "graphql": {
            "endpoint": "<store_endpoint>"
          }
        }
      }
    ]
  }
}
```
