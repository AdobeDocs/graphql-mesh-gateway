---
title: Declarative resolvers
description: Learn how to extend the unified schema with configuration-based resolvers.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Declarative resolvers

Declarative resolvers use changes to the mesh configuration to customize resolved values. To make these changes programmatically using JavaScript, see [Programmatic resolvers](./programmatic-resolvers.md).

You can also use custom resolvers to batch repeated queries and get better response times. For more information, see [Batching](../batching.md).

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

### Configuration options

- The target (`targetTypeName`, `targetFieldName`) - describes the queried field.
- The source (`sourceName`, `sourceTypeName`, `sourceFieldName`) - describes where the data is resolved for the target field.
- `requiredSelectionSet` fetches the required arguments.
- `sourceArgs` maps the `requiredSelectionSet` argument to the source.
- `keysArg` provides the name of the primary key argument. For this example, the `keysArg` field is the argument name used when sending an array of SKUs to fetch multiple reviews.
- `keyField` provides the key-value for each item in the batched query. For this example, the `keyField` indicates which Product field provides the SKU value to the review service.

## Combining schemas using declarative API

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
