---
title: Add source handlers
description: How to add supported source handlers to your mesh. 
---

# Add source handlers

Although [GraphQL Mesh] supports many types of [source handlers], at launch API Mesh for Adobe Developer App Builder only supports the following:

-  [OpenAPI](#openapi)
   -  [API Handler Configuration](#api-handler-configuration)
-  [GraphQL endpoints](#graphql-endpoints)
   -  [GraphQL Handler Configuration](#graphql-handler-configuration)
-  [JSON schemas](#json-schemas)
   -  [JSON Schema Handler Configuration](#json-schema-handler-configuration)

<InlineAlert variant="info" slots="text"/>

We will add support for additional handlers in future releases.

<InlineAlert variant="warning" slots="text"/>

Hyphens are disallowed in source handler names.

## OpenAPI

The [OpenAPI] handler allows you to connect to an OpenAPI-complaint REST service endpoint or static Swagger schemas using a `.json` or `.yaml` file.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "MagentoREST",
        "handler": {
          "openapi": {
            "source": "your_Magento_API"
          }
        },
      }
    ]
  },
}
```

### API Handler Configuration

 The API Mesh currently supports the following configuration options for API handlers.

-  **source** - Your API source or endpoint
-  **sourceFormat** - The format of the source file (`json` | `yaml`)
-  **schemaHeaders** - JSON Headers to fetch your schema
-  **operationHeaders** - JSON headers for your API calls
-  **baseUrl** - Your base URL
-  **qs** - JSON object for query search parameters
-  **includeHttpDetails** - A boolean flag to include HTTP Response details

<InlineAlert variant="info" slots="text"/>

For more information, see GraphQL Mesh's [Config API Reference]. Note that the API Mesh uses an older version of GraphQL Mesh, so settings in external documentation may not be accurate for these purposes. Additionally, only the options specified above are currently supported.

## GraphQL endpoints

The [GraphQL] handler allows you to connect to a GraphQL endpoint.

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

### GraphQL Handler Configuration

 The API Mesh currently supports the following configuration options for GraphQL handlers.

-  **endpoint** - The URL or path of your GraphQL endpoint
-  **schemaHeaders** - JSON Headers to fetch your schema
-  **operationHeaders** - JSON headers for your calls
-  **useGETForQueries** - A boolean option to use HTTP GET
-  **method** - HTTP method used (`GET` | `POST`)

<InlineAlert variant="info" slots="text"/>

For more information, see GraphQL Mesh's [GraphQL Config API Reference]. Note that the API Mesh uses an older version of GraphQL Mesh, so settings in external documentation may not be accurate for these purposes. Additionally, only the options specified above are currently supported.

## JSON schemas

The [JSON] handler allows you to load a single remote REST endpoint and define the request and response structures using pre-defined JSON schema files.

<InlineAlert variant="warning" slots="text"/>

The `JsonSchema` source in GraphQL Mesh uses a different capitalization scheme than other handlers. Using `jsonSchema` will result in an error.  

```json
{
  "meshConfig": {
      "sources": [
          {
              "name": "carts",
              "handler": {
                  "JsonSchema": {
                      "baseUrl": "<your_Magento_url>",
                      "operations": [
                          {
                              "type": "Query",
                              "field": "data",
                              "path": "/cart",
                              "method": "GET",
                              "responseSchema": "./carts-response-schema.json"
                          }
                      ]
                  }
              }
          }
      ]
  },
}
```

### JSON Schema Handler Configuration

 The API Mesh currently supports the following configuration options for JSON Schema handlers.

-  **baseurl** - The URL or path of your JSON Schema
-  **schemaHeaders** - JSON Headers to fetch your schema
-  **operationHeaders** - JSON headers for your calls
-  **operations** - An array that contains:
   -  field
   -  description
   -  type (`Query` | `Mutation` | `Subscription`)
   -  requestSchema
   -  requestSample
   -  requestTypeName
   -  requestBaseBody - This body will merge with the request body sent with the HTTP request
   -  responseSchema
   -  responseSample
   -  responseTypeName
   -  argTypeMap
   -  pubsubTopic
-  **ignoreErrorResponses** - A Boolean option to ignore errors

<InlineAlert variant="info" slots="text"/>

For more information, see GraphQL Mesh's [JSON Schema Config API Reference]. Note that the API Mesh uses an older version of GraphQL Mesh, so settings in external documentation may not be accurate for these purposes. Additionally, only the options specified above are currently supported.

<!-- Link Definitions -->

[GraphQL Mesh]: getting-started.md
[source handlers]: source-handlers.md
[header]: headers.md
[OpenAPI]: /reference/handlers/openapi.md
[GraphQL]: /reference/handlers/graphql.md
[JSON]: /reference/handlers/json-schema.md
[OpenAPI Config API Reference]: /reference/handlers/openapi.md#config-api-reference
[GraphQL Config API Reference]: /reference/handlers/graphql.md#config-api-reference
[JSON Schema Config API Reference]: /reference/handlers/json-schema.md#config-api-reference
