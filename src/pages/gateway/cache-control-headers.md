---
title: Edge caching
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

# Edge caching

API Mesh for Adobe Developer App Builder supports edge caching if you provide your own content delivery network (CDN), such as Fastly. Edge caching helps improve website load times and reduces consumption costs associated with bandwidth.

<InlineAlert variant="info" slots="text"/>

When using a CDN, you must invalidate the cache after modifying a mesh configuration or you will receive stale information.

## Cache-control headers

A CDN's cache-control headers determine how queried information is cached.

When a browser or a GET request accesses a URL, the site's response headers typically include a `cache-control` header, which determines how long the site will allow its data to be cached. For example, a website could have the following response header:

```html
cache-control: max-age=0
```

The `max-age=0` cache-control directive means that this site wants to serve [fresh](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#fresh_and_stale_based_on_age) data until `0` seconds after the response is generated, which basically means it never wants to cache data. This could also be achieved with a `no-store` directive.

For more information on specific cache-control directives and how they can be used, see the [Mozilla Developer Network's cache control guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control).

## Using cache-control headers with API Mesh

API mesh users can add cache-control headers to [request headers](#as-request-headers) or to a [mesh configuration file](#in-the-mesh-configuration-file).

<InlineAlert variant="info" slots="text"/>

Currently, query-level caching is not supported.

### As request headers

Use a mesh configuration similar to the example below to [return forwarded headers](headers.md#return-forwarded-headers).

<InlineAlert variant="info" slots="text"/>

You can also use a header value of `x-include-metadata=true` to return all headers.

When the response includes cache-control values, only the [most restrictive values](#how-conflicting-header-values-are-resolved) are returned.

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

<InlineAlert variant="info" slots="text"/>

POST requests are not supported, and GET requests are limited to 2,048 characters.

#### How conflicting header values are resolved

When cache-control header values from multiple sources conflict, API Mesh selects the lowest or most restrictive value. The following section explains which values are returned when [cache-control directives](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) conflict.

The `no-store` directive supersedes all other directives. If your source's cache-control headers contain this directive, then the mesh does not return other headers.

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

### In the mesh configuration file

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

## Fastly configuration

API Mesh requires specific configuration settings when using Fastly as a CDN with Adobe Commerce.

To distinguish between requests from users and requests from API Mesh, use the following configuration option to prevent Fastly from caching headers that come directly from API Mesh:

```json
"x-commerce-bypass-fastly-cache": "true" 
```

When bypassing the cache, you must also specify which headers should be preserved in the `responseConfig`:

```json
"responseConfig": {
  "headers": [
    "x-magento-cache-id",
    "x-magento-tags",
    "set-cookie",
    "pragma",
    "cache-control",
    "expires",
    "x-content-type-options",
    "x-xss-protection",
    "x-platform-server"
  ]
}
```

Using Fastly also requires all queries to be `GET` queries. If you do not use `GET` queries, they will not be cached. To enforce this in your mesh, add the following configuration option:

`"useGETForQueries": true`

### Fastly example mesh

The following example mesh specifies the headers to cache, enables the cache bypass, and sets all queries to pass as `GET` queries.

```json
{
  "meshConfig": {
    "responseConfig": {
      "includeHTTPDetails": true
    },
    "sources": [
      {
        "name": "Core",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql",
            "operationHeaders": {
              "Authorization": "{context.headers['authorization']}",
              "Content-Type": "application/json",
              "x-commerce-bypass-fastly-cache": "true"
            },
            "useGETForQueries": true
          }
        },
        "responseConfig": {
          "headers": [
            "x-magento-cache-id",
            "x-magento-tags",
            "set-cookie",
            "pragma",
            "cache-control",
            "expires",
            "x-content-type-options",
            "x-xss-protection",
            "x-platform-server"
          ]
        }
      }
    ]
  }
}
```

### Fastly Prefixing

API mesh prefixes any Fastly source headers with their source name. For example, a source named "commerce" with an `x-magento-cache-id` header is converted to `x-commerce-magento-cache-id`. However, if your endpoint URL contains "magento", API Mesh assumes you are connecting to an Adobe Commerce instance and does not prefix your headers with a source name. Using the previous example, your header would remain `x-magento-cache-id`.
