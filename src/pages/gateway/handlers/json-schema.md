---
title: JSON Schema | API Mesh for Adobe Developer App Builder
description: Learn how to integrate a JSON schemas with the JsonSchema handler.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - Tools
---

# `JsonSchema` handlers

The `JsonSchema` handler allows you to load a single remote REST endpoint and define the request and response structures using pre-defined JSON schema files.

<InlineAlert variant="warning" slots="text"/>

The `JsonSchema` source uses a different capitalization scheme than other handlers. Using `jsonSchema` will result in an error.

```json
{
  "meshConfig": {
      "sources": [
          {
              "name": "carts",
              "handler": {
                  "JsonSchema": {
                      "baseUrl": "<your_Commerce_url>",
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

This handler allows you to load any remote REST service and describe its request and response. JSON Schema handlers allow you to customize and control the GraphQL schema.

If your REST service's request or response format is modified, you must update your mesh configuration file with the modified request or response. Then [update your mesh](../../gateway/create-mesh.md#update-an-existing-mesh) to allow API Mesh to cache any changes.

If your source handler's schema is modified, you must [update your mesh](../../gateway/create-mesh.md#update-an-existing-mesh) to allow API Mesh to cache any changes.

For more information on creating JSON schemas, refer to this [JSON schema tutorial](https://json-schema.org/learn/getting-started-step-by-step.html).

<InlineAlert variant="info" slots="text"/>

JSON Schema handlers do not support `responseConfig` functionality.

The JSON Schema handler uses the following format:

```json
{
  "sources": [
    {
      "name": "MyApi",
      "handler": {
        "JsonSchema": {
          "baseUrl": "https://your-service-url/endpoint/",
          "operations": [
            {
              "type": "Query",
              "field": "users",
              "path": "/users",
              "method": "GET",
              "responseSchema": "https://json-schema/schema.json"
            }
          ]
        }
      }
    }
  ]
}
```

JSON Schema handlers can also use local sources, see [Reference local file handlers](../../gateway/./handlers/index.md#reference-local-files-in-handlers) for more information.

The following example returns your header values, so you can confirm your headers are functioning properly.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "headersData",
        "handler": {
          "JsonSchema": {
            "baseUrl": "<your baseUrl>",
            "operationHeaders": {
              "sample-operation-header": "sample operation value"
            },
            "schemaHeaders": {
              "sample-schema-header": "sample schema value"
            },
            "operations": [
              {
                "type": "Query",
                "field": "data",
                "path": "/getHeadersData",
                "method": "GET",
                "responseSchema": "./getHeadersSchema.json"
              }
            ],
            "ignoreErrorResponses": false
          }
        }
      }
    ],
    "files": [
      {
        "path": "./getHeadersSchema.json",
        "content": "{\"$schema\":\"http://json-schema.org/draft-07/schema#\",\"type\":\"object\",\"required\":[\"headerKeys\",\"headerValues\",\"headers\"],\"properties\":{\"headerKeys\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}},\"headerValues\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}},\"headers\":{\"type\":\"object\"}}}"
      }
    ]
  }
}
```

## Headers from context

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

