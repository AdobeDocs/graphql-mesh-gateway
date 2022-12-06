---
title: Handlers | API Mesh for Adobe Developer App Builder
---

# Handlers

The handler documentation was originally published by [The Guild] in their [GraphQL Mesh Docs]. We are republishing it here under the [MIT License] because the API Mesh uses an older version of GraphQL Mesh, while the documentation at that site reflects the current version. Additionally, we currently only support a limited set of handlers, transforms, and recipes.

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
        "name": "MagentoRest",
        "handler": {
          "openapi": {
            "source": "your_Magento_API"
          }
        },
      }
    ]
  },
}
```

Handlers are located in the sources section of the mesh file. Each `source` will need a `name`, a `handler`, and other key value pairs that correspond to the `handler` type. In the previous example, the `openapi` handler only requires a `source`.

## Reference local files in handlers

You can reference local files as sources in handlers using the following format:

```json
{
    "meshConfig": {
        "sources": [
            {
                "name": "MagentoRest",
                "handler": {
                    "openapi": {
                        "source": "your_Magento_API"
                    }
                }
            },
            {
                "name": "Magento REST V2",
                "handler": {
                    "openapi": {
                        "source": "./magentoRestV2.json"
                    }
                }
            }
        ],
        "files": [
            {
                "path": "./magentoRestV2.json",
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
[The Guild]: https://www.the-guild.dev/
[MIT License]: https://github.com/Urigo/graphql-mesh/blob/master/LICENSE#L3
[GraphQL Mesh Docs]: https://www.graphql-mesh.com/docs/
