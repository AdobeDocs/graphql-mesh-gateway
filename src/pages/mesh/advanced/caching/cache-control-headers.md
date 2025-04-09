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

## Enable caching for sources without cache-control headers

To cache responses from sources that do not return cache-control headers, use API Mesh to set a default cache-control directive in your mesh configuration file. This directive applies to all sources that do not return cache-control headers, but still respects the cache-control headers of sources that do return them and [resolves conflicts between sources](#resolving-conflicts-between-sources).

To configure a default cache-control directive, add a `cacheControl` key-value pair to `responseConfig.cache` in your mesh configuration file. Use the `cacheControl` key to specify the default cache-control directives for the source. If a cacheable query does not return a cache-control header, the default value is applied.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Adobe Commerce API",
        "handler": {
          "openapi": {
            "source": "<your_endpoint>"
          },
          "responseConfig": {
            "cache": {
              "cacheControl": "public, max-age=100"
            }
          }
        }
      },
      ...
    ]
  }
}
```
