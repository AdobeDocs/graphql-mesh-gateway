---
title: filterSchema | API Mesh for Adobe Developer App Builder
description: Learn how to specify which schema elements to include or exclude with the filterSchema transform.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# `filterSchema` transform

The `filterSchema` transform allows you to specify which schema elements to include or exclude in your mesh.
You can include or exclude entire queries and mutations and restrict which types can appear in your calls or which fields can appear in specific types.

For example, you might want to exclude deprecated queries, mutations, and types from your schema so that your integration is not affected when these entities are removed.

## Usage

Add the following configuration to your Mesh config file:

```json
{
  "transforms": [
    {
      "filterSchema": {
        "mode": "bare | wrap",
        "filters": [
          "Type.!User",
            // This will remove `User` type
          "Type.!{User, Post}",
            // This will remove `User` and `Post` types
          "Query.!admins",
            // This will remove field `admins` from `Query` type
          "Mutation.!{addUser, removeUser}",
            // This will remove fields `addUser` and `removeUser` from `Mutation` type
          "User.{id, username, name, age}",
            // This will remove all fields, from User type, except `id`, `username`, `name` and `age`
          "Query.user.id",
            // This will remove all args from field `user`, in Query type, except `id` only
          "Query.user.!name",
            // This will remove argument `name` from field `user`, in Query type
          "Query.user.{id, name}",
            // This will remove all args for field `user`, in Query type, except `id` and `name`
          "Query.user.!{id, name}",
            // This will remove args `id` and `name` from field `user`, in Query type
          "Query.*.id",
            // This will remove all args from all fields in Query type, except `id` only
          "Query.*.!name",
            // This will remove argument `name` from all fields in Query type
          "Query.*.{id, name}",
            // This will remove all args from all fields in Query type, except `id` and `name`
          "Query.*.!{id, name}"
            // This will remove args `id` and `name` from all fields in Query type
        ]
      }
    }
  ]
}
```

The following example excludes the `company` type in Adobe Commerce:

```JSON
{
  "meshConfig": {
    "sources": [
      {
        "name": "FilterSchemaCreate",
        "transforms": [
          {
            "filterSchema": {
              "mode": "bare",
              "filters": [
                "Query.!company"
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

## Example

Let's assume you have the following schema:

```graphql
type Query {
  me: User
  users: [User]
  user(id: ID, name: String): User
  admins: [User]
}

type Mutation {
  updateMyProfile(name: String, age: Int): User
  addUser(username: String, name: String, age: Int): User
  removeUser(id: ID): ID
}

type User {
  id: ID
  username: String
  password: String
  name: String
  age: Int
  ipAddress: String
}

type LooseType {
  foo: String
  bar: String
}
```

With the following Filter Schema config:

```json
{
  "transforms": [
    {
      "filterSchema": {
        "mode": "bare | wrap",
        "filters": [
          "Type.!LooseType",
          "Query.!admins",
          "Mutation.!{addUser, removeUser}",
          "User.{username, name, age}",
          "Query.user.!name"
        ]
      }
    }
  ]
}
```

It would become the following schema:

```graphql
type Query {
  me: User
  users: [User]
  user(id: ID): User
}

type Mutation {
  updateMyProfile(name: String, age: Int): User
}

type User {
  username: String
  name: String
  age: Int
}
```

<InlineAlert variant="info" slots="text"/>

For information about `bare` and `wrap` modes, read the [dedicated section](index.md#two-different-modes).

## Config API Reference

-  `mode` (type: `String` (`bare` | `wrap`)) - Specify to apply filter-schema transforms to bare schema or by wrapping the original schema
-  `filters` (type: `Array of String`, required) - Array of filter rules
