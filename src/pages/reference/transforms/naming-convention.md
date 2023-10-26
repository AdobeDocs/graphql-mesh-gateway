---
title: naming-convention | API Mesh for Adobe Developer App Builder
description: Learn how to apply casing to respobse data with the naming-convention transform.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# `naming-convention` transform

The `naming-convention` transforms allow you to apply casing and other conventions to your response.

## Usage

The following example converts all of your `fieldNames` to lower case in the Adobe Commerce source:

```JSON
{
  "meshConfig": {
    "sources": [
      {
        "name": "AdobeCommerce",
        "transforms": [
          {
            "namingConvention": {
              "fieldNames": "lowerCase"
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

For information about `bare` and `wrap` modes, please read the [dedicated section](index.md#two-different-modes)

## Config API Reference

<InlineAlert variant="info" slots="text"/>

<p>
The following case options should not be used because they violate the [GraphQL](https://spec.graphql.org/June2018/#sec-Names):

- `capitalCase`
- `dotCase`
- `headerCase`
- `noCase`
- `paramCase`
- `pathCase`
- `sentenceCase`

</p>

-  `mode` (type: String (`bare` | `wrap`)) - Specify to apply naming-convention transforms to bare schema or by wrapping original schema
-  `typeNames` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
-  `fieldNames` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
-  `enumValues` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
-  `fieldArgumentNames` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
