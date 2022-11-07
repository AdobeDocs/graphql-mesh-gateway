---
title: Hooks transform
description: Learn how to use the Hooks transform to add hooks before and after querying your mesh.
---

# Hooks transform

The Hooks transform allows you to invoke a composable [local or remote](#local-vs-remote-functions) function on a particular operation.

<InlineAlert variant="info" slots="text"/>

Hooks cannot be used to modify the request.

If processing time is important, developers should use hook transforms sparingly, because they can increase processing time.

Additionally, hook transforms should not be used to manipulate anything. If you need to manipulate your data, use resolvers.

<!-- link to resolvers, what type of resolvers??? -->

## Hook arguments
<!-- are these actually arguments? -->
Hooks accept the following arguments:

```javascript
{
resolver: string
composer: string
blocking: boolean
}
```

- `resolver` (string) - The target that once invoked triggers the `composer` to execute

    For example, `Query.availableStores` targets the `availableStores` field in the query, which means that if the  query calls the `availableStores` field, then the `composer` will execute.
<!-- need better example? -->

- `composer` (string) - The local or remote file location of the script you want to execute when invoked by the `resolver`
  
    Local scripts must be added to the mesh's [`files` array](../reference/handlers/index.md#reference-local-files-in-handlers). For more information on when to use local or remote functions, see [Local vs remote functions](#local-vs-remote-functions).

- `blocking` (boolean) - (`false` by default) Determines if the query waits for a successful return message before continuing the query.

    Both `before` and `beforeall` hooks accept the `blocking` argument, which allows you to stop running hooks for a query that does not receive a successful response.

    If a successful response is received, the query continues as normal. If an error occurs, the error message will be returned in the response.

    If multiple objects use the same `resolver` and `blocking` is set to `true`, an unsuccessful response means that the `resolver` is not called for the remainder of the operation.

<InlineAlert variant="info" slots="text"/>

The `blocking` argument applies to `Before` and `BeforeAll` only.

## Types of hooks

The following sections describe how to invoke hooks at different points during the query.

### `beforeall`

The `beforeall` hook allows you to insert a function before the query takes place. This is a good place to add an authentication layer or anything else you want to run before your query.
<!-- object or function? -->
<InlineAlert variant="info" slots="text"/>

Currently, the `beforeall` hook does not accept an array.

<!-- need example here -->

### `before`

The `before` hook allows you to insert an object or array before the specified [resolver](#hook-arguments) is resolved. If `blocking` is set to `true` and a blocking response occurs, other queries will resolve as normal.

<!-- need example here -->

### `after`

The `after` hook allows you to insert an object or array after the specified [resolver](#hook-arguments) is resolved.

<InlineAlert variant="info" slots="text"/>

`after` hooks cannot be blocked because the data has already resolved.

<!-- need example here -->

### `afterAll`

The `afterAll` hook allows you to insert a function after all queries have been processed but before the response is returned.

<InlineAlert variant="info" slots="text"/>

`afterAll` hooks cannot be blocked because the data has already resolved.

<!-- need example here -->

## Local vs remote functions

<!-- need info on when to use -->

When using hook transforms, we suggest using the following structures:

Root
Args
Context
Info

## Use cases
<!-- need more detail and examples -->
-  Authenticate user before all operations
-  Add a check to look for storeCode in headers before executing availableStores query
-  Create a cart in a 3rd party store when Create Cart Mutation is called
-  Publish event once all operations are executed
