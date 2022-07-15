---
title: Headers
description: Specifies the means, format, and restrictions for sending operation headers through the mesh in API Mesh for Adobe Developer App Builder.
---

# Headers

To specify request headers for your mesh, you can add them inside the `JSON` file that describes your mesh, or you can add them when querying.

## Configure headers in your mesh file

To add headers directly to a source handler in your mesh file, for example `mesh.json`, add the `operationHeaders` object with key value pairs for your headers. The following example defines the `Store` header for the Commerce source and multiple headers for the LiveSearch source.

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
            "endpoint": "https://<host>/search/graphql"
            "operationHeaders": {
              "Magento-Environment-Id": "<environment_id>"
              "Magento-Website-Code": "base"
              "Magento-Store-Code": "main_website_store"
              "Magento-Store-View-Code": "default"
              "X-Api-Key": "search_gql"
            }
          }
        }
      }
    ]
  },
}
```

## Add context headers

Using context headers allows you to inject header values from the context into your mesh. For examples of context headers, select one of the following:

-  [OpenAPI handlers](../reference/handlers/openapi.md#dynamic-header-values)
-  [GraphQL handlers](../reference/handlers/graphql.md#dynamic-header-values)
-  [JSON schemas](../reference/handlers/json-schema.md#dynamic-header-values)

## Add or update headers at runtime

When you use GraphiQL or another tool to interact with your mesh, you can add headers at runtime that are passed through the mesh to specified handler by using the following format:

-  **Key**: `GGW-SH-<SourceName>-<HeaderName>`

Using this example, the components of the header name are:

-  `GGW-SH` is a required string that indicates to the GraphQL Gateway Server that what follows is a source header.
-  `SourceName` is the name of your previously created source or handler. The source names in the example in the previous section are `Commerce` and `LiveSearch`.
-  `HeaderName` is the name of the header you are adding or modifying. Remember to add a corresponding value for your header.

### Override a default value

Consider a scenario where the value of the `Store` header defined in the previous example is the store view with the most traffic. However, you have additional store views that allow international customers to shop in their native languages and currencies. You can override the predefined value for your UK store view by sending the following header information with your request:

-  **Key**: `GGW-SH-Commerce-Store`
   -  **Value**: `uk`

### Add a header to all sources

If you want to send a header to all sources in your mesh, you can replace the source handler name with `*`. For example:

-  **Key**: `GGW-SH-*-trackingId`
   -  **Value**: `new-trackingId`

This can be useful for authorization, authentication, and tracking headers that could be the same across multiple sources. If you want to apply a header to all sources except one, specify that source separately. For example:

-  **Key**: `GGW-SH-*-trackingId`
   -  **Value**: `new-trackingId`
-  **Key**: `GGW-SH-differentSource-trackingId`
   -  **Value**: `different-trackingId`
