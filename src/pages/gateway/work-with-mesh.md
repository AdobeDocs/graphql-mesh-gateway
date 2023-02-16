---
title: Work with your mesh
description: This page describes ways you can work with meshes that are not part of the mesh creation process.
---

# Work with your mesh

This page describes ways you can work with meshes that are not part of the [mesh creation](create-mesh.md) process.

## Include httpDetails in query responses

Adding the `includeHTTPDetails` flag to your JSON mesh configuration file determines if `httpDetails` information is included in query responses.

Setting `includeHTTPDetails` to `true` adds information like `responseTime` and response headers to every query response. Setting `includeHTTPDetails` to `false` prevents users who query your mesh from accessing this information.

The following example mesh indicates the location of the `includeHTTPDetails` flag.

```json
{
    "meshConfig": {
        "responseConfig":{
            "includeHTTPDetails":true

        },
        "sources":[
            {
                "name":"Venia",
                "handler": {
                    "graphql": 
                    {
                        "endpoint":"https://venia.magento.com/graphql"
                    }
                }
            }
        ]
    }
}
```

When you query a mesh with `includeHTTPDetails` set to `true`, the response will include an `httpDetails` section with the following information:

- `sourceName`
- `request`
- `response`
- `responseTime`

The following example includes some of the additional information a user can receive as part of the response. The exact response will vary depending on your source handlers, headers, and other customizations.

```json
{   
 "data": {
        "storeConfig": {
            "timezone": "America/Los_Angeles"
        }
    },
    "extensions": {
        "httpDetails": [
            {
                "sourceName": "Venia",
                "request": {
                    "timestamp": 1676489418840,
                    "url": "https://venia.magento.com/graphql",
                    "method": "POST",
                    "headers": {
                        "accept": "application/graphql-response+json, application/json, multipart/mixed",
                        "content-type": "application/json"
                    }
                },
                "response": {
                    "timestamp": 1676489419070,
                    "status": 200,
                    "statusText": "OK",
                    "headers": {
                        "accept-ranges": "bytes",
                        "cache-control": "max-age=0, must-revalidate, no-cache, no-store",
                        "connection": "keep-alive",
                        "content-length": "63",
                        "content-type": "application/json",
                        "date": "Wed, 15 Feb 2023 19:30:19 GMT",
                        "expires": "Tue, 15 Feb 2022 19:30:19 GMT",
                    }
                },
                "responseTime": 230
            }
        ]
    }
}
```
