---
title: Transforms | API Mesh for Adobe Developer App Builder
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

<!-- 
## Root-level transforms

To specify `transforms` over unified schema, you should put it in the root of your config file. This could be used in case you need access fields or types from all your data source, for example for linking two data sources together.

The following example prefixes an input source to make it simpler later to merge and avoid conflicts:

```json
{
  "transforms": [
    {
      "replaceField": {
        "typeDefs": "type NewBook {\n  isAvailable: Boolean\n}\n",
        "replacements": [
          {
            "from": {
              "type": "Book",
              "field": "code"
            },
            "to": {
              "type": "NewBook",
              "field": "isAvailable"
            },
            "composer": "./customComposers.js#isAvailable"
          }
        ]
      }
    }
  ]
}
``` -->

## Two different modes

By default, most transform manipulating schemas work by wrapping the original schema. Still, recently we have also introduced a new `bare` mode to replace the original schema with the transformed one.
Although both `bare` and `wrap` modes achieve the same result, their behaviors are very different.
Let's take a look at how they operate.

### `wrap`

<InlineAlert variant="warning" slots="text"/>

`wrap` mode adds significant overhead and can cause longer processing times. When using API Mesh, we strongly recommend using [Bare](index.md#bare) mode.

The wrap mode applies transformations by adding a wrapping layer to the original GraphQL schema. The handler generates a GraphQL
schema and passes it to the transform. When in `wrap` mode, the transform receives this schema. Rather than updating it, it will apply a layer on top of it, with the scope of serving your transformations as an addition to the original schema generated by the handler.

This approach is safe as we have used it extensively in `graphql-tools`; however, be mindful of the implications below.

#### Implications

The `wrap` mode is the default mode for schema manipulation transforms because it is safe and works across all data sources. However, you might want to be aware of the following implications.

-  Runtime implications

  Schema wrapping is performed during initialization only and so won't affect runtime GraphQL operations. However, transforms that alter the original schema shape using `wrap` mode, achieve this by intercepting both the incoming request and the original response to do the mapping required to transform the original schema into the desired shape.

  Not all transforms require interception of both request and response. Some require straightforward mapping, so the runtime overhead could hopefully be negligible; however, there will always be some.

-  Multiple wrapping layers
  
  When using `wrap` mode, the required transformation can be achieved by adding at least one wrapping layer per each transform rule defined. We cannot have a wrapping layer per transform, but we need one per rule since each rule is unique in the way it transforms different parts of the schema. Some rules might even require multiple wrapping layers, f.i. When transforming a field, the transform needs to be applied to RootFields, ObjectFields, and InputObjectFields.

  As explained in the previous point, the wrapping layers are registered during initialization only. However, each wrapping layer will always have some runtime implications, even if hopefully negligible.

-  Working with fixed-schema sources

    As mentioned, `wrap` is the only mode that works for sources that "speak" GraphQL natively. However, when you work with fixed schema sources, such as JSON-schema, OpenApi, or SOAP. Schema wrapping might have some undesired effects. For example, you won't have access to the original "fixed-contract" response from your data source.

    This might not be ideal, for example, when implementing custom resolvers, where you might want to access several properties returned by your REST service to compute custom data. Still, you will only be able to access properties requested with the GraphQL query.

    If you don't want/can't opt into `bare` mode, this can be easily solved by explicitly declaring a `SelectionSet`, within your custom resolver to list all properties required to compute your custom data.

<InlineAlert variant="info" slots="text"/>

`wrap` is the only approach that works with data sources that already "speaks" GraphQL, or when you want to transform all sources at the (root) level unless you're using [merger-bare](/docs/api/modules/merger-bare). If you want to remove the possible runtime implications, consider either moving your transforms from the data source level or opting into `merger-bare` to take advantage of `bare` mode.

Example:

```json
{
  "sources": [
    {
      "name": "Countries",
      "handler": {
        "graphql": {
          "endpoint": "https://api.../graphql"
        }
      },
      "transforms": [
        {
          "rename": {
            "mode": "wrap",
            "renames": [
              {
                "from": {
                  "type": "Country",
                  "field": "admin1Admins"
                },
                "to": {
                  "type": "Country",
                  "field": "admin1"
                }
              }
            ]
          }
        }
      ]
    },
    {
      "name": "Users",
      "handler": {
        "openapi": {
          "source": "https://api.../swagger.yaml"
        }
      },
      "transforms": [
        {
          "rename": {
            "mode": "wrap",
            "renames": [
              {
                "from": {
                  "type": "User",
                  "field": "lastName"
                },
                "to": {
                  "type": "User",
                  "field": "surname"
                }
              }
            ]
          }
        }
      ]
    }
  ],
  "transforms": [
    {
      "rename": {
        "mode": "wrap",
        "renames": [
          {
            "from": {
              "type": "Country",
              "field": "ISO-3166_Code"
            },
            "to": {
              "type": "Country",
              "field": "code"
            }
          }
        ]
      }
    }
  ]
}
```

<InlineAlert variant="info" slots="text"/>

When you want to use `wrap`, you can omit the `mode` property since this is already applied by default.

### `bare`

Bare is a recent addition and works by replacing the original schema. The handler generates a GraphQL schema and passes it to the transform. When in `bare` mode, the transform, receives the schema generated by your handler, applies the defined transform rules, and returns an updated version of the original schema.

This means that the transformed schema replaces the original schema from the handler and so Mesh deals with the latter schema only, as opposed to an original schema plus one or more wrapping layers.

`bare` mode does remove all the [implications of `wrap` mode](#implications), however, be mindful of the restrictions below.

#### Restrictions

`bare` mode does provide performance improvements over `wrap` mode, however, it needs to access the bare schema. Here are some reasons this might not work:

-  Your data source already "speaks" GraphQL
  `bare` won't work since it cannot replace a native GraphQL schema. This is not the same as transforming a "translated" GraphQL schema (e.g. from JSON-schema, OpenApi, SOAP, etc.).
  Instead, we suggest that you apply the `wrap` transforms to your GraphQL data source and `bare` transforms to sources "translated" into GraphQL.

-  You are applying transforms at the all-sources (root) level
  This means that `bare` would receive a composed GraphQL schema, rather than a bare and "translated" schema. If you do want to use `bare` at the root level, your only choice is to opt into merger-bare, which lets transforms access the bare schemas; because it merges sources without wrapping them. This works when you don't have (or you take care of) conflicts between your sources, and you are not applying root-level transforms to data sources that already "speak" GraphQL.

-  You are mixing transforms that support `bare` with transforms that don't
  Again, `bare` mode always needs to access the bare schema. If you define other transforms that don't support `bare` mode, you will most likely have trouble, because those transforms will apply a wrapping layer that provides the `bare` transforms, instead of the original bare schema.

  To take advantage of `bare` performance improvements, the suggestion here is to apply `wrap` transforms at the all-sources (root) level and `bare` transforms within the data sources level; so you can reduce the number of wrapping layers that would otherwise be created if not using `bare` at all.

Example:

```json
{
  "sources": [
    {
      "name": "Countries",
      "handler": {
        "soap": {
          "wsdl": "https://webservices.../wso?WSDL"
        }
      }
    },
    {
      "name": "Users",
      "handler": {
        "openapi": {
          "source": "https://api.../swagger.yaml"
        }
      },
      "transforms": [
        {
          "rename": {
            "mode": "bare",
            "renames": [
              {
                "from": {
                  "type": "User",
                  "field": "lastName"
                },
                "to": {
                  "type": "User",
                  "field": "surname"
                }
              }
            ]
          }
        }
      ]
    }
  ],
  "merger": "bare",
  "transforms": [
    {
      "rename": {
        "mode": "bare",
        "renames": [
          {
            "from": {
              "type": "Country",
              "field": "ISO-3166_Code"
            },
            "to": {
              "type": "Country",
              "field": "code"
            }
          }
        ]
      }
    }
  ]
}
```

### Modes support

The table below illustrates how `bare` and `wrap` modes are supported across all transforms.

| Transform             | Bare | Wrap |                      Docs                      |
| --------------------- | :--: | :--: | :--------------------------------------------: |
| Encapsulate           |  ❌  |  ✅  | [docs](encapsulate.md)           |
| Federation            |  ❌  |  ✅  | [docs](federation.md)            |
| Filter Schema         |  ✅  |  ✅  | [docs](filter-schema.md)         |
| Naming Convention     |  ❌  |  ✅  | [docs](naming-convention.md)     |
| Prefix                |  ✅  |  ✅  | [docs](prefix.md)                |
| Rename                |  ✅  |  ✅  | [docs](rename.md)                |
| Replace Field         |  ✅  |  ❌  | [docs](replace-field.md)         |

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