<!-- And for `mesh dev` or `mesh start`, you can pass the value using `x-my-graphql-api-token` HTTP header.

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

 `Mesh Sample Example - mesh.json file`

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
``` -->

## Query Parameters

There are multiple methods for defining query parameters. Select the method that fits your needs, or combine multiple methods:

### Automatically declare query parameters

API Mesh automatically generates arguments for operations (if needed). Arguments are generated as nullable strings by default.

```json
{
    "sources": [
        {
            "name": "MyGraphQLApi",
            "handler": {
                "JsonSchema": {
                    "baseUrl": "https://your-service/endpoint/",
                    "operations": [
                        {
                            "type": "Query",
                            "field": "user",
                            "path": "/user?id={args.id}",
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

### Manually declare query parameters

You can define the operation's arguments by modifying the `argTypeMap` config field according to the JSON Schema spec.

In this example, we declare a `page` argument as an object with `limit` and `offset` properties:

```json
{
    "argTypeMap": {
        "page": {
            "type": "object",
            "properties": {
                "limit": {
                    "type": "number"
                },
                "offset": {
                    "type": "number"
                }
            }
        }
    }
}
```

Arguments should be added to the path using the `queryParamArgMap` config field, especially for non-primitive types.

Here we add the `page` argument to the query parameters:

```json
{
    "sources": [
        {
            "name": "MyGraphQLApi",
            "handler": {
                "JsonSchema": {
                    "baseUrl": "https://your-service-/endpoint/",
                    "operations": [
                        {
                            "type": "Query",
                            "field": "users",
                            "path": "/getUsers",
                            "method": "GET",
                            "responseSample": "./jsons/MyField.response.json",
                            "responseTypeName": "MyResponseName",
                            "argTypeMap": {
                                "page": {
                                    "type": "object",
                                    "properties": {
                                        "limit": {
                                            "type": "number"
                                        },
                                        "offset": {
                                            "type": "number"
                                        }
                                    }
                                }
                            },
                            "queryParamArgMap": {
                                "page": "page"
                            }
                        }
                    ]
                }
            }
        }
    ]
}
```

<!-- ### Global arguments

Query arguments could be defined globally, on the handler level, so they are added to all operations.

In this example, we declare the `limit` parameter with a default value of `10` and an `api_key` with a dynamic value taken from the environment:

```json
{
    "sources": [
        {
            "name": "MyGraphQLApi",
            "handler": {
                "JsonSchema": {
                    "baseUrl": "https://some-service-url/endpoint-path/",
                    "queryParams": {
                        "limit": 10,
                        "api_key": {
                            "env.MY_API_KEY": null
                        }
                    }
                }
            }
        }
    ]
}
```

<InlineAlert variant="info" slots="text"/>

`queryParams` are automatically added to the query. If the argument is defined both on the handler AND operation level, the operation level argument will be used. -->
## Config API reference

-  `baseUrl` (type: `String`) - URL or file path for your JSON schema.
-  `schemaHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime schema introspection
-  `operationHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime operation execution
-  `operations` - (required) Array of:
   -  `object`:
      -  `field` (type: `String`, required)
         -  Cannot contain hyphens.
      -  `description` (type: `String`)
      -  `type` (type: `String (Query | Mutation | Subscription)`, required)
      -  `requestSchema` (type: `Any`)
      -  `requestSample` (type: `Any`)
      -  `requestTypeName` (type: `String`)
      -  `responseSchema` (type: `Any`)
         -  Remote files and URLs are not supported. You must provide a local path.
      -  `responseSample` (type: `Any`)
         -  Remote files and URLs are not supported. You must provide a local path.
      -  `responseTypeName` (type: `String`)
      -  `argTypeMap` (type: `JSON`)
-  `ignoreErrorResponses` (type: `Boolean`) - Flag for ignoring errors in the response
<!--   
`path` (type: `String`, required)
`method` (type: `String (GET | HEAD | POST | PUT | DELETE | CONNECT | OPTIONS | TRACE | PATCH)`)
`headers` (type: `JSON`)
`binary` (type: `Boolean`) - If true, this operation cannot have requestSchema or requestSample
And the request body will be passed as binary with its mime type
unless you define an explicit Content-Type header
`object`:
    `field` (type: `String`, required)
    `description` (type: `String`)
    `type` (type: `String (Query | Mutation | Subscription)`, required)
    `requestSchema` (type: `Any`)
    `requestSample` (type: `Any`)
    `requestTypeName` (type: `String`)
    `requestBaseBody` (type: `Any`) - This body will be merged with the request body sent with the underlying HTTP request
    `responseSchema` (type: `Any`)
    `responseSample` (type: `Any`)
    `responseTypeName` (type: `String`)
    `argTypeMap` (type: `JSON`)
    `pubsubTopic` (type: `String`, required) 
-->
