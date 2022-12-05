---
title: API Mesh Tutorial
description: This API mesh tutorial covers creating and updating a mesh.
---

# API Mesh Tutorial


## Prerequisites

- Access to https://developer.adobe.com/console
- Install [`Node.js`](https://nodejs.org/en/download/)
  - You can run `node -v` and `npm -v` to determine if `node.js` is successfully installed.
  
  NOTE: Restart your IDE after installing `node`.

- Install the [Node Version Manager (`nvm`)](https://github.com/nvm-sh/nvm)
- Install the [Adobe `aio` CLI](https://developer.adobe.com/runtime/docs/guides/tools/cli_install/) with the following command:

    ```bash
    npm install -g @adobe/aio-cli
    ```

## Setup



## Create a mesh

1. Create a file named `mesh.json` with the following contents:

    ```json
      {
        "meshConfig": {
          "sources": [
            {
              "name": "REST",
              "handler": {
                "openapi": {
                  "source": "https://accenturetest.magento.com/rest/all/schema?services=all"
                }
              }
            },
            {
              "name": "GraphQL",
              "handler": {
                "graphql": {
                  "endpoint": "https://accenturetest.magento.com/graphql"
                }
              }
            }
          ]
        }
      }
    ```

1. Run the following command:

    ```bash
    aio api-mesh:create mesh.json
    ```

1. Select the Project and Workspace you created in the [setup](#setup).

1. Respond `y` to confirm the future use of the workspace and the creation of the mesh.

## Access the Mesh

1. Copy the URL in the response to the create command.

    You can optionally use the [`aio api-mesh:describe`](command-reference.md#aio-api-meshdescribe) command to retrieve the mesh URL in the future.

1. Paste the URL into a GraphQL client, such as [Altair](https://altairgraphql.dev), [GraphiQL](https://github.com/graphql/graphiql), or [Insomnia](https://insomnia.rest/download).

1. Determine if you can view the schema in your GraphQL client. Refer to your GraphQL client's documentation to learn how to access the schema.

    If you can view the schema, proceed to the next section. If you cannot view the schema, go back and check your mesh's sources. You can use the [`aio api-mesh:update`](command-reference.md#aio-api-meshupdate) command to update your mesh with the correct information.

