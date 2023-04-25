---
title: Handlers | API Mesh for Adobe Developer App Builder
---

# Handlers

Handlers, or source handlers, allow you to define sources that provide data to your mesh. The following table specifies the handlers supported by the API Mesh and the version of each handler:

| Handler Package Name | Version |
|------------|------------|
[openapi] | `0.33.26`
[graphql] | `0.31.24`
[json-schema] | `0.35.38`

[Source Handlers] provides more information about handlers in the context of the API Mesh.

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

To reference files directly, refer to [developer tools].

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

<!-- Link Definitions -->
[OpenAPI]: openapi.md
[GraphQL]: graphql.md
[JSON Schemas]: json-schema.md
[Source Handlers]: /gateway/source-handlers.md
