---
title: Query configuration
description: Harden your mesh against oversized, abusive, or schema-probing GraphQL queries with the queryConfig object.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - Security
  - Tools
---

# Query configuration

The `queryConfig` object is an optional, top-level field in your `meshConfig` that lets you harden your mesh against oversized, abusive, or schema-probing GraphQL queries. It exposes a set of controls that protect both the mesh and your backend sources from common GraphQL attack patterns.

All protections are **disabled by default**. Each protection must be explicitly turned on by setting `enabled: true`. When a protection is enabled but its specific limit value is omitted, the [graphql-armor](https://escape.tech/graphql-armor/) default is used.

## Configuration

Add `queryConfig` as a sibling of `sources` in your `meshConfig`:

```json
{
  "meshConfig": {
    "disableIntrospection":true,
    "sources": [
      {
        "name": "Commerce",
        "handler": {
          "graphql": {
            "endpoint": "https://your-store.example.com/graphql"
          }
        }
      }
    ],
    "queryConfig": {
      "blockFieldSuggestion": { "enabled": true },
      "costLimit":            { "enabled": true, "maxCost": 5000 },
      "maskErrors":           { "enabled": true, "message": "Unexpected error." },
      "maxAliases":           { "enabled": true, "limit": 15 },
      "maxDepth":             { "enabled": true, "limit": 6 },
      "maxDirectives":        { "enabled": true, "limit": 50 },
      "maxTokens":            { "enabled": true, "limit": 1000 }
    }
  }
}
```

You can enable any combination of these protections. Any configurations that are not included in the `queryConfig` object are not applied.

<InlineAlert variant="help" slots="text"/>

To [disable introspection](../basic/work-with-mesh.md#disable-introspection), set `disableIntrospection` to `true` in your mesh configuration.

## `queryConfig` properties

The following sections describe each `queryConfig` property and its values.

### `blockFieldSuggestion`

Suppresses the `Did you mean "<field name>"?` hints that GraphQL adds to error responses when a field name is misspelled. Removing these hints prevents an attacker from enumerating your schema by sending intentionally invalid queries.

| Field     | Type      | Required | Description                                                                                                                  |
|-----------|-----------|----------|------------------------------------------------------------------------------------------------------------------------------|
| `enabled` | `boolean` | Yes      | Set to `true` to enable the protection.                                                                                      |
| `mask`    | `string`  | No       | Replacement string shown in place of the suggestion. Defaults to an empty string, which removes the hint entirely.           |

**`blockFieldSuggestion` disabled**:

  ```json
  {
    "errors": [
      { "message": "Cannot query field \"productz\" on type \"Query\". Did you mean \"products\"?" }
    ]
  }
  ```

**`blockFieldSuggestion` enabled**:

  ```json
  {
    "errors": [
      { "message": "Cannot query field \"productz\" on type \"Query\"." }
    ]
  }
  ```

### `costLimit`

Rejects queries with a computed cost that exceeds the configured maximum. Cost accounts for fields, depth, and complexity, providing a more nuanced limit than depth or token counts alone.

| Field     | Type      | Required | Description                                                                                       |
|-----------|-----------|----------|---------------------------------------------------------------------------------------------------|
| `enabled` | `boolean` | Yes      | Set to `true` to enable the protection.                                                           |
| `maxCost` | `integer` | No       | Maximum allowed query cost. Must be between `1` and `5000`. Defaults to `5000`.      |

<InlineAlert variant="info" slots="text"/>

Introspection queries are exempt from this limit.

### `maskErrors`

Replaces unintentional resolver errors with a generic message so that internal error details, such as stack traces or backend information, are not leaked to clients.

| Field     | Type      | Required | Description                                                                                              |
|-----------|-----------|----------|----------------------------------------------------------------------------------------------------------|
| `enabled` | `boolean` | Yes      | Set to `true` to enable the protection.                                                                  |
| `message` | `string`  | No       | Custom error message returned to clients when an error is masked. Defaults to `"Oops. Something went wrong."`. |

Errors that explicitly set `extensions.code` (intentional, structured errors thrown by your resolvers or sources) are passed through unchanged. Only unintentional errors are masked.

### `maxAliases`

Limits the number of aliases that a single query can use. Use this to prevent alias-based amplification attacks, where the same expensive field is requested many times under different aliases.

| Field     | Type      | Required | Description                                                                                          |
|-----------|-----------|----------|------------------------------------------------------------------------------------------------------|
| `enabled` | `boolean` | Yes      | Set to `true` to enable the protection.                                                              |
| `limit`   | `integer` | No       | Maximum allowed aliases per query. Must be between `1` and `15`. Defaults to `15`.      |

### `maxDepth`

Limits the maximum nesting depth of incoming queries. Use this to block deeply nested queries that can amplify load on your sources.

| Field     | Type      | Required | Description                                                                                       |
|-----------|-----------|----------|---------------------------------------------------------------------------------------------------|
| `enabled` | `boolean` | Yes      | Set to `true` to enable the protection.                                                           |
| `limit`   | `integer` | No       | Maximum allowed query depth. Must be between `1` and `6`. Defaults to `6`.           |

<InlineAlert variant="info" slots="text"/>

Introspection queries are exempt from this limit.

### `maxDirectives`

Limits the number of directives a single query can apply. Use this to prevent abusive use of directives such as `@include` or `@skip`.

| Field     | Type      | Required | Description                                                                                            |
|-----------|-----------|----------|--------------------------------------------------------------------------------------------------------|
| `enabled` | `boolean` | Yes      | Set to `true` to enable the protection.                                                                |
| `limit`   | `integer` | No       | Maximum allowed directives per query. Must be between `1` and `50`. Defaults to `50`.     |

### `maxTokens`

Limits the total number of GraphQL tokens parsed per query. Use this to reject overly large query documents.

| Field     | Type      | Required | Description                                                                                              |
|-----------|-----------|----------|----------------------------------------------------------------------------------------------------------|
| `enabled` | `boolean` | Yes      | Set to `true` to enable the protection.                                                                  |
| `limit`   | `integer` | No       | Maximum allowed tokens per query. Must be between `1` and `1000`. Defaults to `1000`.       |

<InlineAlert variant="info" slots="text"/>

Introspection queries are exempt from this limit.
