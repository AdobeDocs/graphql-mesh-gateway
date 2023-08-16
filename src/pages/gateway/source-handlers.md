---
title: Add source handlers
description: How to add supported source handlers to your mesh. 
---

# Add source handlers

API Mesh for Adobe Developer App Builder only supports the following [source handlers]:

-  OpenAPI
-  GraphQL
-  JSON schemas
-  SOAP (Experimental)

Whenever a source schema is modified, you must [update your mesh](./create-mesh.md#update-an-existing-mesh) to allow API Mesh to cache any changes.

<InlineAlert variant="info" slots="text"/>

We will add support for additional handlers in future releases.

<InlineAlert variant="warning" slots="text"/>

Only alphanumerical characters are allowed in source handler names.

## OpenAPI

The [OpenAPI] handler allows you to connect to an OpenAPI-complaint REST service endpoint or static Swagger schemas using a `.json` or `.yaml` file.

<InlineAlert variant="info" slots="text"/>

When using a Swagger schema, API Mesh can only access `application/json` content from the Swagger API definition.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "CommerceREST",
        "handler": {
          "openapi": {
            "source": "your_Commerce_API"
          }
        },
      }
    ]
  },
}
```

<InlineAlert variant="info" slots="text"/>

For more information, see the [OpenAPI Config API Reference](../reference/handlers/openapi.md#config-api-reference).

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

<InlineAlert variant="info" slots="text"/>

For more information, see the [GraphQL Config API Reference](../reference/handlers/graphql.md#config-api-reference).

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

For more information, see the [JSON Schema Config API Reference](../reference/handlers/json-schema.md#config-api-reference).

## SOAP

<InlineAlert variant="warning" slots="text"/>

The SOAP handler is experimental and should not be used in production deployments.

The SOAP handler allows you to consume [SOAP](https://soapui.org) `WSDL` files and generate a remote executable schema for those services.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "SoapSource",
        "handler": {
          "soap": {
            "source": "http://<Commerce Host>/soap?wsdl&services=customerCustomerRepositoryV1",
            "wsdl": "http://<Commerce Host>/soap?wsdl&services=customerCustomerRepositoryV1",
            "operationHeaders": {
              "x-operation-header-key": "sample-x-operation-header-value"
            },
            "schemaHeaders": {
              "x-schema-header-key": "sample-x-schema-header-value"
            }
          }
        }
      }
    ]
  }
}
```

<InlineAlert variant="info" slots="text"/>

For more information, see the [SOAP handler reference](../reference/handlers/soap.md#config-api-reference).

<!-- Link Definitions -->

[GraphQL Mesh]: getting-started.md
[source handlers]: source-handlers.md
[header]: headers.md
[OpenAPI]: /reference/handlers/openapi.md
[GraphQL]: /reference/handlers/graphql.md
[JSON]: /reference/handlers/json-schema.md
