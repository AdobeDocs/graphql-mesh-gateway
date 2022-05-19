---
title: rename Transform | Adobe Graph
---

# rename transform

The `rename` transform allows you to rename:

-  GraphQL types
-  GraphQL fields
-  GraphQL field arguments

## How to use?

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

`type` and `field` are mandatory to rename a field argument with `argument`.

Or you can use regular expressions to rename multiple types, fields or both:

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

For information about "bare" and "wrap" modes, please read the [dedicated section](index.md#two-different-modes).

## Config API Reference

-  `mode` (type: `String` (`bare` | `wrap`)) - Specify to apply rename transforms to bare schema or by wrapping original schema
-  `renames` (type: `Array of Object`, required) - Array of rename rules:
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
