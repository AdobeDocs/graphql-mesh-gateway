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

GraphQL handlers can also use local sources, see [Reference local file handlers](./index.md#reference-local-files-in-handlers) for more information.

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

## Provide an introspection file

If introspection is disabled in the production environment of your GraphQL source, and you want to provide your schema definition or introspection separately, you can use the `source` field to provide an online or local introspection file:

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "test_automation",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql",
            "source": "https://<domain>/myFile.graphql"
          }
        }
      }
    ]
  }
}
```

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Adobe_Commerce",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql",
            "source": "schema.graphql"
          }
        }
      }
    ],
    "files": [
      {
        "path": "schema.graphql",
        "content": "type Query {hello: String}"
      }
    ]
  }
}
```

## Local Schemas

We recommend providing a local schema by using the [`additionalTypeDefs`](../../advanced/extend/index.md) and [`additionalResolvers`](../../advanced/extend/resolvers/programmatic-resolvers.md#additional-resolversjs) configuration options.

## Config API reference

-  `endpoint` (type: `String`, required) - URL or file path for your remote GraphQL endpoint
   -  Local file types must be `.js`, `.ts`, or `.graphql`.
-  `source` (type: `String`) - Path to the introspection file
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
