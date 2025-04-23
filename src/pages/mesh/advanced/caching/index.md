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

- The response status must be in the range `200` - `299`.
- The response body cannot contain errors, as defined by [GraphQL specification](https://spec.graphql.org/October2021/#sec-Errors).
- The response `cache-control` header must contain public [cache eligible directives](./cache-control-headers.md#response-headers).

## Compliance

When considering PCI or HIPPA compliance as it relates to caching, you should understand the following:

- API Mesh caching is disabled by default.
  - You must opt in to caching, by configuring `meshConfig.responseConfig.cache: true`.
- When caching is configured, API Mesh acts as a public cache driven by cache-control headers returned from your sources.
- API Mesh is a gateway and is unaware of the compliance requirements of your sources. You should understand your sources and ensure they return appropriate cache-control headers to prevent caching of sensitive data.

## Source-driven caching

API Mesh implements a source-driven caching model. Your data sources are responsible for directing caching behavior by returning appropriate [cache-control headers](./cache-control-headers.md).

<InlineAlert variant="warning" slots="text"/>

You must ensure that sources serving personalized content return appropriate cache-control directives. API Mesh will never cache responses containing the `private` or `no-store` directives.

The mesh will respect and forward these cache directives at the mesh level, but your sources must ensure proper caching behavior for personalized content through appropriate header settings and cache control mechanisms.

## Enable native caching

API Mesh supports dynamic content caching natively using standard [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching).

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

You should [purge your cache](#purge-the-cache) every time you [update your mesh](../../basic/create-mesh.md#update-an-existing-mesh) configuration, if the changes could impact the cache.

<InlineAlert variant="info" slots="text"/>

Currently, query-level caching is not supported.

<InlineAlert variant="info" slots="text"/>

GET requests are limited to 2,048 characters.

## Verifying the caching behavior using response headers

You can verify the caching behavior of GraphQL requests based on the values of the returned response headers when caching is enabled.

**Response headers**

The following response headers are returned when caching is enabled:

- `Age` - On cache `HIT`, cached response age in seconds.

- `Cache-Status` - `HIT` or `MISS`.

- `Etag` - Unique identifier for a response.

- `Expires` - UTC date when the cached response expires.

- `Last-Modified` - UTC date when the cached response was stored.

## Purge the cache

<InlineAlert variant="info" slots="text"/>

When you delete a mesh, the mesh's caching configuration is also deleted. You can either let the cache expire based on its preconfigured Time to Live (TTL) or purge the cache.

To purge your cache, use the following command.

```bash
aio api-mesh:cache:purge -a
```

Confirm that you want to purge the cache by selecting `Yes`. You can also auto confirm the purge by adding the `--autoConfirmAction` or `-c` flag.

```bash
aio api-mesh:cache:purge -a -c
```

<InlineAlert variant="warning" slots="text"/>

Purging the cache will delete all cached responses for the mesh.

For more information, refer to the [Command reference](../index.md#aio-api-meshcachepurge).

## Use your own CDN

While we recommend using the native [API Mesh caching](./index.md) functionality, you can also provide your own content delivery network (CDN), such as Fastly. Refer to the [Fastly caching example](./fastly.md) for more information.

To disable native caching in API Mesh and use your own CDN, ensure that your `responseConfig` contains `"cache": false` to avoid double caching.

<InlineAlert variant="info" slots="text"/>

When using your own CDN, you must invalidate the cache after modifying a mesh configuration, or you will receive stale information.

<InlineAlert variant="info" slots="text"/>

`POST` requests are typically not supported when bringing your own CDN.
