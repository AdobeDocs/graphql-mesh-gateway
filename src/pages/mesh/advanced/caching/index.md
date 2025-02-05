---
title: Cache-control headers
description: Specifies how to use headers to limit and modify the cache for GET requests.
keywords:
  - API Mesh
  - Extensibility
  - Cache
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Cache-control headers

API Mesh supports dynamic content caching [natively](#api-mesh-native-caching) using standard [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching). You can also [provide your own content delivery network (CDN)](#use-your-own-cdn), such as [Fastly](./fastly.md). Dynamic content caching helps improve site load times and reduces consumption costs associated with bandwidth. A CDN's cache-control headers determine how queried information is cached.

<InlineAlert variant="info" slots="text"/>

Native caching is currently in closed beta.

When a browser or a GET request accesses a URL, the site's response headers typically include a `cache-control` header, which determines how long the site will allow its data to be cached. For example, a site could have the following response header:

```html
cache-control: max-age=3600
```

A `max-age` value of `3600` means that this site wants to serve [fresh](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#fresh_and_stale_based_on_age) data for `3600` seconds (1 hour) after generating the response. After `3600` seconds, the data is considered stale and the browser must request a new response from the server.

Alternatively, a site could have the following response header:

```html
cache-control: max-age=0
```

The `max-age=0` cache-control directive means that this site wants to serve [fresh](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#fresh_and_stale_based_on_age) data until `0` seconds after generating the response, which means it never wants to cache data. You can also achieve this with a `no-store` directive.

For more information on specific cache-control directives and how to use them, see the [Mozilla Developer Network's cache control guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control).

## API Mesh native caching

Edge caching is a feature of API Mesh that allows you to cache responses from your sources. When you enable caching, API Mesh caches responses for a specified amount of time. This feature helps reduce the load on your sources and improves the performance of your mesh.

### Enable caching

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

## Response headers

You can control how caching works by modifying the directives within the `cache-control` response headers returned by the sources. At least one source included in the GraphQL query must return a `cache-control` header to consider the entire request for caching. You do not need to explicitly include the `cache-control` header in the source's `responseConfig`.

### Resolving conflicts between sources

When cache-control header values from multiple sources conflict, API Mesh selects the lowest and most restrictive value. The following section explains which values are returned when [cache-control directives](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) conflict.

If no sources in the query return a `cache-control` header, then caching is skipped.

If you have multiple sources included in a query, and only one source includes a `cache-control` header, the combined response from all sources gets cached based on the directives of the source that triggers caching.

The `no-store` directive supersedes all other directives. If your source's cache-control headers contain this directive, then the mesh does not return other headers.

<InlineAlert variant="info" slots="text"/>

You can also include a request header value of `x-include-metadata=true` to return response headers from all sources.

If your source's cache-control headers contain conflicting values for the following directives, the mesh selects the lowest value:

- `min-fresh`

- `max-age`

- `max-stale`

- `s-maxage`

- `stale-if-error`

- `stale-while-revalidate`

If your source's cache-control headers contain any of the following directives, the mesh adds the directive to the `cache-control` response.

- `public`

- `private`

- `immutable`

- `no-cache`

- `no-transform`

- `must-revalidate`

- `proxy-revalidate`

- `must-understand`

**Examples**

The following example scenarios indicate the resulting `Response header` from two conflicting sources:

Example 1

- Source 1 response headers

  - max-age=3600, stale-while-revalidate=60, stale-if-error=3600

- Source 2 response headers

  - max-age:600, stale-if-error=60

- Combined HTTP response headers

  - max-age=600, stale-while-revalidate=60, stale-if-error=60

Example 2

- Source 1 response headers

  - max-age=3600, stale-while-revalidate=60, stale-if-error=3600
  
- Source 2 response headers

  - no-store

- Combined HTTP response headers

  - no-store

Example 3

Public and private headers are mutually exclusive. Since `private` is more restrictive, API Mesh selects the values associated with the `private` header.

- Source 1 response headers

  - public, max-age=30, s-maxage=600

- Source 2 response headers

  - private, max-age=60

- Combined HTTP response headers

  - private, max-age=30, s-maxage=600

### Overriding cache-control using mesh-level `responseConfig`

To set your own values for cache-control headers, add a `Cache-Control` key-value pair to the `responseConfig` object in your mesh configuration file.

<InlineAlert variant="info" slots="text"/>

Cache-control header values in your mesh configuration file take precedence over other conflicting values for your sources and are always included in the response.

#### Mesh Example

```json
{
  "meshConfig": {
    "responseConfig": {
        "headers": {
      "Cache-Control": "max-age=50,min-fresh=6,stale-if-error=20,public,must-revalidate"
        }
    },
    "sources": [
      {
        "name": "venia",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      }
    ]
  }
}
```

## Verifying the caching behavior using response headers

You can verify the caching behavior of GraphQL requests based on the values of the returned response headers when caching is enabled.

**Response headers**

The following response headers are returned when caching is enabled:

- `Age` - On cache `HIT`, cached response age in seconds.

- `Cache-Status` - `HIT` or `MISS`.

- `Etag` - Unique identifier for a response.

- `Expires` - UTC date when the cached response expires.

- `Last-Modified` - UTC date when the cached response was stored.

## Use your own CDN

While we recommend using the [native API Mesh caching](#api-mesh-native-caching) functionality, you can also provide your own content delivery network (CDN), such as Fastly. Refer to the [Fastly caching example](./fastly.md) for more information.

To disable native caching in API Mesh and use your own CDN, ensure that your `responseConfig` contains `"cache": false` to avoid double caching.

<InlineAlert variant="info" slots="text"/>

When using your own CDN, you must invalidate the cache after modifying a mesh configuration, or you will receive stale information.

<InlineAlert variant="info" slots="text"/>

`POST` requests are typically not supported when bringing your own CDN.
