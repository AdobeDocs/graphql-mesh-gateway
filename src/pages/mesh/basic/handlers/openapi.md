---
title: OpenAPI handler
description: Learn how to integrate OpenAPI schemas with the OpenAPI handler.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# `openapi` handlers

The `openapi` handler allows you to connect to an OpenAPI-compliant REST service endpoint or static Swagger schema using a `.json` or `.yaml` file.

<InlineAlert variant="info" slots="text"/>

When using a Swagger schema, API Mesh can only access `application/json` content from the Swagger API definition.

<InlineAlert variant="warning" slots="text"/>

API Mesh does not accept a wildcard (`*/*`) as a content type.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "CommerceREST",
        "handler": {
          "openapi": {
            "source": "https://venia.magento.com/rest/"
          }
        },
      }
    ]
  },
}
```

To import a remote or local schema using `.json` or `.yaml`, use a local source, see [Reference local file handlers](./index.md#reference-local-files-in-handlers) for more information.

<InlineAlert variant="info" slots="text"/>

If your source handler's schema is modified, you must [update your mesh](../../basic/create-mesh.md#update-an-existing-mesh) to allow API Mesh to cache any changes.

## Naming conventions

The OpenAPI handler uses the following naming conventions:

### Type naming

The `operationId` is only modified when necessary according to the GraphQL spec:

  - The following characters are replaced with an underscore (`_`): white space, `.`, `/`, `:` and `-`.
  - Characters that are not digits or Latin alphabet letters are replaced with their character codes.
  - If the first character of a name is a digit, it is prefixed with an underscore (`_`), because GraphQL does not allow initial digits.

### Unnamed types

Unnamed types use path-based naming. This means a type in your schema could be structured like `query_getUsers_items_firstName`.

## Headers from context

The following example demonstrates how to include authentication headers in the context of your mesh.

```json
...
      "handler": {
        "openapi": {
          "source": "./my-schema.json",
          "operationHeaders": {
            "Authorization": "Bearer {context.headers['x-my-api-token']}"
          }
        }
      }
...
```

## Advanced cookie handling

When building a web application cookies are often used for secure authentication. Conversely, mobile applications tend to use an HTTP header.

### Setting and unsetting cookies

To set the cookie for the web application, we need to access the HTTP response that is sent back to the client by using `additionalResolvers`. To do this, we need to create two new resolvers, one for login and one for logout.

The first step is to edit the `mesh.json` file, and add the following at the end:

```json
{
  "additionalTypeDefs": "extend type Mutation {\n  login(credentials: Credentials!): String\n  logout: Boolean\n}\n",
  "additionalResolvers": [
    "./src/additional-resolvers.js"
  ]
}
```

Then manage the cookie in the new resolvers:

```js
// lifespan of our cookie
const oneYear = 365 * 24 * 3600

const resolvers = {
  Mutation: {
    async login(root, args, context, info) {
      // Call the Rest API's login operation
      const result = await context.Rest.Mutation.accountLogin({
        root,
        args: {
          credentials: args.credentials
        },
        context,
        info
      })
      // if `result` contains a JWT token, you could instead decode it and set `Expires`
      // to the JWT token's expiration date
      res.set('Set-Cookie', `accessToken=${result}; Path=/; Secure; HttpOnly; Max-Age=${oneYear};`)

      return result
    },
    logout(root, args, { res }) {
      // use old date to unset cookie
      res.set('Set-Cookie', `accessToken=logout; Path=/; Secure; HttpOnly; Expires=Thu, 1 Jan 1970 00:00:00 GMT;`)

      return true
    },
  },
}

module.exports = { resolvers }
```

## Callbacks as Subscriptions

The OpenAPI handler can process OpenAPI Spec Callbacks as GraphQL Subscriptions, by using your Publish-subscribe pattern PubSub implementation to consume the data. However, you need to define webhooks for callbacks individually.

## Loading source from a CDN

API Mesh supports loading sources from a CDN or schema registry by using the `source` property.

```json
{
  "sources": [
    {
      "name": "MyApi",
      "handler": {
        "openapi": {
          "source": "https://cdn.<your cdn>.graphql",
          "schemaHeaders": {
            "X-CDN-Key": "abc123+d4/5e="
          }
        }
      }
    }
  ]
}
```

## Config API reference

-  `source` (type: `Any`, required) - Reference to your API source, such as a local file, a remote file, or a URL endpoint
-  `sourceFormat` (type: `String (json | yaml)`) - Format of the source file
-  `schemaHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime schema introspection
   -  If you are using a remote URL endpoint, you can set headers for the HTTP request to fetch your schema.
-  `operationHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime operation execution
-  `baseUrl` (type: `String`) - URL that all paths are based on
   -  The `baseURL` overrides the server object in the OpenAPI Spec.
-  `qs` (type: `JSON`) - JSON object for the query search parameters to add to the API call
-  `includeHttpDetails` (type: `Boolean`) - Flag for including HTTP Response details in the result object
