---
title: Batching with API Mesh
description: Learn how API Mesh uses batching. 
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Batching with API Mesh for Adobe Developer App Builder

Batching allows you to combine a group of requests into a single request, turning multiple queries into a single one. Compared to sending multiple queries simultaneously, batched requests result in better response times. They also avoid issues with rate-limiting.

## The `n+1` problem

The `n+1` problem occurs when you request multiple pieces of information that cause the system to make multiple (`n`) queries to a source instead of using a single query. Since each query takes approximately the same amount of time, processing many queries can lead to degraded performance. In this example, a Reviews API contains reviews of your products by SKU. Without batching, you would need to query each SKU individually to return the corresponding reviews.

## Example (without batching)

Consider a scenario where you are using the following mesh, where the `Reviews` source is a third-party API that contains reviews for your products by SKU. Each review consists of a `review`, `customer_name`, and `rating` field.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Products",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      },
      {
        "name": "Reviews",
        "handler": {
          "graphql": {
            "endpoint": "<Reviews_API_URL>",
            "useGETForQueries": true
          }
        }
      }
    ],
    "additionalTypeDefs": "extend type ConfigurableProduct { customer_reviews: [productReviewslist]} ",
    "additionalResolvers": [
      {
        "targetFieldName": "customer_reviews",
        "targetTypeName": "ConfigurableProduct",
        "sourceName": "Reviews",
        "sourceTypeName": "Query",
        "sourceFieldName": "productsReviews",
        "requiredSelectionSet": "{ sku }",
        "sourceArgs": {
          "sku": "{root.sku}"
        }
      }
    ],
    "responseConfig": {
      "includeHTTPDetails": true
    }
  }
}
```

<InlineAlert variant="info" slots="text"/>

Use `"includeHTTPDetails": true` to see response details that indicate how many calls your mesh made to each source.

The [custom resolver](./extending-unified-schema.md) extends the type `ConfigurableProdcut` with a new `customer_reviews` field, which allows nesting review fields inside of queries against the Venia source. The resolver is composed of the following components:

- The target (`targetTypeName`, `targetFieldName`) - describes the queried field.
- The source (`sourceName`, `sourceTypeName`, `sourceFieldName`) - describes where the data is resolved for the target field.
- `requiredSelectionSet` fetches the required arguments.
- `sourceArgs` maps the `requiredSelectionSet` argument to the source.

The following query causes multiple calls to the Reviews API:

```graphql
{
  products(filter: { sku: { in: ["VD03", "VT12"] } }) {
    items {
      ... on ConfigurableProduct {
        sku
        name
        customer_reviews {
          sku
          reviews {
            review
            customer_name
            rating
          }
        }
        __typename
      }
    }
  }
}
```

## Batching example

The `Reviews` source takes an array of product SKUs and returns an array of reviews for each SKU. To make a single network request to the `Reviews` source for multiple SKUs, add `keysArg` and `keyField` to your mesh.

<InlineAlert variant="info" slots="text"/>

Request batching using API Mesh requires a source endpoint capable of processing an array of values.

```json
{
    "meshConfig": {
        "sources": [
            {
                "name": "Products",
                "handler": {
                    "graphql": {
                        "endpoint": " https://venia.magento.com/graphql"
                    }
                }
            },
            {
                "name": "Reviews",
                "handler": {
                    "graphql": {
                        "endpoint": "<Reviews_API_URL>",
                        "useGETForQueries":true
                    }
                }
            }
        ],
        "additionalTypeDefs": "extend type ConfigurableProduct { customer_reviews: productReviewslist} " ,
        "additionalResolvers" : [
          {
            "targetFieldName" : "customer_reviews",
            "targetTypeName" : "ConfigurableProduct",
            "sourceName": "Reviews",
            "sourceTypeName": "Query",
            "sourceFieldName": "productsReviews",
            "keysArg": "sku",
            "keyField": "sku"
        }],
        "responseConfig": {
            "includeHTTPDetails": true
        }
    }
}
```

`requiredSelectionSet` and `sourceArgs` are replaced with `keysarg` and `keyField`:

- `keysArg` provides the name of the primary key argument. For this example, the `keysArg` field is the argument name used when sending an array of SKUs to fetch multiple reviews.
- `keyField` provides the key-value for each item in the batched query. For this example, the `keyField` indicates which Product field provides the SKU value to the review service.

With the updated mesh, using the [previous query](#example-without-batching) returns the same information, but only makes one call to the `Reviews` source for multiple SKUs.
