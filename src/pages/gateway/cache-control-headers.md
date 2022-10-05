---
title: Edge caching
description: Specifies how to use headers to limit and modify the cache for GET requests.
---

# Edge caching

API Mesh for Adobe App Builder supports edge caching for users who provide their own content delivery network (CDN), such as Fastly. Edge caching allows you to improve website load times and reduce consumption costs associated with bandwidth.

## Cache-control headers

CDN's use cache-control headers to determine how your information is cached.

Every time you use a browser or a GET request to access a url, the site's response headers typically include a `cache-control` header, which determines how long the site will allow its data to be cached. For example, a website could have the following response header:

```html
cache-control: max-age=0
```

The `max-age=0` cache-control directive means that this site wants to serve [fresh](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#fresh_and_stale_based_on_age) data until `0` seconds after the response is generated, which basically means it never wants to cache data. This could also be achieved with a `no-store` directive.

For more information on specific cache-control directives and how they can be used, see the [Mozilla Developer Network's cache control guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control).

## Using cache-control headers with API Mesh

API mesh users can add cache-control headers to [request headers](#as-request-headers) or to a [mesh configuration file](#in-the-mesh-configuration-file).

<InlineAlert variant="info" slots="text"/>

Currently query-level caching is not supported.

### As request headers

When making a GET request, you can add cache-control headers to your GraphQL client.

![headers](../_images/ccheaders.png)

<InlineAlert variant="info" slots="text"/>

PUT requests are not supported and GET requests are limited to 2,048 characters.

#### How conflicting header values are resolved

When cache-control header values from multiple sources conflict, API Mesh will select the lowest or most restrictive value. The following section explains which values are returned when [cache-control directives](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) conflict.

If your source's cache-control headers contain the `no-store` directive, it supersedes all other directives.

If your source's cache-control headers contain conflicting values for the following directives, the lowest value is selected:

- `min-fresh`

- `max-age`

- `max-stale`

- `s-maxage`

- `stale-if-error`

- `stale-while-revalidate`

If your source's cache-control headers contain any of the following directives, the directive is added to the `cache-control` response.

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

- Source 1

  - response headers - max-age=3600, stale-while-revalidate=60, stale-if-error=3600

- Source 2

  - response headers - max-age:600, stale-if-error=60

- Combined HTTP response

  - response header - max-age=600, stale-while-revalidate=60, stale-if-error=60

Example 2

- Source 1

  - response headers - max-age=3600, stale-while-revalidate=60, stale-if-error=3600

- Source 2

  - response header - no-store

- Combined HTTP response

  - response header - no-store

### In the mesh configuration file

To set your cache-control headers in your mesh configuration file, add a `Cache-Control` key value pair to the `responseConfig`.

<InlineAlert variant="info" slots="text"/>

Cache-control header values in your mesh configuration file take precedence over other conflicting values and are always included in the response.

#### Mesh Example

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "venia",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        },
        "responseConfig": {
          "headers": {
            "Cache-Control": "max-age=50,min-fresh=6,stale-if-error=20,public,must-revalidate"
        }
      }
    ]
  }
}
```
