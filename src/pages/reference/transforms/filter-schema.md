---
title: filterSchema Transform | Adobe Graph
---

# filterSchema transform

The `filterSchema` transform allows you to filter fields in specific types.

## How to use?

Add the following configuration to your Mesh config file:

```json
{
  "transforms": [
    {
      "filterSchema": {
        "mode": "bare | wrap",
        "filters": [
          "Type.!User",
          "Type.!{User, Post}",
          "Query.!admins",
          "Mutation.!{addUser, removeUser}",
          "User.{id, username, name, age}",
          "Query.user.id",
          "Query.user.!name",
          "Query.user.{id, name}",
          "Query.user.!{id, name}",
          "Query.*.id",
          "Query.*.!name",
          "Query.*.{id, name}",
          "Query.*.!{id, name}"
        ]
      }
    }
  ]
}
```

Let's assume you have the following schema,

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

With the following Filter Schema config,

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

For information about "bare" and "wrap" modes, please read the [dedicated section](index.md#two-different-modes).

## Config API Reference

-  `mode` (type: `String` (`bare` | `wrap`)) - Specify to apply filter-schema transforms to bare schema or by wrapping original schema
-  `filters` (type: `Array of String`, required) - Array of filter rules
