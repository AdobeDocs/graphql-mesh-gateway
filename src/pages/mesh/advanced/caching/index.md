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
