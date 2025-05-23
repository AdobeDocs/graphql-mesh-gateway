---
title: Headers
description: Specifies the means, format, and restrictions for sending operation headers through the mesh in API Mesh for Adobe Developer App Builder.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Request and response headers

To specify headers for your mesh, you can add them inside the `JSON` file that describes your mesh, or you can add them when querying. Currently, you can add [request headers](#request-headers) and [response headers](#response-headers), which both can contain [cache-control headers](./caching/cache-control-headers.md).

## Request headers

Request headers provide more information about the request context. You can add request headers to your [mesh config](#add-request-headers-in-your-mesh-file).

<InlineAlert variant="info" slots="text"/>

API Mesh limits request headers to a maximum of 500.

### Add request headers in your mesh file

To add headers directly to a source handler in your mesh JSON file, add the `operationHeaders` object with key-value pairs for your headers. The following example defines the `Store` header for the Commerce source and multiple headers for the LiveSearch source.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Commerce",
        "handler": {
          "graphql": {
            "endpoint": "https://<host>/graphql",
            "operationHeaders": {
              "Store": "default"
            }
          }
        }
      },
      {
        "name": "LiveSearch",
        "handler": {
          "graphql": {
            "endpoint": "https://<host>/search/graphql",
            "operationHeaders": {
              "Magento-Environment-Id": "<environment_id>",
              "Magento-Website-Code": "base",
              "Magento-Store-Code": "main_website_store",
              "Magento-Store-View-Code": "default",
              "X-Api-Key": "search_gql"
            }
          }
        }
      }
    ]
  },
}
```

You can also inject dynamic values from the context into your headers. For examples of dynamic header values, select a handler:

-  [OpenAPI handlers](../basic/handlers/openapi.md#headers-from-context)
-  [GraphQL handlers](../basic/handlers/graphql.md#headers-from-context)
-  [JSON Schema handlers](../basic/handlers/json-schema.md#headers-from-context)

#### Media types

Depending on the type of information you are passing in a header, your source might require that you specify a [media type](https://www.iana.org/assignments/media-types/media-types.xhtml), which tells the mesh and your sources how to interpret the data you are passing. Use the `Content-Type` key-value pair in the `operationHeaders` object to define your content format.

In the following example, the `"Content-Type": "application/json"` key-value pair indicates that the content is in JSON format.

```json
"operationHeaders": {
  "Content-Type": "application/json",
},
```

## Response headers

Response headers provide a detailed context of the response. Currently, you can only add response headers from the mesh config.

<InlineAlert variant="info" slots="text"/>

All response header names must be unique. Conflicting header names will result in an error when you try to create or update a mesh.

### Add response headers in your mesh file

Mesh owners can use the `responseConfig.headers` object to add response headers. Define each header as a key-value pair.

``` json
    { 
      "meshConfig": { 
        "sources": [
          {
            "name": "venia", 
            "handler": { 
              "graphql": { 
                "endpoint": "https://venia.magento.com/graphql"
              } 
            } 
          }
        ],
       "responseConfig": {
        "headers": {
            "Cache-Control": "max-age=60480",
            "Vary": "Accept"
          }
        }
      }
    }
```

#### Return forwarded headers

The `responseConfig.headers` object also allows you to return header values from a source. The following example requests the `X-Magento-Cache-Id` and `X-Cache` headers from the Venia source.

<InlineAlert variant="info" slots="text"/>

[JSON Schema handlers](../basic/handlers/json-schema.md) do not support `responseConfig` functionality.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "venia",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        },
        "responseConfig": {
          "headers": [
            "X-Magento-Cache-Id",
            "X-Cache"
          ]
        }
      }
    ]
  }
}
```

#### Conflicting headers

When forwarding headers, an error occurs if two or more sources return a header with the same name. To view all headers, regardless of source, add the `x-include-metadata` header with a value of `true` in your GraphQL client.

Including metadata prefixes the returned response headers with their source name. In the following example, the `cache-control` header values are returned for the `venia` and `commerce` sources.

``` json
{
  "data": {
    ...
    },
  "_ggw_metadata__": {
        "responseHeaders": {
          "x-venia-cache-control": "max-age=3600",
          "x-commerce-cache-control": "max-age=1800",
        }
    }
}
```

### Response tracking and debugging

The following headers are included in subrequests to your mesh sources to assist with tracking and debugging:

- `cf-ray` - Generated automatically
- `x-request-id` - Generated automatically, if the header is not provided in the request

These headers allow you to track and debug requests by assigning a request-specific ID numbers. If you provide your own `x-request-id` in the request header, then the subrequests to sources will include the specified header instead of an automatically generated one. For example:

```json
{
  "x-request-id": "my-request-id"
}
```

## Retrieving handler details

Setting an `httpDetails` header to `true` no longer returns `httpDetails` when querying. Instead, the setting is now controlled at the mesh level by the [`includeHTTPDetails` setting](../basic/work-with-mesh.md#include-httpdetails-in-query-responses).

## Header troubleshooting

### Fastly Prefixing

API mesh prefixes any Fastly source headers with their source name. For example, a source named "commerce" with an `x-magento-cache-id` header is converted to `x-commerce-magento-cache-id`. However, if your endpoint URL contains "magento", API Mesh assumes you are connecting to an Adobe Commerce instance and does not prefix your headers with a source name. Using the previous example, your header would remain `x-magento-cache-id`.

### 401 errors

If you receive a `401` or similar error when passing headers, add the following content-type specification to your mesh configuration file, as described in [media types](#media-types). This issue can occur when you pass your authorization credentials, such as username and password, to an endpoint, but the endpoint does not know how to consume that information. Specifying the `Content-Type` tells your endpoint how to parse the request body.

```json
"operationHeaders": {
  "Content-Type": "application/json",
},
```
