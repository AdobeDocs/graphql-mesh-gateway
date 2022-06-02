---
title: Handlers | Adobe API Manager
---

# Handlers

The handler documentation was originally published by [The Guild] in their [GraphQL Mesh Docs]. We are republishing it here under the [MIT License] because Adobe API Manager uses an older version of GraphQL Mesh, while the documentation at that site reflects the current version. Additionally, we currently only support a limited set of handlers, transforms, and recipes.

Handlers, or source handlers, allow you to define sources that provide data to your mesh. The following table specifies the handlers supported by Adobe API Manager and the version of each handler:

| Handler | Version |
|------------|------------|
[OpenAPI] | `0.24.1`
[GraphQL] | `0.22.4`
[JSON Schemas] | `0.26.5`

[Source Handlers] provides more information about handlers in the context of Adobe API Manager.

The following example contains a basic mesh file with an OpenAPI source handler.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Magento REST",
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

<!-- Link Definitions -->
[OpenAPI]: openapi.md
[GraphQL]: graphql.md
[JSON Schemas]: json-schema.md
[Source Handlers]: /gateway/source-handlers.md
[The Guild]: https://www.the-guild.dev/
[MIT License]: https://github.com/Urigo/graphql-mesh/blob/master/LICENSE#L3
[GraphQL Mesh Docs]: https://www.graphql-mesh.com/docs/
