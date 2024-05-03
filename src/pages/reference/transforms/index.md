---
title: Transforms | API Mesh for Adobe Developer App Builder
description: Learn how to use transforms.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Transforms

The following table specifies the transforms supported by API Mesh and the version of each transform:

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

See [Transforms] if you would like more information on transforms in the context of API Mesh.

## Introduction to transforms

API Mesh allows you to modify the schema easily, to control the contents of your GraphQL requests and responses;
you can use one of the built-in transforms or write your own.

Each transformer can manipulate the schema the way it needs and return the modified schema.

Transforms are specified as a list of objects, and they are executed in order. You can apply them over a specific input source, or over the unified schema (after merging all sources).

## Handler-level transforms

Most of the previous Guides configured Transforms at the root of the `mesh.json` configuration.

```json
{
  "sources": [
    {
      "name": "Books",
      "handler": {
        "openapi": {
          "source": "https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml"
        }
      },
      "transforms": [
        {
          "prefix": {
            "value": "Wiki_"
          }
        }
      ]
    }
  ]
}
```

However, Mesh Transforms can be specified at the Source or Root level as follows:

```json
{
    "sources": [
        {
            "name": "Books",
            "handler": {
                "openapi": {
                    "baseUrl": "https://my-service-url/",
                    "source": "../books-service/openapi3-definition.json"
                }
            },
            "transforms": null
        },
        {
            "rename": {
                "renames": [
                    {
                        "from": {
                            "type": "Query",
                            "field": "categories"
                        },
                        "to": {
                            "type": "Query",
                            "field": "booksCategories"
                        }
                    }
                ]
            }
        },
        {
            "name": "Authors",
            "handler": {
                "grpc": {
                    "endpoint": "https://my-service-url/",
                    "protoFilePath": "../authors-service/proto/authors/v1/authors_service.proto"
                }
            }
        },
        {
            "name": "Stores",
            "handler": {
                "graphql": {
                    "endpoint": "https://my-service-url/graphql"
                }
            }
        }
    ],
    "transforms": [
        {
            "filterSchema": {
                "filters": [
                    "Query.stores"
                ]
            }
        }
    ]
}
```

Specifying transforms at the Source level helps to isolate each Source definition better.

<InlineAlert variant="warning" slots="text"/>

Transforms performed at the Source level or Root level do not result in the same final SDK that you might potentially use later in `additionalResolvers`.

The diagram below explains how the Mesh process is applied when building the final unified Schema and SDK:

[mflowchart](../../_images/mflowchart.svg)

The above diagram highlights 2 important points when working with transforms:

### Transforms order is important

The sequence diagram shows that Mesh always applies transforms in order, which means a given transformer can impact the following one.

Given the following `MyService` schema:

```graphql
type Query {
  books_list: [Book]!
}

# …
```

The following `filterSchema` transforms configuration will fail:

```json
{
  "sources": {
    "name": "MyService",
    "handler": {
      "JsonSchema": null
    },
    "transforms": [
      {
        "namingConvention": {
          "typeNames": "pascalCase",
          "fieldNames": "camelCase"
        }
      },
      {
        "filterSchema": [
          "Query.books_list"
        ]
      }
    ]
  }
}
```

Because the Mesh processes transforms in the order they are defined, when `filterSchema` is processed, all types and fields have been transformed to match the configured naming convention.
The `Query.books_list` does not exist anymore, replaced by the `Query.booksList` query.

<InlineAlert variant="info" slots="text"/>

The number of configured transforms does not impact performances (build or runtime) since Mesh processes them in
a chained way

### Beware of which transforms are used at the source level

As stated earlier, transforms applied at the source level impact the generated SDK.

For this reason, be careful when using the `filterSchema` transforms at the Source level since it will also remove it from the SDK, which will make it impossible to use it at the additional resolvers level.

For example:

```json
{
  "sources": {
    "name": "MyService",
    "handler": {
      "JsonSchema": null
    },
    "transforms": [
      {
        "filterSchema": [
          "Query.books_list"
        ]
      }
    ]
  }
}
```

The above `filterSchema` Transforms will prevent calling the `books_list` Query SDK method from `additionalResolvers`.

(_The `MyService.Query.books_list()` SDK method won't be generated_)

<!-- Link Definitions -->
[Introduction]: index.md
[encapsulate]: encapsulate.md
[federation]: federation.md
[filterSchema]: filter-schema.md
[namingConvention]: naming-convention.md
[prefix]: prefix.md
[rename]: rename.md
[replaceField]: replace-field.md
[typeMerging]: type-merging.md
[Transforms]: /gateway/transforms/
