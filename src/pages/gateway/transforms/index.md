---
title: Transforms
description: How to apply transforms to your mesh to customize your responses.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Transforms

While [handlers](../handlers/index.md) let you bring outside sources into API Mesh for Adobe Developer App Builder, transforms allow you to modify the schema to control the contents of your GraphQL requests and responses.

Transforms are specified as a list of objects, and they are executed in order. You can apply them [to a specific handler or the entire mesh](#handler-vs-mesh-transforms).

## Transforms available

API Mesh currently supports the following [transforms]:

-  [Rename](./rename.md)
-  [Prefix](./prefix.md)
-  [Filter Schema](./filter-schema.md)
-  [Replace Field](./replace-field.md)
-  [Type Merging](./type-merging.md)
-  [Naming Convention](./naming-convention.md)
-  [Hooks](../hooks.md)

Additionally, the following transforms are available but are not fully supported by API Mesh at this time. This means that your mesh will accept the transform, but we have not tested the transform thoroughly, and you could encounter errors. Additionally, certain transform options may be disabled due to security concerns.

-  [Encapsulate](./encapsulate.md)
-  [Federation](./federation.md)
-  [Hoist field](./replace-field.md#scope-hoistvalue)

Other transforms are not supported.

## Handler vs mesh transforms

When adding a transform to your mesh, you can choose to have the transform affect a single source (handler) or the entire mesh. The following examples use [`prefix` transforms](./prefix.md), which are the preferred method of avoiding conflicting object names across multiple schemas.

The following example uses the `prefix` transform to prefix "REST_" to all queries and mutations from the REST source.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "REST",
        "handler": {
          "openapi": {
            "source": "https://venia.magento.com/rest/all/schema"
          }
        },
        "transforms": [
          {
            "prefix": {
              "includeRootOperations": true,
              "value": "REST_"
            }
          }
        ]
      },
      {
        "name": "GraphQL",
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

Conversely, the following example uses `prefix` to apply the "ADOBE_" prefix to every source in the mesh.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "REST",
        "handler": {
          "openapi": {
            "source": "https://venia.magento.com/rest/all/schema"
          }
        }
      },
      {
        "name": "GraphQL",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      }
    ],
    "transforms": [
      {
        "prefix": {
          "includeRootOperations": true,
          "value": "ADOBE_"
        }
      }
    ]
  }
}
```

## Working with transforms

When working with transforms, consider the following:

- Transforms are processed in order
- Having many transforms in a mesh should not impact performance
- Transforms at the mesh level will impact `additionalResolvers`

### Transform order

The following transform will fail. The mesh will not find the `Customer` type to filter by, because the `namingConvetion` transform converted it to lowercase (`customer`):

```json
...
    "transforms": [
      {
        "namingConvention": {
          "typeNames": "lowerCase",
        }
      },
      {
        "filterSchema": [
          "Query.Customer"
        ]
      }
    ]
...
```

### Transforms and `additionalResolvers`

Use caution when applying mesh-level transforms; modifying the schema at this level will impact any `additionalResolvers`. For example, if you use `filterSchema` to remove a type, an `additionalResolver` will not be able to access that type.

## Versions

The following table specifies the GraphQL Mesh versions of each transform supported by API Mesh for Adobe Developer App Builder:

| Transform | Version |
|------------|------------|
[encapsulate] | `0.4.21`
[federation] | `0.11.14`
[filterSchema] | `0.15.23`
[namingConvention] | `0.13.22`
[prefix] | `0.12.22`
[rename] | `0.14.22`
[replaceField] | `0.4.20`
[typeMerging] | `0.5.20`

<!-- Link Definitions -->
[Introduction]: index.md
[encapsulate]: ./encapsulate.md
[federation]: ./federation.md
[filterSchema]: ./filter-schema.md
[namingConvention]: ./naming-convention.md
[prefix]: ./prefix.md
[rename]: ./rename.md
[replaceField]: ./replace-field.md
[typeMerging]: ./type-merging.md
