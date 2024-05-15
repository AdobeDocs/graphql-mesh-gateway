---
title: GraphQL Handler | API Mesh for Adobe Developer App Builder
description: Learn how to integrate remote schemas with handlers.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - Tools
---

# `graphql` handlers

The `graphql` handler allows you to connect to a GraphQL endpoint.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "PWA",
        "handler": {
          "graphql": {
            "endpoint": "your_Venia_url"
          }
        }
      },
      {
        "name": "AEM",
        "handler": {
          "graphql": {
            "endpoint": "<your_AEM_url>"
          }
        }
      }
    ]
  },
}
```

This handler allows you to load remote GraphQL schemas as part of your mesh. The GraphQL handler uses the following format:

```json
{
  "sources": [
    {
      "name": "MyGraphQLApi",
      "handler": {
        "graphql": {
          "endpoint": "https://my-service-url/graphql"
        }
      }
    }
  ]
}
```

GraphQL handlers can also use local sources, see [Reference local file handlers](../../gateway/handlers/index.md#reference-local-files-in-handlers) for more information.

## Headers from context

The following example shows how to pass authorization headers to a GraphQL endpoint.

```json
{
  "sources": [
    {
      "name": "MyGraphQLApi",
      "handler": {
        "graphql": {
          "endpoint": "https://your-service/graphql",
          "operationHeaders": {
            "Authorization": "Bearer {context.headers['x-my-api-token']}"
          // Do not use capital letters in header names.
          }
        }
      }
    }
  ]
}
```

<InlineAlert variant="info" slots="text"/>

Header names are automatically converted to lowercase.

## Fetching SDL or introspection from CDN

Consider a scenario where introspection is disabled in the production environment of your GraphQL source, and you want to provide your SDL or introspection separately:

```json
{
    "sources": [
        {
            "name": "MyGraphQLApi",
            "handler": {
                "graphql": {
                    "endpoint": "https://your-service/graphql",
                    "operationHeaders": {
                        "Authorization": "Bearer {context.headers['GITHUB_TOKEN']}"
                    }
                }
            }
        }
    ]
}
```

In this case, CLI's `build` command won't save the introspection in the artifacts, so your Mesh won't start if the `source` URL is down.

## Local Schemas

We recommend providing a local schema by using the [`additionalTypeDefs`](../../gateway/extending-unified-schema.md) and [`additionalResolvers`](../multiple-apis.md#extending-graphql-schema-with-additionaltypedefs) configuration options.

## Config API reference

-  `endpoint` (type: `String`, required) - URL or file path for your remote GraphQL endpoint
   -  Local file types must be `.js` or `.ts`.
-  `schemaHeaders` (type: `Any`) - JSON object for adding headers to API calls for runtime schema introspection
-  `operationHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime operation execution
-  `useGETForQueries` (type: `Boolean`) - An HTTP GET method for query operations
-  `method` (type: `String (GET | POST)`) - An HTTP method for GraphQL operations
<!-- 
`subscriptionsEndpoint` (type: `String`) - A URL to your endpoint serving all subscription queries for this source
`customFetch` (type: `Any`) - Path to a custom W3 Compatible Fetch Implementation
`webSocketImpl` (type: `String`) - Path to a custom W3 Compatible WebSocket Implementation
`introspection` (type: `String`) - Path to the introspection
You can separately give schema introspection
`multipart` (type: `Boolean`) - Enable multipart/form data in order to support file uploads
`subscriptionsProtocol` (type: `String (SSE | WS | LEGACY_WS)`) - SSE - Server Sent Events
WS - New graphql-ws
LEGACY_WS - Legacy subscriptions-transport-ws
`retry` (type: `Int`) - Retry attempts if fails
`timeout` (type: `Int`) - Timeout in milliseconds
`batch` (type: `Boolean`) - Enable/Disable automatic query batching 
-->
