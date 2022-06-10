---
title: JSON Schema or Samples | API Mesh for Adobe Developer App Builder
---
import Headers from '/src/pages/_includes/headers.md'

# JSON schema handlers

This handler allows you to load any remote REST service, and describe its request/response. With this handler, you can easily customize and control the built GraphQL schema.

<InlineAlert variant="warning" slots="text"/>

The `JsonSchema` source in GraphQL Mesh uses a different capitalization scheme than other handlers. Using `jsonSchema` will result in an error.  

To get started, use the handler in your Mesh config file:

```json
{
  "sources": [
    {
      "name": "MyApi",
      "handler": {
        "JsonSchema": {
          "baseUrl": "https://some-service-url/endpoint-path/",
          "operations": [
            {
              "type": "Query",
              "field": "users",
              "path": "/users",
              "method": "GET",
              "responseSchema": "https://my-json-schema/users.json"
            }
          ]
        }
      }
    }
  ]
}
```

JSON Schema handlers can also use local sources, see [Reference local file handlers](../handlers/index.md#reference-local-files-in-handlers) for more information.

## Dynamic Values

<Headers />

<!-- Mesh can take dynamic values from the GraphQL Context or the environmental variables. If you use `mesh dev` or `mesh start`, GraphQL Context will be the incoming HTTP request.

The expression inside dynamic values should be as in JS.

### From Context (HTTP Header for `mesh dev` or `mesh start`)

```json
{
  "sources": [
    {
      "name": "MyGraphQLApi",
      "handler": {
        "JsonSchema": {
          "baseUrl": "https://some-service-url/endpoint-path/",
          "operationHeaders": {
            "Authorization": "Bearer {context.headers['x-my-api-token']}"
          }
        }
      }
    }
  ]
}
```

And for `mesh dev` or `mesh start`, you can pass the value using `x-my-graphql-api-token` HTTP header.

### From Environment Variable

```json
{
  "sources": [
    {
      "name": "MyGraphQLApi",
      "handler": {
        "JsonSchema": {
          "baseUrl": "https://some-service-url/endpoint-path/",
          "operationHeaders": {
            "Authorization": "Bearer {env.MY_API_TOKEN}"
          }
        }
      }
    }
  ]
}
```

### From Arguments

Mesh automatically generates arguments for operations if needed;

```json
{
  "sources": [
    {
      "name": "MyGraphQLApi",
      "handler": {
        "JsonSchema": {
          "baseUrl": "https://some-service-url/endpoint-path/",
          "operations": [
            {
              "type": "Query",
              "field": "user",
              "path": "/user/{args.id}",
              "method": "GET",
              "responseSchema": "./json-schemas/user.json"
            }
          ]
        }
      }
    }
  ]
}
```

This example operation definition will generate a root field with `id: ID` argument, then Mesh will interpolate the expression in `path` to get `id` value from `args`.

### From JSON Samples

Mesh can also load JSON samples from a remote service.
Just add a `json-samples` directory in your project root, and put the JSON samples in there (`responseSample: ./json/MyField.response.json` - Create a new folder like `json`).
By declaring the `responseSample`, you can use the JSON sample in the GraphQL schema.

 `Mesh Sample Example - .meshrc.json file`

```json
{
  "sources": [
    {
      "name": "MyGraphQLApi",
      "handler": {
        "JsonSchema": {
          "baseUrl": "https://some-service-url/endpoint-path/",
          "operations": [
            {
              "type": "Query",
              "field": "MyField",
              "path": "/MyField?id={args.id}",
              "method": "GET",
              "responseSample": "./json/MyField.response.json",
              "responseTypeName": "MyResponseName",
              "argsTypeMap": {
                "id": "String"
              }
            }
          ]
        }
      }
    }
  ]
}
```

 For your `./jsons/MyField.response.json` file, any JSON file can be used.
 -->
## Config API Reference

-  `baseUrl` (type: `String`)
-  `operationHeaders` (type: `JSON`)
-  `schemaHeaders` (type: `JSON`)
-  `operations` -  (required) Array of:
   -  `object`:
      -  `field` (type: `String`, required)
      -  `description` (type: `String`)
      -  `type` (type: `String (Query | Mutation | Subscription)`, required)
      -  `requestSchema` (type: `Any`)
      -  `requestSample` (type: `Any`)
      -  `requestTypeName` (type: `String`)
      -  `requestBaseBody` (type: `Any`) - This body will be merged with the request body sent with the underlying HTTP request
      -  `responseSchema` (type: `Any`)
      -  `responseSample` (type: `Any`)
      -  `responseTypeName` (type: `String`)
      -  `argTypeMap` (type: `JSON`)
      -  `path` (type: `String`, required)
      -  `method` (type: `String (GET | HEAD | POST | PUT | DELETE | CONNECT | OPTIONS | TRACE | PATCH)`)
      -  `headers` (type: `JSON`)
      -  `binary` (type: `Boolean`) - If true, this operation cannot have requestSchema or requestSample
And the request body will be passed as binary with its mime type
unless you define an explicit Content-Type header
   -  `object`:
      -  `field` (type: `String`, required)
      -  `description` (type: `String`)
      -  `type` (type: `String (Query | Mutation | Subscription)`, required)
      -  `requestSchema` (type: `Any`)
      -  `requestSample` (type: `Any`)
      -  `requestTypeName` (type: `String`)
      -  `requestBaseBody` (type: `Any`) - This body will be merged with the request body sent with the underlying HTTP request
      -  `responseSchema` (type: `Any`)
      -  `responseSample` (type: `Any`)
      -  `responseTypeName` (type: `String`)
      -  `argTypeMap` (type: `JSON`)
      -  `pubsubTopic` (type: `String`, required)
-  `ignoreErrorResponses` (type: `Boolean`)
