---
title: namingConvention Transform | API Mesh for Adobe Developer App Builder
---

# namingConvention transform

The `naming-convention` transform allows applying naming convention to GraphQL types and GraphQL fields easily.

## How to use?

Add the following configuration to your Mesh config file:

```json
{
  "transforms": [
    {
      "namingConvention": {
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

You can see our gRPC example that uses this transform to see its application.
[Click here to open the example on GitHub](https://github.com/Urigo/graphql-mesh/tree/master/examples/grpc-example)

## Config API Reference

-  `typeNames` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
-  `fieldNames` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
-  `enumValues` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
-  `fieldArgumentNames` (type: String (`camelCase` | `capitalCase` | `constantCase` | `dotCase` | `headerCase` | `noCase` | `paramCase` | `pascalCase` | `pathCase` | `sentenceCase` | `snakeCase` | `upperCase` | `lowerCase`))
