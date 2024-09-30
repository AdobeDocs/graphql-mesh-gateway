---
title: Performance testing
description: Learn about priming your mesh for best mesh performance.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

import Performance from '/src/_includes/performance-schedule.md'

# Performance testing

When performance testing edge meshes on API Mesh for Adobe Developer App Builder, you need to account for cold starts to get an accurate measurement of the performance.

If your mesh existed before the September 24, 2024 release, you must run the `aio api-mesh update` command on your edge mesh before you can benefit from this enhancement.

If applicable, you should use the `Connection: keep-alive` header described in [Optimizing edge mesh performance](../basic/create-mesh.md#optimizing-edge-mesh-performance).

Additionally, you can prime your mesh by making several repeated calls to the mesh that do not make calls to your sources. This is also useful for increasing performance using cURL or other tools that do not support the `keep-alive` header.

<InlineAlert variant="info" slots="text"/>

If you are using the `Connection: keep-alive` header, you only need to prime with one or two calls before testing.

If you are not using the `keep-alive` header, you can prime your mesh by repeating the following query 100-200 times before performance testing:

```graphql
{
  __schema {
    queryType {
      name
    }
  }
}
```

<Performance />
