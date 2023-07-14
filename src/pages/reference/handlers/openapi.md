---
title: OpenAPI | API Mesh for Adobe Developer App Builder
---

# OpenAPI handlers

This handler allows you to load remote or local [OpenAPI (2.0-3.0) and Swagger](https://swagger.io) schemas.

<InlineAlert variant="info" slots="text"/>

When using a Swagger schema, API Mesh can only access `application/json` content from the Swagger API definition.

You can import a remote or local schema `.json` or `.yaml`. To use a local source with an API handler, see [Reference local file handlers](index.md#reference-local-files-in-handlers) for more information.

The OpenAPI handler uses the following format:

```json
{
  "sources": [
    {
      "name": "MyOpenapiApi",
      "handler": {
        "openapi": {
          "source": "./monolith-open-api-schema.json"
        }
      }
    }
  ]
}
```

<InlineAlert variant="info" slots="text"/>

Since the OpenAPI handler is based on the [JSON Schema handler](json-schema.md), [JSON Schema handler configurations](./json-schema.md#config-api-reference) also apply to the OpenAPI handler.
<!-- 
## Overriding default Query/Mutation operations

By default, OpenAPI-to-GraphQL will place all GET operations into Query fields and all other operations into Mutation fields; with this option, you can manually override this process.

To switch between Query and Mutation operations, and vice versa, you need to define an override rule that consists of OAS title, the path of the operation, the method of the operation, and the destination type (e.g. Query or Mutation).

See the following example:

```json
{
  "sources": [
    {
      "name": "MyOpenapiApi",
      "handler": {
        "openapi": {
          "source": "./monolith-open-api-schema.json",
          "selectQueryOrMutationField": [
            {
              "title": "Weather Service v1",
              "path": "/weather/current",
              "method": "post",
              "type": "Query"
            },
            {
              "title": "Weather Service v1",
              "path": "/weather/forecast",
              "method": "get",
              "type": "Mutation"
            }
          ]
        }
      }
    }
  ]
}
``` -->

## Naming conventions

The OpenAPI handler uses the following naming conventions:

### Type naming

The `operationId` is only modified when necessary according to the GraphQL spec:

  - The following characters are replaced with an underscore (`_`): white space, `.`, `/`, `:` and `-`.
  - Characters that are not digits or Latin letters are replaced with their character codes.
  - If the first character of a name is a digit, it is prefixed with an underscore (`_`), because GraphQL does not allow initial digits.

### Unnamed types

Unnamed types use path-based naming. This means a type in your schema could be structured like `query_getUsers_items_firstName`.

## Headers from context

```json
{
  "sources": [
    {
      "name": "MyGraphQLApi",
      "handler": {
        "openapi": {
          "source": "./my-schema.json",
          "operationHeaders": {
            "Authorization": "Bearer {context.headers['x-my-api-token']}"
          }
        }
      }
    }
  ]
}
```
<!-- 
### From Environmental Variable

`MY_API_TOKEN` is the name of the environmental variable that you have the value for.

```json
{
  "sources": [
    {
      "name": "MyGraphQLApi",
      "handler": {
        "openapi": {
          "source": "./my-schema.json",
          "operationHeaders": {
            "Authorization": "Bearer {env.MY_API_TOKEN}"
          }
        }
      }
    }
  ]
}
``` -->

## Advanced cookies handling

When building a web application cookies are often used for secure authentication. Conversely, mobile applications tend to use an HTTP header.

<!-- 
### Accepting one cookie, header, or context value

We want to accept one of the following:

- an `accessToken` cookie
- an `Authorization` header
- an authorization value available in context (e.g. set by a GraphQL auth plugin)

We transmit the value to the Rest API as an `Authorization` header. GraphQL Mesh does not allow dynamic selection in the `meshrc.json` file, but we can work around that limitation.

```json
{
  "sources": [
    {
      "name": "Rest",
      "handler": {
        "openapi": {
          "source": "./openapi.yaml",
          "baseUrl": "my-site/api/",
          "operationHeaders": {
            "Authorization-Header": "{context.headers.authorization}",
            "Authorization-Cookie": "Bearer {context.cookies.accessToken}"
          },
          "customFetch": "./src/custom-fetch.js"
        }
      }
    }
  ]
}
```

Here in the `mesh.json` configuration, we store the cookie in `Authorization-Cookie` and the header in `Authorization-Header`. Now to introduce the logic needed to generate the proper `Authorization` header for the Rest API, we need to implement a `customFetch`. It will replace the `fetch` used by GraphQL Mesh to call the Rest API.

```js
const fetch = require('node-fetch')

module.exports = (url, args, context) => {
  // Set Authorization header dynamically to context value, or input cookie, or input header
  args.headers['authorization'] = context.authorization || args.headers['authorization-cookie'] || args.headers['authorization-header'];
  // Clean up headers forwarded to the Rest API
  delete args.headers['authorization-cookie'];
  delete args.headers['authorization-header'];
  // Execute the fetch with the new headers
  return fetch(url, args)
}
```

Of course, `node-fetch` needs to be added to your project:

`npm install node-fetch` -->

### Setting and Unsetting cookies

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

## Config API Reference

-  `source` (type: `Any`, required) - Reference to your API source, such as a local file, a remote file, or a URL endpoint
-  `sourceFormat` (type: `String (json | yaml)`) - Format of the source file
-  `schemaHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime schema introspection
   -  If you are using a remote URL endpoint, you can set headers for the HTTP request to fetch your schema.
-  `operationHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime operation execution
-  `baseUrl` (type: `String`) - URL that all paths are based on
   -  The `baseURL` overrides the server object in the OpenAPI Spec.
-  `qs` (type: `JSON`) - JSON object for the query search parameters to add to the API call
-  `includeHttpDetails` (type: `Boolean`) - Flag for including HTTP Response details in the result object

<!-- 
`addLimitArgument` (type: `Boolean`) - Auto-generate a 'limit' argument for all fields that return lists of objects, including ones produced by links
`genericPayloadArgName` (type: `Boolean`) - Set argument name for mutation payload to 'requestBody'. If false, name defaults to camelCased pathname
`selectQueryOrMutationField` (type: `Array of Object`) - Allows to explicitly override the default operation (Query or Mutation) for any OAS operation:
    `title` (type: `String`) - OAS Title
    `path` (type: `String`) - Operation Path
    `type` (type: `String (query | mutation | Query | Mutation)`) - Target Root Type for this operation
    `method` (type: `String`) - Which method is used for this operation
`provideErrorExtensions` (type: `Boolean`) - Overwrite automatic wrapping of errors into GraphqlErrors
`operationIdFieldNames` (type: `Boolean`) - Field names can only be sanitized operationIds 

By default, query field names are based on the return type name and mutation field names are based on the operationId, which may be generated if it does not exist.

This option forces OpenAPI handler to only create field names based on the operationId.
-->
