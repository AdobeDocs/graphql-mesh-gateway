---
title: Best pracitces for Adobe Commerce as a Cloud Service
description: Learn how to set up continuous integration and delivery/deployment for API Mesh.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Adobe Commerce as a Cloud Service best practices

Use API Mesh to connect your Adobe Commerce as a Cloud Service instance with other APIs and create a single GraphQL endpoint.

## Example mesh configuration

The following example mesh configuration connects to the Adobe Commerce as a Cloud Service instance.

For additional examples, see the [Commerce samples repository](https://github.com/adobe/adobe-commerce-samples/tree/main/api-mesh).

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Adobe_Commerce_as_a_Cloud_Service",
        "handler": {
          "graphql": {
            "endpoint": "https://na1.api.commerce.adobe.com/<tenant_id>/graphql",
            "operationHeaders": {
              "Magento-Store-View-Code": "default",
              "Magento-Website-Code": "base",
              "X-Api-Key": "not_used",
              "Magento-Store-Code": "<store_code>",
              "Magento-Environment-Id": "<tenant_id>",
              "Magento-Customer-Group": "<customer_group_id>",
              "Content-Type": "application/json"
            },
            "schemaHeaders": {
              "Magento-Environment-Id": "<tenant_id>",
              "x-api-key": "not_used"
            }
          }
        },
        "responseConfig": {
          "cache": {
            "cacheControl": "public, max-age=600"
          }
        }
      }
    ],
    "responseConfig": {
      "includeHTTPDetails": false,
      "cache": true,
      "CORS": {
        "maxAge": 10,
        "credentials": true,
        "methods": [
          "GET",
          "POST",
          "PUT",
          "HEAD",
          "OPTIONS"
        ],
        "exposedHeaders": [
          "Content-Range",
          "X-Content-Range"
        ],
        "origin": [
          "http://localhost:3000",
          "https://edge-graph.adobe.io"
        ]
      }
    }
  }
}
```
