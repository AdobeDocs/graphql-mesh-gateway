---
title: Developer tools
description: Learn how to use development tools to create a local environment and use environment variables with API Mesh.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Developer tools

The processes covered in this topic allow developers to set up a local environment, use environment variables, and directly reference files in API Mesh for Adobe Developer App Builder.

## Create a local environment

A local development environment for API Mesh allows you to run a local version for development and testing purposes.

The [`aio api-mesh:init` command](./command-reference.md#aio-api-meshinit) allows you to build a local development environment at the specified location.

<InlineAlert variant="info" slots="text"/>

All of these steps can be automated using flags described in the [command reference](./command-reference.md#aio-api-meshinit).

1. Run the following command.

    ```bash
    aio api-mesh:init <project-name>
    ```

1. Select the directory to install the dev environment in.

1. Indicate if you want this environment to be a `git` project. (Requires [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).)

1. Specify whether you want to use Node Package Manager (`npm`) or `yarn`. (Requires [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).)

  The console indicates that the local environment installed successfully.

1. To deploy your mesh locally, use the `run` command. The port defaults to `5000`. You can specify a different port by using the `--port` flag or by adding your desired port number to the [`.env` file](#environment-variables), for example `PORT=9000`.

  ```terminal
  aio api-mesh run mesh.json --port 9000
  ```

  The console indicates your server status. If your build is successful, your mesh will be accessible at `http://localhost:5000/graphql` by default.

  Use the `--select` argument with the `run` command to deploy the mesh artifact in the selected workspace without rebuilding it.

<InlineAlert variant="info" slots="text"/>

The `run` command is currently in beta.

## Environment variables

Environment variables allow developers to make changes to a single variable, with one or more occurrences, across multiple meshes. An `.env` file will be created automatically when running the [`init` command](./command-reference.md#aio-api-meshinit).

The [`create`](./command-reference.md#aio-api-meshcreate) and [`update`](./command-reference.md#aio-api-meshupdate) commands support the use of an `--env` flag, which allows you to provide an environment variables file location. For example:

```bash
aio api-mesh:create ../mesh.json --env .env_adhoc
```

<InlineAlert variant="info" slots="text"/>

If your mesh contains environment variables, but you have not specified a variable file, the [`create`](./command-reference.md#aio-api-meshcreate) or [`update`](./command-reference.md#aio-api-meshupdate) commands look for your variables in a file named `.env` in the current directory.

The variables in your `.env` file are inserted into your mesh when the mesh is created or updated. The following is an example of an `.env` file:

```typescript
APIName='Adobe Commerce API'
commerceURL='<your_endpoint>'
includeHTTPDetailsValue=true
PORT=9000
```

The following mesh uses the preceding `.env` file to populate the name and endpoint for the first source, as well as the state of the `includeHTTPDetails` flag.

```json
{
    "meshConfig": {
        "sources": [
            {
                "name": "{{env.APIName}}",
                "handler": {
                    "graphql": {
                        "endpoint": "{{env.commerceURL}}"
                    }
                }
            }
        ],
        "responseConfig":{
            "includeHTTPDetails":{{env.includeHTTPDetailsValue}}
        }
    }
}
```

In the previous example, since `includeHTTPDetailsValue` expects a boolean value and not a string, the corresponding variable for that value `{{env.includeHTTPDetailsValue}}` is not enclosed in quotes. If you have strict settings in your IDE that prevent you from saving JSON similar to the previous example, you can instead save the mesh configuration file as a `.txt`.

After running the [`create`](./command-reference.md#aio-api-meshcreate) or [`update`](./command-reference.md#aio-api-meshupdate) command with the `--env` flag, the published mesh will look like the following:

```json
{
    "meshConfig": {
        "sources": [
            {
                "name": "Adobe Commerce API",
                "handler": {
                    "graphql": {
                        "endpoint": "<your_endpoint>"
                    }
                }
            }
        ],
        "responseConfig":{
            "includeHTTPDetails":true
        }
    }
}
```

You can confirm that your variables were updated successfully by running the [`aio api-mesh:get` command](./command-reference.md#aio-api-meshget).

## Reference files directly

In addition to [qualifying the `content` of a file manually](../reference/handlers/index.md#reference-local-files-in-handlers), you can directly reference a file in your mesh for automatic conversion. The following restrictions apply:

- Only `JS` and `JSON` file formats are allowed.
- The referenced file's path must be less than 25 characters.
- The referenced file must be in the same directory as the mesh file that references it.
- The file cannot be in the `~` or `home` directory.

The following example references the `requestParams.json` file. When this mesh is created or updated, the contents of that file are automatically minified, stringified, and added to the `files` array.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "<json_source_name>",
        "handler": {
          "JsonSchema": {
            "baseUrl": "<json_source__baseurl>",
            "operations": [
              {
                "type": "Query",
                "field": "<query>",
                "path": "<query_path>",
                "method": "POST",
                "requestSchema": "./requestParams.json"
              }
            ]
          }
        }
      }
    ]
  }
}
```

For example, if `requestParams.json` contained the following:

```json
{
  "$schema": "http://json-schema.org/draft-01/schema",
  "type": "object"
}
```

Then the mesh is updated to include the minified, stringified file:

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "<json_source_name>",
        "handler": {
          "JsonSchema": {
            "baseUrl": "<json_source__baseurl>",
            "operations": [
              {
                "type": "Query",
                "field": "<query>",
                "path": "<query_path>",
                "method": "POST",
                "responseSchema": "./schemaBody.json"
              }
            ]
          }
        }
      }
    ],
    "files": [
      {
        "path": "./schemaBody.json",
        "content": "{\"$schema\":\"http://json-schema.org/draft-01/schema\",\"type\":\"object\"}"
      }
    ]
  }
}
```

You can confirm that your file was attached successfully by running the [`aio api-mesh:get` command](./command-reference.md#aio-api-meshget).
