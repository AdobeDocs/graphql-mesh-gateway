---
title: OpenAPI | API Mesh for Adobe Developer App Builder
---
import Headers from '/src/pages/_includes/headers.md'

# OpenAPI handlers

This handler allows you to load remote or local [OpenAPI (2/3) and Swagger](https://swagger.io) schemas. Based on [OpenAPI-to-GraphQL](https://developer.ibm.com/open/projects/openapi-to-graphql).

You can import it using remote/local `.json` or `.yaml`. To use a local source with an API handler, see [Reference local file handlers](../handlers/index.md#reference-local-files-in-handlers) for more information.

To get started, use the handler in your Mesh config file:

```json
{
  "sources": [
    {
      "name": "MyOpenapiApi",
      "handler": {
        "openapi": {
          "source": "https://my-api-source.com"
        }
      }
    }
  ]
}
```

## Overriding default Query/Mutation operations

By default, OpenAPI-to-GraphQL will place all GET operations into Query fields and all other operations into Mutation fields; with this option you can manually override this process.

In order to switch between Query and Mutation operations, and vice versa, you need to define a rule per override, consisting of: OAS title, path of the operation, method of the operation and finally the destination type (e.g. Query or Mutation).
See example below:

```json
{
  "sources": [
    {
      "name": "MyOpenapiApi",
      "handler": {
        "openapi": {
          "source": "https://my-api-source.com",
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
```

## Dynamic Header Values

<Headers />

<!-- Mesh can take dynamic values from the GraphQL Context or the environmental variables. If you use `mesh dev` or `mesh start`, GraphQL Context will be the incoming HTTP request.

The expression inside dynamic values should be as in JS.

### From Context (HTTP Header for `mesh dev` or `mesh start`)

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

And for `mesh dev` or `mesh start`, you can pass the value using `x-my-graphql-api-token` HTTP header.

### From Environmental Variable

`MY_API_TOKEN` is the name of the environmental variable you have the value.

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
<!-- 
## Advanced cookies handling

When building a web application, for security reasons, cookies are often used for authentication. Mobile applications on the other end, tend to use a HTTP header.

This section shows how to configure GraphQL Mesh to accept either, and also how to use GraphQL Mesh to set / unset cookies on the login & logout mutations.

### Accepting one of cookie, header or context value

We want to accept one of: an `accessToken` cookie, an `Authorization` header, or an authorization value available in context (e.g. set by a GraphQL auth plugin), and transmit it to the Rest API as a `Authorization` header. GraphQL Mesh does not allow dynamic selection in the `meshrc.json` file, but that's fine! We can use a bit of trickery.

```json
{
  "sources": [
    {
      "name": "Rest",
      "handler": {
        "openapi": {
          "source": "./openapi.yaml",
          "baseUrl": "{env.REST_URL}/api/",
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

Here in the `meshrc.json` configuration we store the cookie in `Authorization-Cookie`, and the header in `Authorization-Header`. Now to introduce the logic needed to generate the proper `Authorization` header for the Rest API, we need to implement a `customFetch`. It will replace the `fetch` used by GraphQL Mesh to call the Rest API.

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

`npm install node-fetch`

### Setting / Unsetting the cookie

Of course, being able to use GraphQL Mesh as a Gateway for both the mobile application and web application is nice, but there's one thing missing: the setting of the cookie for the web application.

For that, we need to access the HTTP response that is sent back to the client. Luckily, we can do so in `additionalResolvers`. So we need to create two new resolvers, one for login and one for logout, and manage the cookie in their code.

The first step is to edit the `meshrc.json` file, add this at the end:

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
const oneYear = 365 -  24 -  3600

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
-->
## Examples

Here are some examples of OpenAPI Handlers:

-  [JavaScript Wiki](https://codesandbox.io/s/github/Urigo/graphql-mesh/tree/master/examples/openapi-javascript-wiki)
-  [Location Weather](https://codesandbox.io/s/github/Urigo/graphql-mesh/tree/master/examples/openapi-location-weather)
-  [StackExchange](https://codesandbox.io/s/github/Urigo/graphql-mesh/tree/master/examples/openapi-stackexchange)
-  [Stripe](https://codesandbox.io/s/github/Urigo/graphql-mesh/tree/master/examples/openapi-stripe)
-  [Subscriptions Example with Webhooks](https://codesandbox.io/s/github/Urigo/graphql-mesh/tree/master/examples/openapi-subscriptions)
-  [Youtrack](https://codesandbox.io/s/github/Urigo/graphql-mesh/tree/master/examples/openapi-youtrack)

## Config API Reference

-  `source` (type: `Any`, required) - A pointer to your API source - could be a local file, remote file or url endpoint
-  `sourceFormat` (type: `String (json | yaml)`) - Format of the source file
-  `operationHeaders` (type: `JSON`) - JSON object representing the Headers to add to the runtime of the API calls
-  `schemaHeaders` (type: `JSON`) - If you are using a remote URL endpoint to fetch your schema, you can set headers for the HTTP request to fetch your schema.
-  `baseUrl` (type: `String`) - Specifies the URL on which all paths will be based on.
Overrides the server object in the OAS.
-  `qs` (type: `JSON`) - JSON object representing the query search parameters to add to the API calls
-  `customFetch` (type: `Any`) - W3 Compatible Fetch Implementation
-  `includeHttpDetails` (type: `Boolean`) - Include HTTP Response details to the result object

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

By default, query field names are based on the return type type name and mutation field names are based on the operationId, which may be generated if it does not exist.

This option forces OpenAPI handler to only create field names based on the operationId.
-->