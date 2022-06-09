---
title: Transforms
description: How to apply transforms to your mesh to customize your responses.
---

# Transforms

While [handlers] let you bring outside sources into API Mesh for Adobe Developer App Builder, [transforms] allow you to modify the schema in order to control the contents of your GraphQL requests and responses.

The API Mesh currently supports the following [transforms]:

-  [Rename](#rename)
-  [Prefix](#prefix)
-  [Filter](#filter-schema)
-  [Replace](#replace)
-  [Type Merge](#type-merge)
-  [Naming Convention](#naming-convention)

Additionally, these transforms are available but are not fully supported at this time:

-  [Encapsulate]
-  [Federation]

Other [GraphQL Mesh] transforms are not supported.

## Prefix

[Prefix] transforms allow you to add prefixes to existing types and root operations. `prefix` is similar to `rename` in that it allows you to modify names to avoid conflicts, simplify complicated names, and change the appearance of your query. In contrast with `rename`, `prefix` is simpler and only allows you to append a prefix to the existing name. In the example below, we differentiate our sources by adding an "AEM_" prefix to the [AEM] source and a  "Venia_" prefix to the the [PWA] source.

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
            "endpoint": "http://example2.com/graphql"
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

## Rename

[Rename] transforms allow you to rename a GraphQL field, type, or field argument. Renaming allows you to avoid conflicting names, simplify complicated names, and make queries look more like mutations. In the example below, we rename a long API field name from `integrationCustomerTokenServiceV1CreateCustomerAccessTokenPost` to the shorter `CreateCustomerToken`.

`rename` elements can contain arrays of individual renaming operations, defined in separate `renames` objects. Each of these objects must define the `from` and `to` values.

<InlineAlert variant="info" slots="text"/>

You can use [RegEx flags] to enable the use of regular expressions when renaming using this transform. For example, you could use the key value pair `field: api(.*)` in the `from` object to rename any field of the corresponding type that begins with "api".

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Magento REST",
        "handler": {
          "openapi": {
            "source": "https://www.example.com/rest/all/schema?services=all"
          }
        },
          "transforms": [
            {
              "rename": {
              "renames": [
                {
                  "from": {
                    "type": "Mutation",
                    "field": "integrationCustomerTokenServiceV1CreateCustomerAccessTokenPost"
                  },
                  "to": {
                    "type": "Mutation",
                    "field": "CreateCustomerToken"
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  },
}
```

## Filter schema

The [Filter Schema] transform allows you to specify which schema elements to include or exclude in your mesh. You can include or exclude entire queries and mutations, or place restrictions on which types can appear in your calls.

For example, you might want to exclude deprecated queries, mutations, and types from your schema so that your integration is not affected when these entities are removed. In the example below, the deprecated Adobe Commerce  `category` and `customerOrders` queries are filtered out of the [PWA] handler.

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
        }
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
            "filterSchema": {
              "filters": [
                "Query.!category",
                "Query.!customerOrders"
              ]
            }
          }
        ]
      }
    ]
  },
}
```

## Replace

[Replace] transforms allow you to replace the configuration properties of one field with another, which allows you to hoist field values from a subfield to its parent. Use this transform to clean up redundant looking queries or replace field types. In the example below, the `parent` field is being replaced by the `child` field.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "PWA",
        "handler": {
          "graphql": {
            "endpoint": "https://example2.com/graphql"
          }
        },
          "transforms": [
            {
              "replace-field": {
              "replacements": [
                {
                  "from": {
                    "type": "Query",
                    "field": "parent"
                  },
                  "to": {
                    "type": "<your_API_Response>",
                    "field": "child",
                  "scope": "hoistvalue"
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  },
}
```

## Type Merge

[Type Merge] transforms allow you to combine multiple sources by merging a type from each source. For example, you could combine responses from two different APIs on a single field, provided you [rename] the fields you want to stitch to the same name. For more information, see this [GraphQL Mesh Example].
## Naming Convention

[Naming Convention] transforms allow you to apply casing and other conventions to your response. In the example below, `enumValues` fields are converted to uppercase, while `fieldNames` are converted to camel case to enforce consistency.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "PWA",
        "handler": {
          "graphql": {
            "endpoint": "https://example2.com/graphql"
          }
        },
        "transforms": [
          {
            "namingConvention": {
              "enumValues": "upperCase",
              "fieldNames": "camelCase"
            }
          }
        ]
      }
    ]
  },
}
```

<!-- Link Definitions -->
[AEM]: https://experienceleague.adobe.com/docs/experience-manager-cloud-service.html
[PWA]: https://developer.adobe.com/commerce/pwa-studio/
[GraphQL Mesh]: getting-started.md
[handlers]: source-handlers.md
[transforms]: /reference/transforms/index.md
[RegEx flags]: /reference/transforms/rename.md#config-api-reference
[Introduction]: /reference/transforms/index.md
[Encapsulate]: /reference/transforms/encapsulate.md
[Federation]: /reference/transforms/federation.md
[Filter schema]: /reference/transforms/filter-schema.md
[Naming Convention]: /reference/transforms/naming-convention.md
[Prefix]: /reference/transforms/prefix.md
[Rename]: /reference/transforms/rename.md
[Replace Field]: /reference/transforms/replace-field.md
[Type Merging]: /reference/transforms/type-merging.md
[GraphQL Mesh Example]: /reference/multiple-apis.md#merging-types-from-different-sources-using-type-merging