---
title: typeMerging | API Mesh for Adobe Developer App Builder
description: Learn how to combine multiple sources with the typeMerge transform.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# `typeMerging` transform

[Type Merging] allows you to combine multiple sources by merging a type from each source. For example, you could combine responses from two different APIs on a single field, provided you [rename] the fields you want to stitch to the same name. For more information, see this [example].
Type Merge transforms allow you to combine multiple sources by merging a type from each source, by using the [Type Merging](https://graphql-tools.com/docs/stitch-type-merging) approach of Schema Stitching.

For example, you could combine responses from two different APIs on a single field, provided you rename the fields you want to stitch to the same name.

## What is Type Merging?

Imagine you have a mesh with two different GraphQL sources, `Books` and `Authors`, defined as the following:

```graphql
# Authors
type Query {
  authors(ids: [ID!]): [Author!]!
  author(id: ID!): Author!
}

type Author {
  id: ID!
  name: String!
}
```

```graphql
# Books
type Query {
  books(ids: [ID!]): [Book!]!
  book(id: ID!): Book!
  authorWithBooks(id: ID!): AuthorWithBooks!
  authorsWithBooks(ids: [ID!]): [AuthorWithBooks!]!
}

type Book {
  id: ID!
  title: String!
  authorId: ID!
}

type AuthorWithBooks {
  id: ID!
  books: [Book!]!
}
```

If you wanted to rename `AuthorWithBooks` to `Author` using the [`Rename`](/docs/transforms/rename) transform, you would create the following mesh.

```json
[
    {
        "sources": [
            {
                "name": "BookService",
                "handler": null,
                "transforms": [
                    {
                        "rename": {
                            "renames": [
                                {
                                    "from": {
                                        "type": "AuthorWithBooks"
                                    },
                                    "to": {
                                        "type": "Author"
                                    }
                                },
                                {
                                    "from": {
                                        "type": "Query",
                                        "field": "authorWithBooks"
                                    },
                                    "to": {
                                        "type": "Query",
                                        "field": "author"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }
]
```

After that `rename`, you would expect the following query to work, but it will fail because the mesh does not know which field belongs to which source and how to combine those.

```graphql
{
  author(id: 0) {
    id # This field is common
    name # This field is from `AuthorService`
    # This field is from `BookService`
    books {
      id
      title
    }
  }
}
```

You could add `additionalResolvers`, extract `books` from `AuthorWithBooks`, and return it as a `books` field of `Author` type, but this is unnecessarily complicated. So instead, we'll use Type Merging.

The following example indicates how to fetch entities from different sources:

```json
{
    "sources": [
        {
            "name": "AuthorService",
            "handler": null,
            "transforms": [
                {
                    "typeMerging": {
                        "queryFields": [
                            {
                                "queryFieldName": "author",
                                "keyField": "id"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "name": "BookService",
            "handler": null,
            "transforms": [
                {
                    "rename": {
                        "renames": [
                            {
                                "from": {
                                    "type": "AuthorWithBooks"
                                },
                                "to": {
                                    "type": "Author"
                                }
                            },
                            {
                                "from": {
                                    "type": "Query",
                                    "field": "authorWithBooks"
                                },
                                "to": {
                                    "type": "Query",
                                    "field": "author"
                                }
                            },
                            {
                                "from": {
                                    "type": "Query",
                                    "field": "authorsWithBooks"
                                },
                                "to": {
                                    "type": "Query",
                                    "field": "authors"
                                }
                            }
                        ]
                    }
                },
                {
                    "typeMerging": {
                        "queryFields": [
                            {
                                "queryFieldName": "book",
                                "keyField": "id"
                            },
                            {
                                "queryFieldName": "author",
                                "keyField": "id"
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
```

Now the previous query will work as expected.

### Prevent N+1 problem with Type Merging

The previous example works fine, but there is an N+1 problem. It sends `n` requests for `n` entities. But we have `authors` and `books`. Type Merging is smart enough to handle batching if you point it to a field that returns a list of entities. Let's update our mesh to the following:

```json
{
    "sources": [
        {
            "name": "AuthorService",
            "handler": null,
            "transforms": [
                {
                    "typeMerging": {
                        "queryFields": [
                            {
                                "queryFieldName": "authors",
                                "keyField": "id"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "name": "BookService",
            "handler": null,
            "transforms": [
                {
                    "rename": {
                        "renames": [
                            {
                                "from": {
                                    "type": "AuthorWithBooks"
                                },
                                "to": {
                                    "type": "Author"
                                }
                            },
                            {
                                "from": {
                                    "type": "Query",
                                    "field": "authorWithBooks"
                                },
                                "to": {
                                    "type": "Query",
                                    "field": "author"
                                }
                            },
                            {
                                "from": {
                                    "type": "Query",
                                    "field": "authorsWithBooks"
                                },
                                "to": {
                                    "type": "Query",
                                    "field": "authors"
                                }
                            }
                        ]
                    }
                },
                {
                    "typeMerging": {
                        "queryFields": [
                            {
                                "queryFieldName": "books",
                                "keyField": "id"
                            },
                            {
                                "queryFieldName": "authors",
                                "keyField": "id"
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
```

And now it batches the requests to the inner sources.

## Using the Type Merging Transform

```json
{
  "sources": [
    {
      "name": "AuthorService",
      "handler": {
        "graphql": {
          "endpoint": "https://my-site.com/author-service-schema"
        }
      },
      "transforms": [
        {
          "typeMerging": {
            "queryFields": [
              {
                "queryFieldName": "authors",
                "keyField": "id"
              }
            ]
          }
        }
      ]
    },
    {
      "name": "BookService",
      "handler": {
        "graphql": {
          "endpoint": "https://my-site.com/book-service-schema.js"
        }
      },
      "transforms": [
        {
          "rename": {
            "renames": [
              {
                "from": {
                  "type": "AuthorWithBooks"
                },
                "to": {
                  "type": "Author"
                }
              },
              {
                "from": {
                  "type": "Query",
                  "field": "authorWithBooks"
                },
                "to": {
                  "type": "Query",
                  "field": "author"
                }
              }
            ]
          }
        },
        {
          "typeMerging": {
            "queryFields": [
              {
                "queryFieldName": "book",
                "keyField": "id"
              },
              {
                "queryFieldName": "author",
                "keyField": "id"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## Config API Reference

-  `types` (type: `Array of Object`, required):
   -  `typeName` (type: `String`) - Name of the type (Query by default)
   -  `key` (type: `Object`) - Specifies a base selection set needed to merge the annotated type across subschemas.
  Analogous to the `selectionSet` setting specified in the [merged type configuration](https://www.graphql-tools.com/docs/stitch-type-merging#basic-example):
      -  `selectionSet` (type: `String`, required)
   -  `canonical` (type: `Boolean`) - Specifies types and fields
that provide a [canonical definition](https://www.graphql-tools.com/docs/stitch-type-merging#canonical-definitions) to be built into the gateway schema. Useful for selecting preferred characteristics among types and fields that overlap across subschemas. Root fields marked as canonical specify which subschema the field proxies for new queries entering the graph.
   -  `fields` (type: `Array of Object`, required):
      -  `fieldName` (type: `String`, required)
      -  `computed` (type: `Object`) - specifies a selection of fields required from other services to compute the value of this field.
         - These additional fields are only selected when the computed field is requested.
         - Analogous to the [computed field](https://www.graphql-tools.com/docs/stitch-type-merging#computed-fields) in merged type configuration.
         - Computed field dependencies must be sent into the sub service using an [object key](https://www.graphql-tools.com/docs/stitch-directives-sdl#object-keys).
         -  `selectionSet` (type: `String`, required)
-  `queryFields` (type: `Array of Object`, required) - Denotes a root field used to query a merged type across services.
The marked field's name is analogous to the `fieldName` setting in [merged type configuration](https://www.graphql-tools.com/docs/stitch-type-merging#basic-example), while the field's arguments and return type are used to infer the merge configuration.
Directive arguments tune the merge behavior:
   -  `queryFieldName` (type: `String`, required)
   -  `keyField` (type: `String`) - Specifies the name of a field to pick off origin objects as the key-value pair. When omitted, a `@key` directive must be included on the return type's definition to be built into an object key.
https://www.graphql-tools.com/docs/stitch-directives-sdl#object-keys
   -  `keyArg` (type: `String`) - Specifies which field argument receives the merge key. This may be omitted for fields with only one argument where the recipient can be inferred.
   -  `additionalArgs` (type: `String`) - Specifies a string of additional keys and values to apply to other arguments,
formatted as `\"\"\" arg1: "value", arg2: "value" \"\"\"`.
   -  `key` (type: `Array of String`, required) - Advanced use only; Allows building a custom key just for the argument from the `selectionSet` included by the `@key` directive.
   -  `argsExpr` (type: `String`) - Advanced use only; This argument specifies a string expression that allows more customization of the input arguments. Rules for evaluation of this argument are as follows:
   -  Basic object parsing of the input key: `"arg1: $key.arg1, arg2: $key.arg2"`
   -  Any expression enclosed by double brackets will be evaluated once for each of the requested keys, and then sent as a list: `"input: \{ keys: [[$key]] }"`
   -  Selections from the key can be referenced by using the $ sign and dot notation, for example `upcs: [[$key.upc]]`, so that `$key.upc` refers to the `upc` field of the key.
-  `additionalConfiguration` (type: `Any`) - The path to a code file that has an additional type merging configuration
