---
title: rename Transform | API Mesh for Adobe Developer App Builder
description: Learn how to rename GraphQL types, fields, and field arguments with the rename transform.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# `rename` transform

`rename` transforms allow you to rename a GraphQL field, type, or field argument. Renaming allows you to avoid conflicting names, simplify complicated names, and make queries look more like mutations. In the example below, we rename a long API field name from `integrationCustomerTokenServiceV1CreateCustomerAccessTokenPost` to the shorter `CreateCustomerToken`.

`rename` elements can contain arrays of individual renaming operations, defined in separate `renames` objects. Each of these objects must define the `from` and `to` values.

<InlineAlert variant="info" slots="text"/>

You can use regular expression flags to enable the use of regular expressions when renaming using this transform. For example, you could use the key-value pair `field: api(.*)` in the `from` object to rename any field of the corresponding type that begins with "api".

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "CommerceREST",
        "handler": {
          "openapi": {
            "source": "https://www.example.com/rest/all/schema?services=all"
          }
        },
          "transforms": [
            {
              "rename": {
              "renames": [
                {
                  "from": {
                    "type": "Mutation",
                    "field": "integrationCustomerTokenServiceV1CreateCustomerAccessTokenPost"
                  },
                  "to": {
                    "type": "Mutation",
                    "field": "CreateCustomerToken"
                  }
                }
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

The following example renames the `currency` query field to `currencyType` in the Adobe Commerce source:

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "AdobeCommerce",
        "transforms": [
          {
            "rename": {
              "renames": [
                {
                  "from": {
                    "type": "Query",
                    "field": "currency"
                  },
                  "to": {
                    "type": "Query",
                    "field": "currencyType"
                  }
                }
              ]
            }
          }
        ],
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      }
    ]
  }
}
```

<InlineAlert variant="info" slots="text"/>

The `type` and `field` values are required when renaming a field `argument`.

You can use regular expression flags to enable the use of regular expressions when renaming using this transform. This way you can rename multiple types, fields, or both.

For example, you could use the key-value pair field: `Api(.*)` in the `from` object to rename any field of the corresponding type that begins with "api".

```json
[
  {
    "rename": {
      "mode": "bare | wrap",
      "renames": [
        {
          "from": {
            "type": "Api(.*)"
          },
          "to": {
            "type": "$1"
          },
          "useRegExpForTypes": true
        },
        {
          "from": {
            "type": "Query",
            "field": "api(.*)"
          },
          "to": {
            "type": "Query",
            "field": "$1"
          },
          "useRegExpForFields": true
        }
      ]
    }
  }
]
```

<InlineAlert variant="info" slots="text"/>

For information about `bare` and `wrap` modes, read the [dedicated section](/reference/transforms/index.md#two-different-modes).

## Config API Reference

-  `mode` (type: `String` (`bare` | `wrap`)) - Specify to apply `rename` transforms to bare schema or by wrapping original schema
-  `renames` (type: `Array of Object`, required) - Array of `rename` rules:
   -  `from` (type: `Object`, required):
      -  `type` (type: `String`)
      -  `field` (type: `String`)
      -  `argument` (type: `String`)
   -  `to` (type: `Object`, required):
      -  `type` (type: `String`)
      -  `field` (type: `String`)
      -  `argument` (type: `String`)
   -  `useRegExpForTypes` (type: `Boolean`)  - Use Regular Expression for type names
   -  `useRegExpForFields` (type: `Boolean`)  - Use Regular Expression for field names
   -  `useRegExpForArguments` (type: `Boolean`)  - Use Regular Expression for field names
   -  `regExpFlags` (type: `String`) - Flags to use in the Regular Expression
