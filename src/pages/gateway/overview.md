---
title: Adobe API Manager Overview
description: Learn how Adobe API Manager enables you to route incoming requests from customers to different underlying remote services.
---

# What is Adobe API Manager?

Adobe API Manager is a decoupled API platform that enables enterprise and mid-market developers to integrate private or third-party APIs and other software interfaces with Adobe products using Adobe IO. This allows businesses that need to access functionality across multiple systems to provide better end-user experiences. Adobe API Manager is [Multi-Tenant], which means developers can configure multiple APIs and other sources and serve them through a single gateway. Developers can query the combined sources through a single [GraphQL] query. Adobe Commerce, for example, also [supports GraphQL queries].

Adobe API Manager enables developers to integrate a GraphQL Mesh or third-party APIs with other Adobe products, like App Builder, Adobe IO Gateway, or other serverless technologies. By subscribing to near-real-time events, developers can allow these external systems to synchronize data, participate in distributed workflows, and generally react to events as they occur.

<InlineAlert variant="info" slots="text"/>

[GraphQL] is a query language for your API that lets you query exactly the information you need and only the information you need. [GraphQL Mesh] allows you to use GraphQL to query multiple data sources simultaneously.

## Why GraphQL?

[GraphQL] has several advantages over REST and other APIs:

-  **GraphQL has predictable responses**: With GraphQL, you specify what information your response should contain.
-  **Faster response time**: Since you can control what data appears in your response, there is less extraneous data slowing down your calls.
-  **Defined Schema**: With its well-defined set of types, GraphQL lets you know what data you can query.

## Features

-  **Adobe API Manager** - A reverse proxy that accepts most API calls for many backend services
-  **Configurable Integrations** - Low/No-code method to integrate with your own private APIs with Adobe Commerce and other Adobe products, and third-party APIs
<!-- The two features below likely refer to the App Builder and may need to be deleted before beta -->
-  **Backwards Compatibility** - Preserve existing APIs while gradually adopting new ones
-  **Extensibility** - Customize and extend all of your APIs directly in the gateway without making changes to the API source

## Example use case

Adobe Commerce users can consider Adobe API Manager as a low-code way to integrate other APIs to the Storefront and Storefront Management APIs. It also provides a way for the Storefront API and the Storefront Management APIs to communicate with each other.

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
[Multi-Tenant]: https://medium.com/javarevisited/understanding-of-multi-tenancy-7e9f57f00d1d
[Getting started]: getting-started.md
[Prerequisites]: getting-started.md#Prerequisites
[Create an Adobe IO account]: getting-started.md#Create_an_Adobe_IO_account
[Configure your environment]: getting-started.md#Configure_your_environment
[Create a mesh]: create-mesh.md
