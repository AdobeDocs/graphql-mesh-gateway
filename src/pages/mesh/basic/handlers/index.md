---
title: Add source handlers
description: How to add supported source handlers to your mesh. 
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Add source handlers

Source handlers allow you to define sources, such as APIs, that provide data to your mesh. Each handler in your mesh corresponds to an API or other source that you can specify. API Mesh for Adobe Developer App Builder currently supports the following handlers:

-  [OpenAPI](./openapi.md)
-  [GraphQL](./graphql.md)
-  [JSON schemas](./json-schema.md)
-  [SOAP](./soap.md) (Experimental)

Whenever a schema is modified, you must [update your mesh](../create-mesh.md#update-an-existing-mesh) to allow API Mesh to cache any changes.

<InlineAlert variant="warning" slots="text"/>

Only alphanumerical characters are allowed in source handler names.

<InlineAlert variant="info" slots="text"/>

Whenever a source schema is modified, you must [update your mesh](../create-mesh.md#update-an-existing-mesh) to allow API Mesh to cache any changes.

The following example contains a basic mesh file with an OpenAPI source handler.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "CommerceREST",
        "handler": {
          "openapi": {
            "source": "your_Commerce_API"
          }
        },
      }
    ]
  },
}
```

Handlers are located in the `sources` section of the mesh file. Each `source` will need a `name`, a `handler`, and other key-value pairs that correspond to the `handler` type. In the previous example, the `openapi` handler only requires a `source`.

- `name` - an alphanumeric name to distinguish between other handlers
- `handler`- the type of handler you want to use, for example `openapi`
- Handler specific data - the key-value pairs that correspond to your specified handler

## Reference local files in handlers

<InlineAlert variant="info" slots="text"/>

To reference files directly, refer to [local development](../../advanced/developer-tools.md#reference-files-directly).

You can reference local files as sources in handlers using the following format:

```json
{
    "meshConfig": {
        "sources": [
            {
                "name": "CommerceREST",
                "handler": {
                    "openapi": {
                        "source": "your_Commerce_API"
                    }
                }
            },
            {
                "name": "CommerceRESTV2",
                "handler": {
                    "openapi": {
                        "source": "./CommerceRestV2.json"
                    }
                }
            }
        ],
        "files": [
            {
                "path": "./CommerceRestV2.json",
                "content": <LOCAL_FILE_CONTENT>
            }
        ]
    }
}
```

<InlineAlert variant="info" slots="text"/>

Only `JS` and `JSON` files are supported using this method.

## Package versions

The following table specifies the GraphQL Mesh versions of each handler supported by API Mesh for Adobe Developer App Builder:

| Handler Package Name | Version |
|------------|------------|
[`openapi`](./openapi.md) | `0.33.39`
[`graphql`](./graphql.md) | `0.34.13`
[`JsonSchema`](./json-schema.md) | `0.35.38`
[`soap`](./soap.md) | `0.14.25`
