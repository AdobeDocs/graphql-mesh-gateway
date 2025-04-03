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

Edge caching is a feature of API Mesh for Adobe Developer App Builder that allows you to cache responses from your sources. When you enable caching, API Mesh caches responses for a specified amount of time. This feature helps reduce the load on your sources and improves the performance of your mesh.

Using API Mesh's native caching feature:

- Reduces latency and network hops
- Simplifies architecture by using API Mesh's CDN

## Enable caching

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
