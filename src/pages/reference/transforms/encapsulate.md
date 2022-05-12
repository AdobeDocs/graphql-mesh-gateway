---
id: encapsulate
title: Encapsulate Transform
sidebar_label: Encapsulate
---

# encapsulate transforms (GraphQL Mesh)

The `encapsulate` transform allow you to easily encapsulate a specific schema into a single field under the root type.

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

This transformer is useful when you have multiple APIs in your Mesh, and you wish to have it wrapped with a name to have a better understanding on where each field is coming from.

To get started with this transform, install it:

<PackageInstall packages="@graphql-mesh/transform-encapsulate" />

## How to use?

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

-  `name` (type: `String`) - Optional, name to use for grouping under the root types. If not specific, the API name is used.
-  `applyTo` (type: `Object`) - Allow you to choose which root operations you would like to apply. By default, it's applied to all root types.:
   -  `query` (type: `Boolean`)
   -  `mutation` (type: `Boolean`)
   -  `subscription` (type: `Boolean`)
