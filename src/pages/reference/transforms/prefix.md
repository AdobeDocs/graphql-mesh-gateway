---
title: prefix Transform | Adobe API Manager
---

# prefix transform

The `prefix` transform allow you prefix GraphQL types and GraphQL root operations (under `Query/Mutation`).

You can use it to easily "namespace" APIs in your unified API and avoid conflicts.

## How to use?

Add the following configuration to your Mesh config file:

```json
{
  "transforms": [
    {
      "prefix": {
        "mode": "bare | wrap",
        "value": "MyApi_"
      }
    }
  ]
}
```
<InlineAlert variant="info" slots="text"/>

For information about "bare" and "wrap" modes, read the [dedicated section](/reference/transforms/index.md#two-different-modes).

<InlineAlert variant="info" slots="text"/>

You can check out our example that uses schema stitching with a PostgreSQL datasource and prefix transform.
[Click here to open the example on GitHub](https://github.com/Urigo/graphql-mesh/tree/master/examples/postgres-geodb)

## Config API Reference

-  `mode` (type: `String` (`bare` | `wrap`)) - Specify to apply prefix transform to bare schema or by wrapping original schema
-  `value` (type: `String`) - The prefix to apply to the schema types. By default it's the API name.
-  `ignore` (type: `Array of String`, required) - List of ignored types
-  `includeRootOperations` (type: `Boolean`) - Changes root types and changes the field names (default: false)
-  `includeTypes` (type: `Boolean`) - Changes types (default: true)
