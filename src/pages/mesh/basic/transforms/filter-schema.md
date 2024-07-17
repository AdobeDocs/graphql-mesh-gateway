---
title: filterSchema | API Mesh for Adobe Developer App Builder
description: Learn how to specify which schema elements to include or exclude with the filterSchema transform.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# `filterSchema` transform

The `filterSchema` transform allows you to specify which schema elements to include or exclude in your mesh. You can include or exclude entire queries and mutations, or place restrictions on which types can appear in your calls.

For example, you might want to exclude deprecated queries, mutations, and types from your schema so that your integration is not affected when these entities are removed. In the example below, the deprecated Adobe Commerce `category` and `customerOrders` queries are filtered out of the [PWA](https://developer.adobe.com/commerce/pwa-studio/) handler.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "AEM",
        "handler": {
          "graphql": {
            "endpoint": "https://example1.com/graphql"
          }
        }
      },
      {
        "name": "PWA",
        "handler": {
          "graphql": {
            "endpoint": "https://example2.com/graphql"
          }
        },
        "transforms": [
          {
            "filterSchema": {
              "filters": [
                "Query.!category",
                "Query.!customerOrders"
              ]
            }
          }
        ]
      }
    ]
  },
}
```

## Usage

The following example includes several common filters that you can use with an Adobe Commerce source:

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "AdobeCommerce",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        },
        "transforms": [
          {
            "filterSchema": {
              "filters": [
                // Filter type(s)
                "Type.!Customer", // Remove the `Customer` type
                "Type.!{Customer, Cart}", // Remove the `Customer` and `Cart` types

                // Filter field(s) from type
                "Query.!customer", // Remove the `customer` field from the root `Query` type
                "Mutation.!{createCustomer, createEmptyCart}", // Remove the `createCustomer` and `createEmptyCart` fields from the root `Mutation` type
                "Customer.{firstname, lastname, email, telephone}", // Remove all fields except `firstname`, `lastname`, `email` and `telephone` from the Customer type

                // Filter argument(s) from a single field
                "Query.products.search", // Remove all arguments except `search` from the `products` field in the Query type
                "Query.products.{search, sort}" // Remove all arguments except `search` and `sort` from the `products` field in the Query type
                "Query.products.!pageSize" // Remove the `pageSize` argument from the `products` field in the Query type
                "Query.products.!{pageSize, currentPage}" // Remove the `pageSize` and `currentPage` arguments from the `products` field in the Query type

                // Filter argument(s) from all fields
                "Query.*.id" // Remove all arguments except `id` from all fields in the Query type
                "Query.*.{id, uid}" // Remove all arguments except `id` and `uid` from all fields in the Query type
                "Query.*.!id" // Remove the `id` argument from all fields in Query type
                "Query.*.!{id, uid}" // Remove the `id` and `uid` arguments from all fields in the Query type
              ]
            }
          }
        ]
      }
    ]
  }
}
```

<InlineAlert variant="info" slots="text"/>

For information about `bare` and `wrap` modes, read the [`bare` vs `wrap`](./bare-vs-wrap.md).

## Config API Reference

-  `mode` (type: `String` (`bare` | `wrap`)) - Specify to apply filter-schema transforms to bare schema or by wrapping the original schema
-  `filters` (type: `Array of String`, required) - Array of filter rules
