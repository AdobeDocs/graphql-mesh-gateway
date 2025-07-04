---
title: Hooks
description: Learn how to use the Hooks to add hooks before and after querying your mesh.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Hooks

<InlineAlert variant="info" slots="text"/>

The hooks feature is currently in development and will be expanded in future releases. Only `beforeAll` hooks are currently available.

Hooks allow you to invoke a composable [local or remote](#local-vs-remote-functions) function on a targeted node.

Some use cases for the `Hooks` include:

-  Authenticating a user before all operations

-  Checking for an authorization token before making a request

<!--
-  Publishing events once all operations are executed
-  Creating a cart in a 3rd-party store when calling the `Create Cart` mutation (Adobe Commerce)
-->

<InlineAlert variant="info" slots="text"/>

You cannot use hooks to modify the request or the response. If you want to manipulate data, we recommend that you use [custom resolvers](./extend/resolvers/index.md).

Hooks increase processing time. Use them sparingly if processing time is important. Hooks are executed in the order you provide them. However, any `blocking` hooks execute before non-blocking hooks.

## Hook arguments

Hooks are plugins that accept the following arguments:

```json
"hooks": {
    "beforeAll": {
        "composer": "<Local or Remote file>",
        "blocking": true|false
    }
}
```

<!-- 
`target` (string) - The target GraphQL node.

    For example, `Query.availableStores` targets [`availableStores`](https://developer.adobe.com/commerce/webapi/graphql/schema/store/queries/available-stores/), which means that if the query calls `availableStores`, then the `composer` will execute.
-->

- `composer` (string) - The local or remote file location of the function you want to execute.
  
    You must add any local scripts to the mesh's [`files` array](../basic/handlers/index.md#reference-local-files-in-handlers). [Local vs remote functions](#local-vs-remote-functions) describes when to use a local or remote function.

    **NOTE**: Local composer functions are limited to 30 seconds. If `blocking` is set to `true` and the function takes longer than 30 seconds, you will receive a `Timeout Error`. If you repeatedly encounter this error, consider using a [remote composer](#local-vs-remote-functions).

- `blocking` (boolean) - (`false` by default) Determines if the query waits for a successful return message before continuing the query.
  
    The `blocking` argument allows you to stop running hooks for a query that does not receive a successful response.

    If blocking is `true` and the composer returns an error, all future hook executions are canceled.

    If blocking is `false` and the composer returns an error, the composer will still be invoked.

<!--
    Blocking hooks are executed before non-blocking hooks. and the node's `target` will not be invoked. If multiple objects use the same `target`, an unsuccessful response means that the `target` is not called for the remainder of the operation.
-->
## Types of hooks

<!-- The following sections describe how to invoke hooks at different points during the query. -->

### `beforeAll`

The `beforeAll` hook allows you to insert a function before the query takes place. This is a good place to add an authentication layer or anything else you want to run before your query.

<InlineAlert variant="info" slots="text"/>

The `beforeAll` hook is a singular hook.

```json
"plugins": [
    {
        "hooks": {
            "beforeAll": {
                "composer": "./hooks.js#checkAuthHeader",
                "blocking": true
            }
        }
    }
],
```
<!-- 
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
``` -->

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

- The function uses restricted constructs, including: `alert`, `debugger`, `eval`, `new Function()`, `process`, `setInterval`, `setTimeout`, `WebAssembly`, or `window`.

Local composers require adding any local scripts to the mesh's [`files` array](../basic/handlers/index.md#reference-local-files-in-handlers).

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "MagentoMonolithApi",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      }
    ],
    "plugins": [
      {
        "hooks": {
          "beforeAll": {
            "composer": "./hooks.js#checkAuthHeader",
            "blocking": true
          }
        }
      }
    ],
    "files": [
      {
        "path": "./hooks.js",
        "content": <FILE CONTENT>
      }
    ]
  }
}
```

#### Fetching from remote origins

Local composers also support fetching from remote origins using `fetch()`.

The following example could be used as a `beforeAll` hook that validates an authorization token against a remote authorization endpoint using `fetch()`.

```js
module.exports = {
  validateToken: async ({ context }) => {
    const { headers } = context;
    const { authorization } = headers;
    
    if (!authorization) {
      return {
        status: "ERROR",
        message: "Authorization header is missing",
      };
    }
    
    try {
      // Validate the token against a remote authorization service
      const response = await fetch("https://auth.adobe.com/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authorization.replace("Bearer ", "") }),
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.valid) {
        return {
          status: "ERROR",
          message: "Invalid authorization token",
        };
      }
      
      return {
        status: "SUCCESS",
        message: "Token validated successfully",
        data: {
          headers: {
            "x-user-id": result.userId,
          },
        },
      };
    } catch (error) {
      return {
        status: "ERROR",
        message: `Token validation failed: ${error.message}`,
      };
    }
  },
};
```

### `remote` composers

If a local composer does not work or causes timeout errors, consider using a remote composer.

<InlineAlert variant="info" slots="text"/>

When using `remote` composers, you could see decreased performance, because `remote` composers add a network hop.

`remote` composers can use the `params`, `context`, and `document` arguments over the network. However, the serialization and deserialization of JSON data means that any complex fields or references will be lost. If the composer depends on complex fields or references, consider using a `local` composer instead.

### Example

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "MagentoMonolithApi",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      }
    ],
    "plugins": [
      {
        "hooks": {
          "beforeAll": {
            "composer": "<Remote Composer URL>",
            "blocking": true
          }
        }
      }
    ]
  }
}
```

## Creating `composers`

A composer can be a local function or a remote serverless function. Composer signatures differ depending on the hook used and the location of the function.

### `beforeAll` hooks

`beforeAll` hooks can receive the following fields as objects during runtime:
<!--

`root` - The resolver's return value for this field's root or parent

`params` - An object that contains all GraphQL arguments provided for this field

For example, when executing `query{ user(id: "4") }`, the `params` object passed to the resolver is `{ "id": "4" }`
-->

- `context` - An object containing information about the request.
  
    For example, `context` can contain `headers`, the `body` of the request, and the request `object`.

- `document` - A GraphQL representation of the query.

<InlineAlert variant="info" slots="text"/>

Since the `beforeAll` hook runs at the root level, the `document` object is empty (`{}`) by default.

If the `composer` is a remote function, all the arguments are sent in the `POST` body when calling the function.

<InlineAlert variant="info" slots="text"/>

Due to the limitations of `JSON` serialization and de-serialization, some complex `JSON` fields inside a remote function's arguments might not function correctly over the `HTTPS` call.

#### Local composer example

This simple composer checks for an authorization header before processing the query.

```js
module.exports = {
  isAuth: ({context}) => {
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

This remote composer fetches your authorization token and inserts it into the `x-auth-token` header.

```js
function getToken({ authorization = "", body = "", url = "" }) {
  return `${authorization} - ${body} - ${url}`;
}

module.exports = {
  insertToken: ({ context }) => {
    const { headers, request, body } = context;
    const { authorization } = headers;
    const { url } = request;

    const authToken = getToken({ authorization, url, body });

    return {
      status: "SUCCESS",
      message: "Authorized",
      data: {
        headers: {
          "x-auth-token": authToken,
        },
      },
    };
  },
};
```

#### Remote composer example

The following example remote composer checks for an `authorization` header.

<InlineAlert variant="info" slots="text"/>

While this example uses Fastly Edge computing, you can use any serverless function with remote hooks.

```js
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
    try {
        const body = await event.request.json();
        if (!body.context.headers["authorization"]) {
            return new Response({
                status: "SUCCESS",
                message: "Unauthorized"
            }, {
                status: 401
            });
        }
        return new Response({
            status: "SUCCESS",
            message: "Authorized"
        }, {
            status: 200
        });
    } catch (err) {
        return new Response(err, {
            status: 500
        });
    }
}
```
<!-- 
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
``` -->

### Return signatures

The return signature of a composer is the same for local and remote functions.

```ts
{
  status: "ERROR" | "SUCCESS",
  message: string,
  data?: {
    headers?: {
        [headerName: string]: string
    }
  }
}
```

## `onFetch` hooks

You can use the `onFetch` plugin to intercept and modify HTTP requests before they are sent to your GraphQL sources.

The `onFetch` plugin can assist with the following use cases:

- **Authentication**: Adding dynamic auth tokens or API keys
- **Conditional Headers**: Adding headers based on query content or user context
- **Request Tracking**: Adding correlation IDs or request timestamps  
- **Request Modification**: Transforming request body or parameters
- **Logging**: Adding custom logging or metrics

The `onFetch` plugin can also access your execution parameters, such as: `root`, `args`, `context`, and `info`.

The following example adds a custom header (`x-md5-hash`) to the request. This could be used to add a hash of the request body to the request headers for security purposes.

<CodeBlock slots="heading, code" repeat="2" languages="json, js" />

#### `mesh.json`

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "CommerceAPI",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      }
    ],
    "plugins": [
      {
        "onFetch": [
          {
            "source": "commerceAPI",
            "handler": "./handleOnFetch.js"
          }
        ]
      }
    ]
  }
}
```

#### `handleOnFetch.js`

```js
async function handleOnFetch(data) {
  const { context } = data;
  const { log } = context;

  try {
    data.options.headers["x-md5-hash"] = "test header value";
  } catch (e) {
    log(`Error setting hash header: ${e.message}`);
  }
}

module.exports = {
  default: handleOnFetch,
  __esModule: true,
};
```
