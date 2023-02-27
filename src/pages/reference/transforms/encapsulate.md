---
title: encapsulate Transform | API Mesh for Adobe Developer App Builder
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

This transformer is useful when you have multiple APIs in your Mesh Gateway and you wish to have it wrapped with a name to better understand where each field is coming from.

## Usage

```json
{
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

```

## Config API Reference

-  `name` (type: `String`) - Optional, the name used for grouping under root types. If you do not specify a name, the API name will be used.
-  `applyTo` (type: `Object`) - Allow you to choose which root operations you would like to apply. By default, it's applied to all root types.:
   -  `query` (type: `Boolean`)
   -  `mutation` (type: `Boolean`)
   -  `subscription` (type: `Boolean`)
