---
title: API Mesh for Adobe Developer App Builder Overview
description: Learn how API Mesh for Adobe Developer App Builder enables you to route incoming requests from customers to different underlying remote services.
---

# What is API Mesh for Adobe Developer App Builder?

The API Mesh is a decoupled API platform that enables enterprise and mid-market developers to integrate private or third-party APIs and other software interfaces with Adobe products using Adobe IO. This allows businesses that need to access functionality across multiple systems to provide better end-user experiences. The API Mesh allows developers to configure multiple APIs and other sources and serve them through a single gateway. Developers can query the combined sources through a single [GraphQL] query. Adobe Commerce, for example, also [supports GraphQL queries].

The API Mesh enables developers to integrate a GraphQL Mesh or third-party APIs with other Adobe products, like App Builder, Adobe IO Gateway, or other serverless technologies. By subscribing to near-real-time events, developers can allow these external systems to synchronize data, participate in distributed workflows, and generally react to events as they occur.

<InlineAlert variant="info" slots="text"/>

[GraphQL] is a query language for your API that lets you query exactly the information you need and only the information you need. [GraphQL Mesh] allows you to use GraphQL to query multiple data sources simultaneously.

## Why GraphQL?

[GraphQL] has several advantages over REST and other APIs:

-  **GraphQL has predictable responses**: With GraphQL, you specify what information your response should contain.
-  **Faster response time**: Since you can control what data appears in your response, there is less extraneous data slowing down your calls.
-  **Defined Schema**: With its well-defined set of types, GraphQL lets you know what data you can query.

## Features

-  **API Mesh** - A reverse proxy that accepts most API calls for many backend services
-  **Configurable Integrations** - Low/No-code method to integrate with your own private APIs with Adobe Commerce and other Adobe products, and third-party APIs
-  **Backwards Compatibility** - Preserve existing APIs while gradually adopting new ones
-  **Extensibility** - Customize and extend all of your APIs directly in the gateway without making changes to the API source

## Example use case

Adobe Commerce users can consider the API Mesh as a low-code way to integrate other APIs to the Storefront and Storefront Management APIs. It also provides a way for the Storefront API and the Storefront Management APIs to communicate with each other.

## Security

The GraphQL data plane used by API Mesh is public, but requires both a MeshID and an API Key to access. We recommend storing your API Key in a header, instead of using the API Key attached to your mesh's url.

Basic authentication and authorization are provided by your Mesh ID and API Key. Additionally, API Mesh honors any downstream authorization headers provided by your [sources](source-handlers.md).

If you require additional authentication, you can use [custom resolvers](../reference/multiple-apis.md).

DDOS protection, rate limiting, and throttling are provided at a global level by graph.adobe.io. For more individualized protection, we recommend adding a Content Delivery Network (CDN), such as fastly, through [edge caching](cache-control-headers.md).

If you encounter any security issues and need assistance, reach out to your contact for the beta program.

## Where to go next

-  [Getting started]
   -  [Prerequisites]
   -  [Create an Adobe IO account]
   -  [Configure your environment]
-  [Create a mesh]

<!-- Link Definitions -->
[supports GraphQL queries]: https://devdocs.magento.com/guides/v2.4/graphql/index.html
[GraphQL]: https://graphql.org/
[GraphQL Mesh]: https://www.graphql-mesh.com/
[mesh]: https://www.graphql-mesh.com/docs/getting-started/basic-usage
[Getting started]: getting-started.md
[Prerequisites]: getting-started.md#Prerequisites
[Create an Adobe IO account]: getting-started.md#prerequisites
[Configure your environment]: getting-started.md#configure-your-environment
[Create a mesh]: create-mesh.md
