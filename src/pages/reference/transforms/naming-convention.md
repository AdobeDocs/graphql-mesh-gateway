---
title: naming-convention Transform | API Mesh for Adobe Developer App Builder
---

# `naming-convention` transform

The `naming-convention` transforms allow you to apply casing and other conventions to your response.

## Usage

<InlineAlert variant="info" slots="text"/>

In this example, enumValues fields are converted to uppercase, while fieldNames are converted to camel case to enforce consistency.

Add the following configuration to your Mesh config file:

```json
{
  "transforms": [
    {
      "namingConvention": {
        "mode": "bare | wrap",
        "typeNames": "pascalCase",
        "enumValues": "upperCase",
        "fieldNames": "camelCase",
        "fieldArgumentNames": "camelCase"
      }
    }
  ]
}
```

<InlineAlert variant="info" slots="text"/>

For information about "bare" and "wrap" modes, please read the [dedicated section](index.md#two-different-modes)

## Config API Reference

-  `mode` (type: String (`bare` | `wrap`)) - Specify to apply naming-convention transforms to bare schema or by wrapping original schema
-  `typeNames` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
-  `fieldNames` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
-  `enumValues` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
-  `fieldArgumentNames` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
