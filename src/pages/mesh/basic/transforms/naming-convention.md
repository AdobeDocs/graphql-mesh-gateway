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

`naming-convention` transforms allow you to apply casing and other conventions to your response. In the example below, `enumValues` fields are converted to uppercase, while `fieldNames` are converted to camel case to enforce consistency.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "PWA",
        "handler": {
          "graphql": {
            "endpoint": "https://example2.com/graphql"
          }
        },
        "transforms": [
          {
            "namingConvention": {
              "enumValues": "upperCase",
              "fieldNames": "camelCase"
            }
          }
        ]
      }
    ]
  },
}
```

## Usage

The following example converts all of your `fieldNames` to lower case in the Adobe Commerce source:

```json
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

For information about `bare` and `wrap` modes, please read [`bare` vs `wrap`](./bare-vs-wrap.md).

## Config API Reference

<InlineAlert variant="info" slots="text"/>

<p>
The following case options should not be used because they violate the <a href="https://spec.graphql.org/October2021/#sec-Names)">GraphQL spec</a>. These options will likely be deprecated in the future.

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
