---
title: GraphQL Handler | API Mesh for Adobe Developer App Builder
---

# GraphQL handlers

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

GraphQL handlers can also use local sources, see [Reference local file handlers](../handlers/index.md#reference-local-files-in-handlers) for more information.

## Headers from context

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

<!--
### From Environment Variable

```json
{
  "sources": [
    {
      "name": "MyGraphQLApi",
      "handler": {
        "graphql": {
        "endpoint": "https://my-service-url/graphql",
          "operationHeaders": {
            "Authorization": "Bearer {env.MY_API_TOKEN}"
          }
        }
      }
    }
  ]
}
``` -->

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
<!-- 
## Fetch Strategies and Multiple HTTP endpoints for the same source

If you want to have an advanced fetch strategy for the GraphQL source such as retrying twice or timeout in 30 seconds etc.
Also, you can have different HTTP endpoints for a single source, and you can configure Mesh to get a better execution flow.

For example, you can make a request to both endpoints and return the fastest response with `race` strategy.

All `fetch` strategies can be combined to create the ultimate execution flow:

### `retry`

The `retry` mechanism allows you to specify the retry attempts for a single GraphQL endpoint/source.

The retry flow will execute in both conditions: a network error, or due to a runtime error.

```json
{
    "sources": [
        {
            "name": "uniswapv2",
            "handler": {
                "graphql": {
                    "endpoint": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
                    "retry": 2
                }
            }
        }
    ]
}
```

### `timeout`

The `timeout` mechanism allows you to specify the `timeout` for a given GraphQL endpoint.

```json
{
    "sources": [
        {
            "name": "uniswapv2",
            "handler": {
                "graphql": {
                    "endpoint": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
                    "timeout": 5000
                }
            }
        }
    ]
}
```

### `fallback`

The `fallback` mechanism allows you to specify more than one GraphQL endpoint, for the same source.

This is helpful if you have a fallback endpoint for the same GraphQL API.

```json
{
    "sources": [
        {
            "name": "uniswapv2",
            "handler": {
                "graphql": {
                    "strategy": "fallback",
                    "sources": [
                        {
                            "endpoint": "https://bad-uniswap-v2-api.com",
                            "retry": 2,
                            "timeout": 5000
                        },
                        {
                            "endpoint": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
                        }
                    ]
                }
            }
        }
    ]
}
```

### `race`

The `race` mechanism allows you to specify more than one GraphQL endpoint, for the same source, and race on every execution.

If you have different places that the service is deployed, this is useful to get the fastest response by racing them.

```json
{
    "sources": [
        {
            "name": "uniswapv2",
            "handler": {
                "graphql": {
                    "strategy": "race",
                    "sources": [
                        {
                            "endpoint": "https://bad-uniswap-v2-api.com"
                        },
                        {
                            "endpoint": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
                        }
                    ]
                }
            }
        }
    ]
}
``` -->

## Config API Reference

-  `endpoint` (type: `String`, required) - URL or file path for your remote GraphQL endpoint
   -  Local file types must be `.js` or `.ts`.
-  `schemaHeaders` (type: `Any`) - JSON object for adding headers to API calls for runtime schema introspection
-  `operationHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime operation execution
-  `useGETForQueries` (type: `Boolean`) - An HTTP GET method for query operations
-  `method` (type: `String (GET | POST)`) - An HTTP method for GraphQL operations
<!-- 
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
