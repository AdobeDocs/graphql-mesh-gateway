---
title: Multiple APIs
description: Combine and extend different sources
---

# Multiple APIs recipe

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

## Declare a resolver to the new `additionalTypeDefs` by using `additionalResolvers`

The `additionalResolvers` field will make our new field executable in the unified schema:

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
  "additionalTypeDefs": "extend type Query {\n  listQuestionsFromStackOverflow(first: Int!): [Question]\n}\n",
  "additionalResolvers": [
    {
      "targetTypeName": "Query",
      "targetFieldName": "listQuestionsFromStackOverflow",
      "sourceName": "StackExchange",
      "sourceTypeName": "Query",
      "sourceFieldName": "listQuestions",
      "sourceArgs": {
        "pagesize": "{args.first}"
      },
      "result": "items"
    }
  ]
}
```

## Combining Schemas using declarative API

We learned that we can combine multiple APIs in a mesh using `additionalTypeDefs` and `additionalResolvers`.

The following example has two different OpenAPI sources. We will add two new fields to the `Cities` type, and those fields have return types from the `Weather` API.

To achieve this, we will use `additionalResolvers` inside the mesh configuration file.

```json
{
  "sources": [
    {
      "name": "Cities",
      "handler": {
        "openapi": {
          "source": "https://api.apis.guru/v2/specs/mashape.com/geodb/1.0.0/swagger.json",
          "operationHeaders": {
            "X-RapidAPI-Key": "a12b3c456defg78hij9kl0123m4no5pqr6stuv789wxyz01a23"
          }
        }
      }
    },
    {
      "name": "Weather",
      "handler": {
        "openapi": {
          "source": "https://api.apis.guru/v2/specs/weatherbit.io/2.0.0/swagger.json"
        }
      }
    }
  ],
  "additionalTypeDefs": "extend type PopulatedPlaceSummary {\n  dailyForecast: [Forecast]\n  todayForecast: Forecast\n}\n",
  "additionalResolvers": [
    {
      "targetTypeName": "PopulatedPlaceSummary",
      "targetFieldName": "dailyForecast",
      "requiredSelectionSet": "{\n  latitude\n  longitude\n}\n",
      "sourceName": "Weather",
      "sourceTypeName": "Query",
      "sourceFieldName": "getForecastDailyLatLatLonLon",
      "sourceArgs": {
        "lat": "{root.latitude}",
        "lon": "{root.longitude}",
        "key": "{context.headers['x-weather-api-key']}"
      },
      "result": "data"
    },
    {
      "type": "PopulatedPlaceSummary",
      "field": "todayForecast",
      "requiredSelectionSet": "{\n  latitude\n  longitude\n}\n",
      "sourceName": "Weather",
      "sourceTypeName": "Query",
      "sourceFieldName": "getForecastDailyLatLatLonLon",
      "sourceArgs": {
        "lat": "{root.latitude}",
        "lon": "{root.longitude}",
        "key": "{context.headers['x-weather-api-key']}"
      },
      "result": "data[0]"
    }
  ]
}
```

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

Then you could use the [`Rename`](transforms/rename.md) transform to rename `AuthorWithBooks` to `Author`.

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

[Learn more about the Type Merging transform](transforms/type-merging.md).

## Batching requests between sources to prevent an N+1 problem

### In type merging

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

### In regular `additionalResolvers`

In the following example, we want to have a field called `author` under `Book` property and point it to the `author` property.

Normally, we would use the following definitions:

```json
{
  "additionalTypeDefs": "extend type Book {\n  author: Author\n}\n",
  "additionalResolvers": [
    {
      "sourceName": "AuthorService",
      "sourceTypeName": "Query",
      "sourceFieldName": "author",
      "sourceArgs": {
        "id": "{root.authorId}"
      },
      "targetTypeName": "Book",
      "targetFieldName": "author",
      "requiredSelectionSet": "{authorId}"
    }
  ]
}
```

This creates an N+1 problem that we can solve by using the following format:

```json
{
  "additionalResolvers": [
    {
      "sourceName": "AuthorService",
      "sourceTypeName": "Query",
      "sourceFieldName": "authors",
      "keyField": "authorId",
      "keysArg": "ids",
      "targetTypeName": "Book",
      "targetFieldName": "author"
    }
  ]
}
```

Now your mesh will batch the queries of `Book.author` by using the `authorId` field in `Query.authors`.

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

 You can view the [federation transformer](transforms/federation.md) documentation to learn more about adding federation metadata to a non-federated GraphQL Schema.
