---
title: CORS headers
description: Learn about using CORS headers with API Mesh for Adobe Developer App Builder.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# CORS headers

Cross-origin resource sharing (CORS) allows you to pass resources that are usually restricted to an outside domain. Refer to [MDN's documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for more information on CORS headers.

<InlineAlert variant="info" slots="text"/>

To get CORS response headers when querying your mesh, you must provide an `origin` request header with the origin URL as the value. For example, `origin: https://<your-domain>.com`.

To add CORS headers to your mesh, create a `CORS` object in the `responseConfig` object, using the following key-value pairs:

-  `origin` (Required) - the scheme and domain of the resource you want to allow to make a CORS request
-  `methods` (Required) - the HTTP request methods allowed in the CORS request, such as GET, POST, and OPTIONS
-  `allowedHeaders` - a string of allowed headers in preflight requests
-  `credentials` - a boolean value that indicates if credentials can be included in CORS request (default: `false`)
-  `exposedHeaders` - a comma-delimited CORS request that contains headers to expose
-  `maxAge` - the maximum number of seconds the preflight response (the values of the `origin` and `methods` headers) can be cached
  
When specifying a CORS `origin`, list all applicable origins. Do not enter `*` for the value, as this will return the request's origin.

The following examples show how to use CORS with a single origin or with multiple origins:

<CodeBlock slots="heading, code" repeat="2" languages="json, json" />

#### Single origin

```json
{
  "meshConfig": {
    ...
    "responseConfig": {
      "CORS": {
        "origin": "https://www.<your-domain>.com",
        "methods": [
          "GET",
          "POST"
        ],
        "maxAge": 60480,
        "credentials": true,
        "exposedHeaders": [
          "Content-Range",
          "X-Content-Range"
        ]
      }
    }
    ...
  }
}
```

#### Multiple origins

```json
{
  "meshConfig": {
    ...
    "responseConfig": {
      "CORS": {
        "maxAge": 60480,
        "methods": [
          "GET",
          "POST",
          "PUT",
          "HEAD",
          "OPTIONS"
        ],
        "origin": ["<origin1>", "<origin2>"]
      } 
    } 
    ...
  }
}
```
