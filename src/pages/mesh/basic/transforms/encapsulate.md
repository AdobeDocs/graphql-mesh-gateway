---
title: encapsulate | API Mesh for Adobe Developer App Builder
description: Learn how to define a schema for a field with the encapsulate transform.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# `encapsulate` transform

The `encapsulate` transform allows you to easily encapsulate a specific schema into a single field under the root type.

For instance, if your handler created a schema like this, named `mySchema`:

```graphql
type Query {
  something: String
}

type Mutation {
  doSomething: String
}
```

The `encapsulate` transform will change your schema to this:

```graphql
type Query {
  mySchema: mySchemaQuery!
}

type Mutation {
  mySchema: mySchemaMutation!
}

type mySchemaQuery {
  something: String
}

type mySchemaMutation {
  doSomething: String
}
```

This transform is useful when you have multiple APIs in your Mesh Gateway and you wish to have it wrapped with a name to better understand where each field is coming from.

## Usage

The following example encapsulates the Adobe Commerce schema into the `AdobeCommerce` field:

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
            "encapsulate": {
              "applyTo": {
                "query": true,
                "mutation": false,
                "subscription": false
              }
            }
          }
        ]
      }
    ]
  }
}
```

## Adobe Commerce example

If you need to access two Adobe Commerce GraphQL endpoints without introducing any prefixes, using a single API Mesh configuration, you will need a transform strategy to avoid naming conflicts.

Instead of using a [`prefix`](./prefix.md), which will involve more changes, you can use the encapsulate transform and wrap one of the sources within a field. For example, one source would be `data.storeConfig` and another could be `data.source2.storeConfig`. In the following example query, `storeConfig` will continue to point to the main `storeConfig` and `commerce2.storeConfig` will point to your additional source's `storeConfig`.

### Example query

```graphql
query {
  storeConfig {
    store_code
  }

  commerce2 {
    storeConfig {
      store_code
    }    
  }
}
```

### Example mesh configuration

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "commerce",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql/"
          }
        }
      },
      {
        "name": "commerce2",
        "handler": {
          "graphql": {
            "endpoint": "https://<second-commerce-site>.com/graphql/"
          }
        },
        "transforms": [
          {
            "encapsulate": {
              "name": "commerce2",
              "applyTo": {
                "query": true,
                "mutation": true,
                "subscription": false
              }
            }
          }
        ]
      }
    ]
  }
}
```

## Config API Reference

-  `name` (type: `String`) - (Optional) The name used for grouping under root types
   -  If you do not specify a `name`, the API name will be used.
-  `applyTo` (type: `Object`) - The root operations the `encapsulate` applies to. Unspecified options default to `true`:
   -  `query` (type: `Boolean`)
   -  `mutation` (type: `Boolean`)
   -  `subscription` (type: `Boolean`)
