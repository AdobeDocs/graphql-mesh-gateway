---
title: Edge mesh BETA
description: Learn about the closed beta for edge mesh deployments.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Edge mesh BETA

<InlineAlert variant="warning" slots="text"/>

This page describes the current status of the API Mesh for Adobe Developer App Builder closed beta program for edge mesh support. This feature is in closed beta and is not accessible to non-beta users, for future updates watch the [release notes](./release-notes.md) page.

The current API Mesh architecture uses a standard configuration spread across several regions. To increase speeds and provide better benefits to our users, we are introducing a closed beta using the edge deployment of meshes. These edge meshes are stored closer to your data sources to reduce latency and generally improve the API Mesh experience by making meshes more performant and reducing mesh response times.

## Benefits

- Improved response times and enhanced API performance
- Easier integration with industry-standard tools and third-party products
- Reduce neighboring meshes potential to degrade mesh performance
- Better security and compliance
- Increased observability

## Using edge meshes

<InlineAlert variant="info" slots="text"/>

Due to compatibility limitations during this closed beta, certain features, such as [Hooks](./hooks.md) and [SOAP handlers](./source-handlers.md#soap), are not available in edge meshes.

As part of the closed beta program, you will get access to edge mesh URLs. After you have updated to the latest version. [Create a mesh](./create-mesh.md) or [update an existing mesh](./create-mesh.md#update-an-existing-mesh) to trigger the edge deployment. The `aio api-mesh create` and `aio api-mesh update` commands will include the following information.

```terminal
Legacy Mesh Endpoint: https://graph.adobe.io/api/123456-123-456-789-1234567890/graphql?api_key=09876543210987654321
Edge Mesh Endpoint: https://edge-graph.adobe.io/api/123456-123-456-789-1234567890/graphql?api_key=09876543210987654321
```

- Legacy Mesh Endpoint - contains the standard production-ready mesh URL
- Edge Mesh Endpoint - contains the closed beta edge mesh URL

<InlineAlert variant="info" slots="text"/>

While the edge mesh endpoints will be faster and more performant, during this beta phase, these URLs should only be used for testing and staging purposes.

### Command responses

In addition to the create and update commands, responses to other commands have changed to accommodate edge mesh information.

The `aio api-mesh:describe` command contains both the legacy and edge mesh endpoints.

The `aio api-mesh:status` command describes the status of both the legacy and edge mesh builds. This reflects the success of both building your legacy mesh and deploying the edge mesh. Any failures or errors that appear in the `Legacy Mesh Status`, will subsequently affect the edge mesh. So you will need to resolve any errors in your legacy mesh build before using the edge mesh.

```terminal
Legacy Mesh Status: 
Your mesh was successfully built.
*********************************
Edge Mesh Status:
Your mesh was successfully built.
```
