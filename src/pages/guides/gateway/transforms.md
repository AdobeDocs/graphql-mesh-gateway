---
title: Transforms
---

# Transforms

While [handlers] let you bring outside sources into Adobe Graph, [transforms] allow you to modify the schema in order to control the contents of your GraphQL requests and responses.

Adobe Graph currently supports the following [transforms]:

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
  "tenantId": "<your_tenant_id"
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
  "tenantId": "<your_tenant_id>"
}
```

## Filter schema

The [Filter Schema] transform allows you to specify which schema elements to include or exclude in your mesh. You can include or exclude entire queries and mutations, or place restrictions on which types can appear in your calls.

For example, you might want to exclude deprecated queries, mutations, and types from your schema so that your integration is not affected when these entities are removed. In the example below, the deprecated Adobe Commerce  `category` and `customerOrders` queries are filtered out of the [PWA] handler.

<!-- I'm not certain if the paragraph above is accurate. The documentation here is a little sparse: https://www.graphql-mesh.com/docs/transforms/filter-schema -->

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
  "tenantId": "<your_tenant_id>"
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
  "tenantId": "<your_tenant_id>"
}
```

## Type Merge

[Type Merge] transforms allow you to combine multiple sources by merging a type from each source. For example, you could combine responses from two different APIs on a single field, provided you [rename] the fields you want to stitch to the same name. For more information, see this [GraphQL Mesh Example].

<!-- I couldn't really come up with an example here, so linking out made more sense to me. -->

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
  "tenantId": "<your_tenant_id>"
}
```

<!-- Link Definitions -->
[AEM]: https://experienceleague.adobe.com/docs/experience-manager-cloud-service.html
[PWA]: https://developer.adobe.com/commerce/pwa-studio/
[Rename]: https://www.graphql-mesh.com/docs/transforms/rename
[GraphQL Mesh]: https://www.graphql-mesh.com/docs/getting-started/introduction
[handlers]: source-handlers.md
[transforms]: https://www.graphql-mesh.com/docs/transforms/transforms-introduction
[Prefix]: https://www.graphql-mesh.com/docs/transforms/prefix
[Rename]: https://www.graphql-mesh.com/docs/transforms/rename
[Filter Schema]: https://www.graphql-mesh.com/docs/transforms/filter-schema
[Replace]: https://www.graphql-mesh.com/docs/transforms/replace-field
[Type Merge]: https://www.graphql-mesh.com/docs/transforms/type-merging
[Naming Convention]: https://www.graphql-mesh.com/docs/transforms/naming-convention
[Federation]: https://www.graphql-mesh.com/docs/transforms/federation
[Encapsulate]: https://www.graphql-mesh.com/docs/transforms/encapsulate
[GraphQL Mesh Example]: https://www.graphql-mesh.com/docs/recipes/multiple-apis#merging-types-from-different-sources-using-type-merging
[RegEx flags]: https://www.graphql-mesh.com/docs/transforms/rename#config-api-reference
