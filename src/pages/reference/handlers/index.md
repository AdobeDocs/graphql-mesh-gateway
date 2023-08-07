---
title: Handlers | API Mesh for Adobe Developer App Builder
description: Overview of handlers and sources available in API Mesh.
---

# Handlers

Handlers, or source handlers, allow you to define sources that provide data to your mesh. The following table specifies the handlers supported by API Mesh and the version of each handler:

| Handler Package Name | Version |
|------------|------------|
[`openapi`](./openapi.md) | `0.33.26`
[`graphql`](./graphql.md) | `0.31.24`
[`JsonSchema`](./json-schema.md) | `0.35.38`
[`soap`](./soap.md) | `0.14.25`

The [source handlers](../../gateway/source-handlers.md) topic provides more information about handlers in the context of API Mesh.

<InlineAlert variant="info" slots="text"/>

Whenever a source schema is modified, you must [update your mesh](../../gateway/create-mesh.md#update-an-existing-mesh) to allow API Mesh to cache any changes.

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

Handlers are located in the sources section of the mesh file. Each `source` will need a `name`, a `handler`, and other key-value pairs that correspond to the `handler` type. In the previous example, the `openapi` handler only requires a `source`.

## Reference local files in handlers

<InlineAlert variant="info" slots="text"/>

To reference files directly, refer to [developer tools](../../gateway/developer-tools.md#reference-files-directly).

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
