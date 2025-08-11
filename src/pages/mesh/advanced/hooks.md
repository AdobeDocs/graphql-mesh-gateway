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

import ContextLogger from '/src/_includes/context-logger.md'

# Hooks

Hooks allow you to invoke a composable [local or remote](#local-vs-remote-functions) function on a targeted node.

Some use cases for the `hooks` include:

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

## Hook payload

All hooks receive the following payload. Specific hooks extend their types based on additional data they may provide in the payload as described in the [creating composers](#creating-composers) section.

```ts
// Logger utility
interface Logger {
	debug: (...args: any[]) => void;
	info: (...args: any[]) => void;
	warn: (...args: any[]) => void;
	error: (...args: any[]) => void;
}

// State API interface for managing key-value pairs
export interface StateApi {
	/**
	 * Get a value by key
	 * @param key Key to retrieve
	 */
	get(key: string): Promise<string | null>;

	/**
	 * Put a key-value pair with optional TTL
	 * @param key Key to store
	 * @param value Value to store
	 * @param config Optional configuration object that may contain a TTL value in seconds
	 */
	put(key: string, value: string, config?: { ttl?: number }): Promise<void>;

	/**
	 * Delete a key-value pair.
	 * @param key Key to delete.
	 */
	delete(key: string): Promise<void>;
}

// Context available within a hook function payload.
interface HookPayloadContext {
	// Request from the client
	request: Request;

	// GraphQL parameters
	params: GraphQLParams;

	// Request body
	body?: unknown;

	// Request headers
	headers?: Record<string, string>;

	// Secrets (Local hooks only)
	secrets?: Record<string, string>;

	// State API (Local hooks only)
	state?: StateApi;

	// Common logger (Local hooks only)
	logger?: Logger;
}

// Payload that all hook functions receive
interface HookPayload {
	context: HookFunctionPayloadContext;

	// GraphQL document node
	document?: DocumentNode;
};

// Payload that all source hook functions receive, including beforeSource and afterSource.
interface SourceHookPayload extends HookPayload {
	// Name of the source
	sourceName?: string;
};
```

<InlineAlert variant="info" slots="text"/>

The `secrets`, `state`, and `logger` contexts are not available in remote composers.

## Hook response

Hooks have the following response. Response information for specific hooks is described in the [Creating composers](#creating-composers) section.

```ts
/**
 * Hook response status.
 */
export enum HookResponseStatus {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

/**
 * Response from a hook.
 */
interface HookResponse {
	status: HookResponseStatus;
	message: string;
}
```

## Types of hooks

<!-- The following sections describe how to invoke hooks at different points during the query. -->

### `beforeAll`

The `beforeAll` hook allows you to insert a function before the query takes place. This is a good place to add an authentication layer or anything else you want to run before your query.

<InlineAlert variant="info" slots="text"/>

The [`beforeAll` hook](#beforeall-hooks) is a singular hook.

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
-->

### `afterAll`

The [`afterAll` hook](#afterall-hooks) allows you to insert a function after the entire operation resolves, but before the response is returned.

`afterAll` hooks allow a user to provide a function or an endpoint to invoke after executing the operation. `afterAll` hooks can be used for logging or triggering events. Each hook can be blocking or non-blocking. Non-blocking hooks will not wait for the completion of the execution.

<InlineAlert variant="info" slots="text"/>

`afterAll` hooks cannot be blocked because the data has already resolved.

```ts
interface AfterAllTransformObject {
  composer: string;
}
```

### `beforeSource`

The `beforeSource` hook allows you to insert a function before querying a specific source. This is useful for adding source-specific authentication, logging, or request modification before making requests to individual GraphQL sources.

<InlineAlert variant="info" slots="text"/>

The [`beforeSource` hook](#beforesource-hooks) uses source names as keys in the configuration object to specify which source the hook should target.

```json
"hooks": {
    "beforeSource": {
        "source1": [
            {
                "composer": "<Local or Remote file>",
                "blocking": true
            },
            {
                "composer": "<Local or Remote file>",
                "blocking": true
            }
        ],
        "source2": [
            {
                "composer": "<Local or Remote file>",
                "blocking": false
            },
            {
                "composer": "<Local or Remote file>",
                "blocking": false
            }
        ]
    }
}
```

```ts
interface BeforeSourceTransformObject {
  [sourceName: string]: Array<{
    composer: string;
    blocking: boolean;
  }>;
}
```

### `afterSource`

The [`afterSource` hook](#aftersource-hooks) allows you to insert a function after querying a specific source, but before returning the response. This is useful for logging source responses, transforming data, or triggering events after source operations complete.

The `afterSource` hook uses source names as keys in the configuration object to specify which source the hook should target.

`afterSource` hooks additionally support blocking behavior to control whether the response waits for the hook to complete.

```json
"hooks": {
    "afterSource": {
        "source1": [
            {
                "composer": "<Local or Remote file>",
                "blocking": true
            },
            {
                "composer": "<Local or Remote file>",
                "blocking": true
            }
        ],
        "source2": [
            {
                "composer": "<Local or Remote file>",
                "blocking": false
            },
            {
                "composer": "<Local or Remote file>",
                "blocking": false
            }
        ]
    }
}
```

```ts
interface AfterSourceTransformObject {
  [sourceName: string]: Array<{
    composer: string;
    blocking: boolean;
  }>;
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

- The function uses restricted constructs, including: `alert`, `debugger`, `eval`, `new Function()`, `process`, `setInterval`, `setTimeout`, `WebAssembly`, or `window`.

Local composers require adding any local scripts to the mesh's [`files` array](../basic/handlers/index.md#reference-local-files-in-handlers).

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Commerce",
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
        "name": "Commerce",
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

`beforeAll` hooks have the following payload and response:

<CodeBlock slots="heading, code" repeat="2" languages="ts, ts" />

#### Payload

```ts
interface HookPayload {
	context: HookFunctionPayloadContext;
	// GraphQL document node.
	document?: DocumentNode;
};
```

#### Response

```ts
interface BeforeAllHookResponse extends HookResponse {
	data?: {
		headers?: {
			[headerName: string]: string;
		};
	};
}
```

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

### `afterAll` hooks

`afterAll` hook composers have the following payload and response:

<CodeBlock slots="heading, code" repeat="2" languages="ts, ts" />

#### Payload

```ts
interface AfterAllHookPayload extends HookPayload {
	// GraphQL result to be returned to the client. Includes data, errors, and extensions.
	result: GraphQLResult;
}
```

#### Response

```ts
interface AfterAllHookResponse extends HookResponse {
	data?: {
		result?: GraphQLResult;
	};
}
```

`afterAll` hook composers can be local or remote.

<InlineAlert variant="info" slots="text"/>

Due to the limitations of `JSON` serialization and de-serialization, some complex `JSON` fields inside a remote function's arguments might not function correctly over the `HTTPS` call.

Local hook functions have a 30-second timeout. If a local hook function takes longer than 30 seconds, it will timeout and return an error. Non-blocking hooks will not cause the operation to fail even if they timeout.

### Examples

<CodeBlock slots="heading, code" repeat="2" languages="js, js" />

#### Local composer example

```js
module.exports = {
  metaData: async (payload) => {
    const originalData = payload.result?.data || {};
    const originalErrors = payload.result?.errors || [];
    
    console.log('AfterAll Hook: Adding simple audit trail');
    
    // Extract dynamic information from the GraphQL request/response
    const queriedFields = Object.keys(originalData);
    const primaryQuery = queriedFields.length > 0 ? queriedFields[0] : 'unknown';
    const queryDocument = payload.document || '';
    const operationType = queryDocument.toString().includes('mutation') ? 'mutation' : 'query';
    
    // Calculate response size
    const responseSize = JSON.stringify(originalData).length;
    
    // Add comprehensive dynamic audit metadata
    const extensions = {
      _metaData: {
        primaryQuery: primaryQuery,
        operationType: operationType,
        responseSizeBytes: responseSize,
        processedBy: 'local-hook'
      }
    };
    
    return {
      status: 'SUCCESS',
      message: `Audit trail added for ${primaryQuery} ${operationType}`,
      data: {
        result: {
          data: originalData,
          errors: originalErrors,
          extensions,
        }
      }
    };
  },
};
```

#### Remote composer example

```js
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  try {
    const payload = await event.request.json();
    const { result, context, document } = payload;
    
    // Add a new 'sale_price' field that provides 20% discount for all products
    if (result.data?.products?.items) {
      result.data.products.items.forEach(product => {
        if (product.price_range?.minimum_price?.final_price?.value) {
          const originalPrice = product.price_range.minimum_price.final_price.value;
          const salePrice = originalPrice * 0.8; // 20% discount
          
          product.sale_price = {
            value: Math.round(salePrice * 100) / 100,
            currency: product.price_range.minimum_price.final_price.currency,
            discount_percent: 20
          };
        }
      });
    }
    
    return new Response(
      JSON.stringify({
        status: "SUCCESS",
        message: "Price modification applied",
        data: {
          result: {
            data: result.data,
            errors: result.errors || []
          }
        }
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "ERROR",
        message: err.message
      }),
      { status: 500 }
    );
  }
}
```

### `beforeSource` hooks

`beforeSource` hooks have the following payload and response:

<CodeBlock slots="heading, code" repeat="2" languages="ts, ts" />

#### Payload

```ts
interface BeforeSourceHookPayload extends SourceHookPayload {
	// Request init to be used in the source fetch request. Includes body, headers, method.
	request: RequestInit;
}
```

#### Response

```ts
interface BeforeSourceHookResponse extends HookResponse {
	data?: {
		request?:
			| RequestInit
			| {
					body?: string | ReadableStream<Uint8Array>;
					headers?: Record<string, string>;
					method?: string;
					url?: string;
			  };
	};
}
```

`beforeSource` hook composers can be local or remote. You can configure multiple hooks for each source, which execute in the specified order.

#### Examples

The local composer example adds source-specific headers before making requests to the Adobe Commerce API. The remote composer example validates source-specific authentication before making requests.

<CodeBlock slots="heading, code" repeat="2" languages="js, js" />

#### Local composer example

```js
module.exports = {
  beforeCommerceRequest: ({ sourceName, request, operation }) => {
    // Add Commerce-specific authentication headers
    const commerceHeaders = {
      "x-commerce-store": "default",
      "x-commerce-customer-token": request.headers?.authorization?.replace("Bearer ", "") || "",
    };
    
    return {
      status: "SUCCESS",
      message: "Commerce headers added",
      data: {
        request: {
                headers: commerceHeaders,
        }
      },
    };
  },
};
```

#### Remote composer example

```js
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  try {
    const { sourceName, request, operation } = await event.request.json();
    
    // Validate source-specific authentication
    if (sourceName === "CommerceApi" && !request.headers["x-commerce-token"]) {
      return new Response(
        JSON.stringify({
          status: "ERROR",
          message: "Commerce token required for this source",
        }),
        { status: 401 }
      );
    }
    
    return new Response(
      JSON.stringify({
        status: "SUCCESS",
        message: "Source validation passed",
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "ERROR",
        message: err.message,
      }),
      { status: 500 }
    );
  }
}
```

### `afterSource` hooks

`afterSource` hooks have the following payload and response:

<CodeBlock slots="heading, code" repeat="2" languages="ts, ts" />

#### Payload

```ts
interface AfterSourceHookPayload extends SourceHookPayload {
	// Response from the source fetch request. Includes body, headers, status, statusText.
	response: Response;
}
```

#### Response

```ts
interface AfterSourceHookResponse extends HookResponse {
	data?: {
		response?:
			| Response
			| {
					body?: string | ReadableStream<Uint8Array>;
					headers?: Record<string, string>;
					status?: number;
					statusText?: string;
			  };
	};
}

```

`afterSource` hook composers can be local or remote. Multiple hooks can be configured for each source, and they will be executed in order.

#### Examples

The local composer example logs source responses and modifies the response after source operations. The remote composer example publishes events after source operations complete.

<CodeBlock slots="heading, code" repeat="2" languages="js, js" />

#### Local composer example

```js
module.exports = {
  afterCommerceResponse: ({ sourceName, request, operation, response, setResponse }) => {
    console.log(`Source ${sourceName} returned response:`, response);
    
    // Modify the response if needed
    if (sourceName === "Commerce") {
      // Example: Add custom headers to the response
      const modifiedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...Object.fromEntries(response.headers.entries()),
          "x-processed-by": "commerce-hook",
        },
      });
      
      return {
            status: "SUCCESS",
            message: "Source response processed",
            data: {
                  response: modifiedResponse,
            }
      };
    }
    
    return {
      status: "SUCCESS",
      message: "Source response processed",
    };
  },
};
```

#### Remote composer example

```js
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  try {
    const { sourceName, request, operation, response } = await event.request.json();
    
    // Publish source completion event
    await fetch("https://events.adobe.com/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "source_completed",
        sourceName,
        timestamp: new Date().toISOString(),
        responseStatus: response.status,
      }),
    });
    
    return new Response(
      JSON.stringify({
        status: "SUCCESS",
        message: "Source event published",
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "ERROR",
        message: err.message,
      }),
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

## `context.logger`

<InlineAlert variant="info" slots="text"/>

`context.logger` is only available in local hooks. For remote hooks, use language-specific logging, such as `console.log` in JavaScript.

<ContextLogger />

### Example

The following example hook checks for authentication before processing GraphQL requests.

```javascript
module.exports = {
  checkAuth: ({ context }) => {
    context.logger.log("Checking authentication");
    
    try {
      const authHeader = context.headers.authorization;
      
      if (!authHeader) {
        context.logger.error("No authorization header found");
        return {
          status: "ERROR",
          message: "Unauthorized - missing token"
        };
      }
      
      context.logger.log("Authentication check completed");
      return {
        status: "SUCCESS",
        message: "Authorized"
      };
    } catch (error) {
      context.logger.error("Authentication check failed");
      return {
        status: "ERROR", 
        message: "Authentication error"
      };
    }
  }
};
```
