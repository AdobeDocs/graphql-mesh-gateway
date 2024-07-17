---
title: prefix Transform | API Mesh for Adobe Developer App Builder
description: Learn how to namespace APIs with the prefix transform.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# `prefix` transform

The `prefix` transform allows you to add prefixes to existing types and root operations. `prefix` is similar to `rename` in that it allows you to modify names to avoid conflicts, simplify complicated names, and change the appearance of your query. In contrast with `rename`, `prefix` is simpler and only allows you to append a prefix to the existing name.

You can use it to easily "namespace" APIs in your unified API and avoid conflicts.

## Usage

The following example adds the `commerce_` prefix to all Adobe Commerce source types:

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "AdobeCommerce",
        "transforms": [
          {
            "prefix": {
              "mode": "wrap",
              "value": "commerce_"
            }
          }
        ],
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

For information about `bare` and `wrap` modes, read the [dedicated section](./bare-vs-wrap.md).

 In the example below, we differentiate our sources by adding an "AEM_" prefix to the [AEM](https://experienceleague.adobe.com/en/docs/experience-manager-65) source and a "Venia_" prefix to the [PWA](https://developer.adobe.com/commerce/pwa-studio/) source.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "AEM",
        "handler": {
          "graphql": {
            "endpoint": "https://example1.com/graphql"
          }
        },
        "transforms": [
          {
            "prefix": {
              "includeRootOperations": true,
              "value": "AEM_"
            }
          }
        ]
      },
       {
        "name": "PWA",
        "handler": {
          "graphql": {
            "endpoint": "https://example2.com/graphql"
          }
        },
        "transforms": [
          {
            "prefix": {
              "includeRootOperations": true,
              "value": "Venia_"
            }
          }
        ]
      }
    ]
  },
}
```

## Config API Reference

-  `mode` (type: `String` (`bare` | `wrap`)) - Specify to apply prefix transform to bare schema or by wrapping original schema
-  `value` (type: `String`) - The prefix to apply to the schema types. By default, the prefix is the API name.
-  `ignore` (type: `Array of String`, required) - List of ignored types
-  `includeRootOperations` (type: `Boolean`) - Changes root types and changes the field names (default: false)
-  `includeTypes` (type: `Boolean`) - Changes types (default: true)
