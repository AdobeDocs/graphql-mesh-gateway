---
title: Extend your schema with AdditionalTypeDefs
description: Combine and extend different sources
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Extend your schema with `AdditionalTypeDefs`

This topic describes how to use multiple APIs. Your mesh can merge different data sources into a single unified GraphQL Schema, but it is not an alternative to Schema Stitching, Apollo Federation, Bare Schema Merging, or another merging strategy.

In addition to `@apollo/gateway`, API Mesh supports subscriptions out-of-box.

[Learn more key differences between Schema Stitching and Apollo Federation](https://product.voxmedia.com/2020/11/2/21494865/to-federate-or-stitch-a-graphql-gateway-revisited)

## Extending GraphQL Schema with `additionalTypeDefs`

You can add new types or fields to the current unified GraphQL Schema by using the `additionalTypeDefs` configuration field.

For example, if we have the StackExchange API in our Mesh configuration:

```json
{
  "sources": [
    {
      "name": "StackExchange",
      "handler": {
        "openapi": {
          "source": "https://raw.githubusercontent.com/grokify/api-specs/master/stackexchange/stackexchange-api-v2.2_openapi-v3.0.yaml"
        }
      }
    }
  ],
  "additionalTypeDefs": "extend type Query {\n  listQuestionsFromStackOverflow(first: Int!): [Question]\n}\n"
}
```

We might want to add a new field under the `Query` root type named `viewsInPastMonth`, but we will need a resolver for this field.

## Merging types from different sources (Type Merging)

Imagine you have two different services, `Books` and `Authors`, which are exposing the following schemas:

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
    authorWithBooks(id: ID!): Author!
    authorsWithBooks(ids: [ID!]): [Author!]!
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

Then you could use the [`Rename`](../../basic/transforms/rename.md) transform to rename `AuthorWithBooks` to `Author`.

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
      books { # This field is from `BookService`
        id
        title
      }
    }
  }
  ```

For other ways to extend the schema consider using [`additionalResolvers`](./resolvers/programmatic-resolvers.md) or [type merging](../../basic/transforms/type-merging.md).

## Batching requests between sources to prevent an N+1 problem

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

## Consuming Apollo Federation Services

The mesh uses [Schema Stitching](https://github.com/gmac/schema-stitching-handbook/tree/master/federation-services) to consume the existing Apollo Federation services, so you can combine Federation and Type Merging.

Follow the Apollo Federation spec and integrate your existing Federated services. Your mesh can mix and match Federation and Stitching approaches including all other transforms (Type Merging, Rename, Filter, etc.).

You can also transform your existing non-federated schemas into a federated service.

```json
{
  "sources": [
    {
      "name": "accounts",
      "handler": {
        "graphql": {
          "endpoint": "<your_url>"
        }
      },
      "transforms": [
        {
          "federation": {
            "types": [
              {
                "name": "Query",
                "config": {
                  "extend": true
                }
              },
              {
                "name": "User",
                "config": {
                  "keyFields": [
                    "id"
                  ],
                  "resolveReference": {
                    "queryFieldName": "user"
                  }
                }
              }
            ]
          }
        }
      ]
    },
    {
      "name": "reviews",
      "handler": {
        "graphql": {
          "endpoint": "<your_url>"
        }
      }
    },
    {
      "name": "products",
      "handler": {
        "graphql": {
          "endpoint": "<your_url>"
        }
      }
    },
    {
      "name": "inventory",
      "handler": {
        "graphql": {
          "endpoint": "<your_url>"
        }
      }
    }
  ]
}
```

<InlineAlert variant="info" slots="text"/>

 You can view the [federation transformer](../../basic/transforms/federation.md) documentation to learn more about adding federation metadata to a non-federated GraphQL Schema.
