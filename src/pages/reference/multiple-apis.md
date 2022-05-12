---
id: multiple-apis
title: Combine and extend different sources
sidebar_label: Combine and extend sources
---

# Multiple APIs recipe (GraphQL Mesh)

This topic describes the GraphQL Mesh recipe for using multiple apis.

GraphQL Mesh is able to merge different data sources into a single unified GraphQL Schema, and GraphQL Mesh is not an alternative to Schema Stitching, Apollo Federation, Bare Schema Merging or another merging strategy. GraphQL Mesh can consume and merge your data sources in different approaches.

In addition to `@apollo/gateway`, GraphQL Mesh supports subscriptions out-of-box.

[Learn more the key differences between Schema Stitching and Apollo Federation](https://product.voxmedia.com/2020/11/2/21494865/to-federate-or-stitch-a-graphql-gateway-revisited)

## Extending GraphQL Schema with `additionalTypeDefs`

You can add new types and/or fields to the current unified GraphQL Schema by using `additionalTypeDefs` configuration field;

Let's say we have `Wikipedia` API in our Mesh configuration;

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

And here we add a new field under `Query` root type named `viewsInPastMonth`. But we need a resolver for this new field.

## Declare a resolver to the new `additionalTypeDefs` by using `additionalResolvers`

We have `additionalResolvers` field to make our new field executable in the unified schema;

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

## Add `additionalResolvers` programmatically from a code source

You can add custom resolvers and custom GraphQL schema SDL, and use the API SDK to fetch the data and manipulate it. So the query above could be simplified with custom logic.

This is possible because GraphQL Mesh will make sure to expose all available services in each API in your `context` object.

It's named the same as the API name, so to access the API of `Wiki` source, you can use `context.Wiki.Query` and use the methods you need. It's useful when you need add custom behaviors, fields and types, and also for linking types between schemas.

In the following example, we will add a new root operation to `Query` type, and automate the variables that it needs, in order to create a simpler version of it for the consumers.

To add a new simple field, that just returns the amount of views for the past month, you can wrap it as following in your GraphQL config file, and add custom resolvers file using `additionalResolvers` field:

```json
{
  "sources": [
    {
      "name": "Wiki",
      "handler": {
        "openapi": {
          "source": "https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml"
        }
      }
    }
  ],
  "additionalTypeDefs": "extend type Query {\n  viewsInPastMonth(project: String!): Float!\n}\n",
  "additionalResolvers": [
    "./src/mesh/additional-resolvers.js"
  ]
}
```

Now, we need to implement `src/mesh/additional-resolvers.js` with code that fetches and manipulate the data:

```js
const moment = require('moment');


const resolvers = {
  Query: {
    viewsInPastMonth: async (root, args, context, info) => {
      const { items } = await context.Wiki.Query.getMetricsPageviewsAggregateProjectAccessAgentGranularityStartEnd({
        root,
        args: {
          access: 'all-access',
          agent: 'user',
          end: moment().format('YYYYMMDD'),
          start: moment().startOf('month').subtract(1, 'month').format('YYYYMMDD'),
          project: args.project,
          granularity: 'monthly',
        },
        context,
        info,
        selectionSet: /* GraphQL */`
          {
            views
          }
        `
      });

      if (!items || items.length === 0) {
        return 0;
      }

      return items[0].views;
    },
  },
};

module.exports = { resolvers };
```

Now run `mesh dev` and you'll be able to see your new field as part of your GraphQL schema, and you'll be able to query for it.

And now we run the following GraphQL query to fetch the simplified data:

```graphql
query viewsInPastMonth {
  viewsInPastMonth(project: "en.wikipedia.org")
}
```
<InlineAlert variant="info" slots="text"/>

You can find the complete example [here](https://github.com/Urigo/graphql-mesh/tree/master/examples/openapi-javascript-wiki)

## Combining Schemas using declarative API or JavaScript Code File

We learnt that we can combine multiple APIs in Mesh using `additionalTypeDefs` and `additionalResolvers`.

The following example has two different OpenAPI sources; we add two new fields to a type of `Cities`, and those fields have return types from `Weather` API.

But this time we don't use an extra resolvers file for `additionalResolvers` but only the configuration file.

```json
{
  "sources": [
    {
      "name": "Cities",
      "handler": {
        "openapi": {
          "source": "https://api.apis.guru/v2/specs/mashape.com/geodb/1.0.0/swagger.json",
          "operationHeaders": {
            "X-RapidAPI-Key": "f93d3b393dmsh13fea7cb6981b2ep1dba0ajsn654ffeb48c26"
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

The declaration above equals to the following;

```js
const { print } = require('graphql');

module.exports = {
  PopulatedPlaceSummary: {
    dailyForecast: {
      selectionSet: /* GraphQL */`
        {
          latitude
          longitude
        }
      `,
      resolve: async (root, args, context, info) => {
        const result = await context.Weather.Query.getForecastDailyLatLatLonLon({
          root,
          args: {
            lat: root.latitude,
            lon: root.longitude,
            key: context.headers['x-weather-api-key'],
          },
          context,
          info,
          selectionSet: subtree => /* GraphQL */`
            {
              data {
                ${print(subtree)}
              }
            }
          `
        });
        return result?.data;
      },
    },
    todayForecast: {
      selectionSet: `
        {
          latitude
          longitude
        }
      `,
      async resolve(root, args, context, info) {
        const result = await context.Weather.Query.getForecastDailyLatLatLonLon({
          root,
          args: {
            lat: root.latitude,
            lon: root.longitude,
            key: context.headers['x-weather-api-key'],
          },
          context,
          info,
          selectionSet: subtree => /* GraphQL */`
            {
              data {
                ${print(subtree)}
              }
            }
          `
        });
        return result?.data?.[0];
      },
    },
  },
};
```
<InlineAlert variant="info" slots="text"/>

Also, checkout [Postgres GeoDB example](https://github.com/Urigo/graphql-mesh/tree/master/examples/postgres-geodb) example that combines GitHub API and a Postgres DB sources.

## Merging types from different sources (using Type Merging)

Let's say you have two different services; `Books` and `Authors`. And those two are exposing the following schemas at the end;

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

And you renamed `AuthorWithBooks` to `Author` using [`Rename`](rename.md) transform.

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

 then you expect following query works fine;

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

But it won't work because Mesh doesn't know which field belongs to where and how to combing those. For sure, you could add `additionalResolvers` then extract `books` from `AuthorWithBooks` then return it as `books` field of `Author` type but this sounds a little bit overhead. So let's try Type Merging here;

We have Type Merging transform to teach Mesh how to fetch entities from different sources;

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

Then now our query will work as expected!

[Check this out learn more about Type Merging transform](transforms/type-merging.md).

## Batching requests between sources to prevent N+1 problem

### In type merging

The example above works fine but there is an N+1 problem. It sends `n` requests for `n` entities. But we have `authors` and `books`. Type Merging is smart enough to handle batching if you point it to a field that returns a list of entities. Let's update our configuration for this;

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

In the current example, we want to have a field called `author` under `Book` property then point it to `author`.

Normally we supposed to do the following definitions;
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

But we want to solve N+1 problem;

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

And that's it. Now GraphQL Mesh will batch the queries of `Book.author` by using `authorId` field into `Query.authors`.

## Consuming Apollo Federation Services inside GraphQL Mesh

GraphQL Mesh uses [the approach of Schema Stitching](https://github.com/gmac/schema-stitching-handbook/tree/master/federation-services) in order to consume the existing Apollo Federation services inside GraphQL Mesh. So you can combine Federation and Type Merging in GraphQL Mesh

You can follow Apollo Federation spec and integrate your existing Federated services into GraphQL Mesh.

GraphQL Mesh is smart enough to mix and match Federation and Stitching approaches including all other transforms (Type Merging, Rename, Filter etc.)

You can also transform your existing non-federated schemas into federated service.

```json
{
  "sources": [
    {
      "name": "accounts",
      "handler": {
        "graphql": {
          "endpoint": "http://localhost:4001/graphql"
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
          "endpoint": "http://localhost:4002/graphql"
        }
      }
    },
    {
      "name": "products",
      "handler": {
        "graphql": {
          "endpoint": "http://localhost:4003/graphql"
        }
      }
    },
    {
      "name": "inventory",
      "handler": {
        "graphql": {
          "endpoint": "http://localhost:4004/graphql"
        }
      }
    }
  ]
}
```

<InlineAlert variant="info" slots="text"/>

 You can [check out documentation of federation transformer](../transforms/federation.md) to learn more about adding federation metadata to a non-federated GraphQL Schema.
