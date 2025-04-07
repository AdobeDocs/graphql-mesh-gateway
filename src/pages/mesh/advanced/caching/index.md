---
title: Caching
description: Specifies how to use headers the native caching functionality of API Mesh for Adobe Developer App Builder.
keywords:
  - API Mesh
  - Extensibility
  - Cache
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Caching

API Mesh for Adobe Developer App Builder, uses dynamic content caching, which provides the following benefits:

- Reduced load on your sources
- Reduced latency and network hops
- Reduced bandwidth consumption
- Improved mesh performance
- Improved load times
- Simplified architecture ([native caching](#enable-native-caching) only)

If you want to cache API Mesh responses, you have two options:

- [Native caching](#enable-native-caching) - Use API Mesh's native caching feature without having to bring your own CDN
- [Third-party caching](./fastly.md) - Provide your own third-party CDN, such as Fastly

Regardless of the option you choose, you can configure your [cache-control headers](./cache-control-headers.md) to control how long a response is cached.

## Caching requirements

For API Mesh to cache a response, the request and response must meet the following requirements:

**Request**

- The request method must be `GET` or `POST`.
- The request must be a query operation type.
- The request must not be an introspection query.

**Response**

- The response status must be `200`.
- The response body cannot contain errors, as defined by [GraphQL specification](https://spec.graphql.org/October2021/#sec-Errors).
- The response `cache-control` header must contain public [cache eligible directives](./cache-control-headers.md#response-headers).

## Compliance

When considering PCI or HIPPA compliance as it relates to caching, you should understand the following:

- API Mesh caching is disabled by default.
  - You must opt in to caching, by configuring `meshConfig.responseConfig.cache: true`.
- When caching is configured, API Mesh acts as a public cache driven by cache-control headers returned from your sources.
- API Mesh is a gateway and is unaware of the compliance requirements of your sources. You should understand your sources and ensure they return appropriate cache-control headers to prevent caching of sensitive data.

## Source-driven caching

API Mesh implements a source-driven caching model where your data sources are responsible for properly handling caching behavior, specifically for personalized content. Sources must provide appropriate [cache-control headers](./cache-control-headers.md), set proper cache directives for personalized data, and implement correct cache [invalidation](./cache-control-headers.md#invalidate-the-cache) strategies.

The mesh will respect and forward these cache directives, unless [overridden](./cache-control-headers.md#overriding-cache-control-using-mesh-level-responseconfig) at the mesh level, but your sources must ensure proper caching behavior for personalized content through appropriate header settings and cache control mechanisms.

## Enable native caching

API Mesh supports dynamic content caching natively using standard [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching).

<InlineAlert variant="info" slots="text"/>

Native caching is currently in closed beta.

To enable caching in API Mesh, add `"cache": true` to your `responseConfig` in your mesh configuration file. Caching is disabled by default.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Adobe Commerce",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      }
    ],
    "responseConfig": {
      "includeHTTPDetails": true,
      "cache": true
    }
  }
}
```

<InlineAlert variant="info" slots="text"/>

Currently, query-level caching is not supported.

<InlineAlert variant="info" slots="text"/>

GET requests are limited to 2,048 characters.
