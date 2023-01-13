---
title: rename Transform | API Mesh for Adobe Developer App Builder
---

# rename transform

The `rename` transform allows you to rename:

-  GraphQL types
-  GraphQL fields
-  GraphQL field arguments

The `rename` transform helps you avoid conflicting names, simplify complicated names and make queries look more like mutations.

`rename` elements can contain arrays of individual renaming operations, defined in separate renames objects. Each of these objects must define the `from` and `to` values.

## Usage

Add the following configuration to your Mesh config file:

```json
{
  "transforms": [
    {
      "rename": {
        "mode": "bare | wrap",
        "renames": [
          {
            "from": {
              "type": "ApiUser"
            },
            "to": {
              "type": "User"
            }
          },
          {
            "from": {
              "type": "Query",
              "field": "apiUser"
            },
            "to": {
              "type": "Query",
              "field": "user"
            }
          },
          {
            "from": {
              "type": "Query",
              "field": "user",
              "argument": "user_id"
            },
            "to": {
              "type": "Query",
              "field": "user",
              "argument": "userId"
            }
          }
        ]
      }
    }
  ]
}
```

<InlineAlert variant="info" slots="text"/>

The `type` and `field` values are required when renaming a field `argument`.

You can use RegEx flags to enable the use of regular expressions when renaming using this transform. This way you can rename multiple types, fields, or both.

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

For information about "bare" and "wrap" modes, read the [dedicated section](/reference/transforms/index.md#two-different-modes).

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
