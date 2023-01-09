---
title: Hooks transform
description: Learn how to use the Hooks transform to add hooks before and after querying your mesh.
---

# Hooks transform

<InlineAlert variant="info" slots="text"/>

The Hooks transform is not currently available and will be added in a subsequent release.

<!--

The Hooks transform allows you to invoke a composable [local or remote](#local-vs-remote-functions) function on a targeted node.

Some use cases for the `HooksTransform` include:

-  Authenticating a user before all operations

-  Publishing events once all operations are executed

-  Creating a cart in a 3rd-party store when calling the `Create Cart` mutation (Adobe Commerce)

<InlineAlert variant="info" slots="text"/>

You cannot use hooks to modify the request or the response. In addition, we recommend that you use resolvers instead of hooks to manipulate data.
-->

<!-- link to resolvers, when available -->

<!--
Hook transforms increase processing time. Use them sparingly if processing time is important. Hooks are executed in the order you provide them, except `blocking` hooks execute before non-blocking hooks.

```ts
interface HooksTransform {
Array of target/composer to apply before the original targets
  before?: BeforeHooksTransformObject[];
Array of target/composer to apply after the original targets
  after?: AfterHooksTransformObject[];
Target/composer to run before executing all the operations
  beforeAll?: BeforeAllTransformObject;
Target/composer to run after executing all the operations
  afterAll?: AfterAllTransformObject;
}
```

## Hook arguments

Hooks accept the following arguments:

```ts
interface Hook {
target: string;
composer: string;
blocking: boolean;
}
```

- `target` (string) - The target GraphQL node.

    For example, `Query.availableStores` targets [`availableStores`](https://developer.adobe.com/commerce/webapi/graphql/schema/store/queries/available-stores/), which means that if the query calls `availableStores`, then the `composer` will execute.

- `composer` (string) - The local or remote file location of the function you want to execute when the mesh encounters the node specified by the `target`.
  
    You must add any local scripts to the mesh's [`files` array](../reference/handlers/index.md#reference-local-files-in-handlers). [Local vs remote functions](#local-vs-remote-functions) describes when to use a local or remote function.

    **NOTE**: Local composer functions are limited to 30 seconds. If `blocking` is set to `true` and the function takes longer than 30 seconds, you will receive a `Timeout Error`. In such cases, consider using a [remote composer](#local-vs-remote-functions).

- `blocking` (boolean) - (`false` by default) Determines if the query waits for a successful return message before continuing the query.
  
    Only the `before` and `beforeAll` hooks accept the `blocking` argument, which allows you to stop running hooks for a query that does not receive a successful response.

    If blocking is `true` and the composer returns an error, all future hook executions are canceled and the node's `target` will not be invoked. If multiple objects use the same `target`, an unsuccessful response means that the `target` is not called for the remainder of the operation.

    If blocking is `false` and the composer returns an error, the composer will still be invoked.

    Blocking hooks are executed before non-blocking hooks.

## Types of hooks

The following sections describe how to invoke hooks at different points during the query.

### `beforeAll`

The `beforeAll` hook allows you to insert a function before the query takes place. This is a good place to add an authentication layer or anything else you want to run before your query.

<InlineAlert variant="info" slots="text"/>

The `beforeAll` hook does not accept an array.

```ts
interface BeforeAllTransformObject {
  composer: string;
  blocking: boolean;
}
```

### `before`

The `before` hook allows you to insert an object or array before calling the [target](#hook-arguments) resolver. If `blocking` is set to `true` and a blocking response occurs, other queries will resolve as normal.

```ts
interface BeforeHooksTransformObject {
  target: string;
  composer: string;
  blocking: boolean;
}
```

### `after`

The `after` hook allows you to insert an object or array after the specified [target](#hook-arguments) has resolved.

<InlineAlert variant="info" slots="text"/>

`after` hooks cannot be blocked because they occur after the data resolves.

```ts
interface AfterHooksTransformObject {
  target: string;
  composer: string;
}
```

### `afterAll`

The `afterAll` hook allows you to insert a function after the entire operation resolves, but before the response is returned.

<InlineAlert variant="info" slots="text"/>

`afterAll` hooks cannot be blocked because the data has already resolved.

```ts
interface AfterAllTransformObject {
  composer: string;
}
```

## Local vs remote functions

`local` composers are defined within your `mesh.json` file, whereas `remote` composers are only referenced within your mesh file. Local and remote composers have different advantages and limitations.

### `local` composers

Use local composers if:

- The entire operation will take less than 30 seconds.
- The composer logic is simple and only requires access to the headers, body, and other context objects.

Avoid using local composers if:

- The entire operation will take more than 30 seconds.

- The composer needs to make network calls.

- The composer has complex or nested loops.

- The composer uses restricted constructs, such as `setTimeout`, `setInterval`, `for`, `while`, `console`, `process`, `global`, or `throw`.

### `remote` composers

If a local composer does not work or causes timeout errors, consider using a remote composer.

<InlineAlert variant="info" slots="text"/>

When using `remote` composers, you could see decreased performance, because `remote` composers add a network hop.

`remote` composers can use the `root`, `args`, `context`, and `info` arguments over the network. However, the serialization and deserialization of JSON data means that any complex fields or references will be lost. If the composer depends on complex fields or references, consider using a `local` composer instead.

### Examples

- [`before` and `beforeAll` composer examples](#examples-1)

- [`after` and `afterAll` composer examples](#examples-2)

## Creating `composers`

A composer can be a local function or a remote serverless function. Composer signatures differ depending on the hook used and the location of the function.

### `before` and `beforeAll` hook composers

`before` and `beforeAll` hook composers accept the following [arguments](https://the-guild.dev/graphql/tools/docs/resolvers#resolver-function-signature):

- `root` - The resolver's return value for this field's root or parent

- `args` - An object that contains all GraphQL arguments provided for this field

    For example, when executing `query{ user(id: "4") }`, the `args` object passed to the resolver is `{ "id": "4" }`

- `context` - An object containing shareable fields and information to identify the request
  
    For example, `context` contains your `headers` and the `body` of the original request.

- `info` - Contains information about the execution state of the query, including the field name and the path to the field from the root

    This argument is optional and should only be used in advanced cases.

<InlineAlert variant="info" slots="text"/>

Since the `beforeAll` hook runs at the root level, `root` and `info` are empty objects (`{}`) by default.

If the `composer` is a remote function, all the arguments are sent in the `POST` body when calling the function.

<InlineAlert variant="info" slots="text"/>

Due to the limitations of `JSON` serialization and de-serialization, some complex `JSON` fields inside a remote function's arguments might not function correctly over the `HTTPS` call.

### Examples

<CodeBlock slots="heading, code" repeat="2" languages="js, js" />

#### Local composer example

```js
module.exports = {
  isAuth: (root, args, context, info) => {
    if (!context.headers.authorization) {
      return {
        status: "ERROR",
        message: "Unauthorized",
      };
    }
    return {
      status: "SUCCESS",
      message: "Authorized",
    };
  },
};
```

#### Remote composer example

```js
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  try {
    const body = await event.request.json();
    if (!body.context.headers["authorization"]) {
      return new Response(
        { status: "SUCCESS", message: "Unauthorized" },
        { status: 401 }
      );
    }
    return new Response(
      { status: "SUCCESS", message: "Authorized" },
      { status: 200 }
    );
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}
```

### `after` and `afterAll` hook composer

`after` and `afterAll` hook composers accept the following arguments:

-  `key` - The name of the field

    In `afterAll` hooks, the `key` argument defaults to `ROOT`.

-  `data` - The resolved value of the field

`after` and `afterAll` hook composers can be local or remote.

<InlineAlert variant="info" slots="text"/>

Due to the limitations of `JSON` serialization and de-serialization, some complex `JSON` fields inside a remote function's arguments might not function correctly over the `HTTPS` call.

### Examples

<CodeBlock slots="heading, code" repeat="2" languages="js, js" />

#### Local composer example

```js
module.exports = {
  publishEvent: (key, data) => {
    publisher.send("Resolved %s to %o", key, data);
    // It is unnecessary to return anything from here, because after hooks are non blocking.
  },
};
```

#### Remote composer example

```js
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function publishEvent(event) {
  try {
    const { key, data } = await event.request.json();
    fetch(EVENT_BUS_URL, {
      method: "POST",
      body: {
        key,
        data,
      },
    });
    return new Response(
      { status: "SUCCESS", message: "Published Event" },
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
```

### Return signatures

The return signature of a composer is the same for local and remote functions.

```ts
{
    status: "ERROR" | "SUCCESS",
    message: string
}
```

 -->
