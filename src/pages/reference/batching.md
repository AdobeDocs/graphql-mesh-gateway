---
title: Batching with API Mesh
description: Learn how API Mesh uses batching. 
kewords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Batching with API Mesh for Adobe Developer App Builder

Batching allows you to combine a group of requests into a single request, turning multiple queries into a single one. Compared to sending multiple queries simultaneously, batched requests result in better response times. They also avoid issues with rate-limiting.

Consider a scenario where you are using the following mesh, where `<reviews_api>` is a third-party API that contains reviews for your products by SKU. Each review has a `review`, `customer_name`, and `rating` field.

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
                "name": "Reviews API",
                "handler": {
                    "graphql": {
                        "endpoint": "<Reviews_API_URL>",
                        "useGETForQueries":true
                    }
                }
            }
        ]
    }
}
```

The following query causes multiple calls to the Reviews API:

```graphql
NEED EXAMPLE
```

To make a single network request to each source, modify the mesh configuration to contain the `addtionalTypeDef` and `additionalResolver` described below:

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
                        "endpoint": " https://development-105661-batching-stage.adobeioruntime.net/api/v1/web/io-graphql/graphql",
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

The custom resolver extends the type `ConfigurableProdcut` with a new `customer_reviews` field, which allows for the nesting review fields inside of queries against the Venia source. The resolver is composed of the following components:

- The target (`targetTypeName`, `targetFieldName`) - describes the queried field.
- The source (`sourceName`, `sourceTypeName`, `sourceFieldName`) - describes where the data is resolved for the target field.
- The keys (`keysArg`, `keyField`):
  - `keysArg` provides the name of the primary key argument. For this example, the `keysArg` field is the argument name used when sending an array of SKUs to fetch multiple reviews.
  - `keyField` provides the key value for each item in the batched query. For this example, the `keyField` indicates which Product field provides the SKU value to the review service.

The following query uses the custom resolver to batch the nested data, making only one call to each source:

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

<InlineAlert variant="info" slots="text"/>

Use `"includeHTTPDetails": true` to see response details that indicate how many calls your mesh made to each source.
