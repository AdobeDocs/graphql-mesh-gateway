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

<InlineAlert variant="info" slots="text"/>

This page describes the current status of the API Mesh for Adobe Developer App Builder closed beta program for edge mesh support. This feature is in closed beta and is not accessible to unapproved users, for future updates watch the [release notes](./release-notes.md) page.

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

As part of the closed beta program, you will get access to edge mesh URLs. After you have updated to the latest version. [Create a mesh](./create-mesh.md) or [update an existing mesh](./create-mesh.md#update-an-existing-mesh) to trigger the edge deployment. Run the following command to check on the deployment status:

```bash
aio api-mesh:status
```

After your mesh is successfully deployed, run the following command to view the Legacy and Edge URLs.

```bash
aio api-mesh:describe
```

```terminal
Org ID: 123456
Project ID: 1234567890
Workspace ID: 1234567890
Mesh ID: 123456-123-456-789-1234567890
Legacy Endpoint: https://graph.adobe.io/api/123456-123-456-789-1234567890/graphql?api_key=09876543210987654321
Edge Endpoint: https://edge-graph.adobe.io/api/123456-123-456-789-1234567890/graphql?api_key=09876543210987654321
```

- Legacy Endpoint - contains the standard production-ready mesh URL
- Edge Endpoint - contains the closed beta edge mesh URL

<InlineAlert variant="info" slots="text"/>

While the edge mesh endpoints will be faster and more performant, during this beta phase, these URLs should only be used for testing and staging purposes.

