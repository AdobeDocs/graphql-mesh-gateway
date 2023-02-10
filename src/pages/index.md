---
title: Overview - API Mesh for Adobe Developer App Builder
description: Learn about the features of API Mesh for Adobe Developer App Builder.
---

<Hero slots="image, heading, text"/>

![Commerce Eventing](_images/home-bg.jpeg)

# API Mesh for Adobe Developer App Builder

API Mesh for Adobe Developer App Builder is a decoupled API platform that enables enterprise and mid-market developers to integrate private and third-party APIs and other software interfaces with Adobe products using Adobe IO.

## What is GraphQL?

GraphQL is a query language for your API that lets you query exactly the information you need and only the information you need. GraphQL Mesh allows you to use GraphQL to query multiple data sources simultaneously.

## Why GraphQL?

GraphQL has several advantages over REST and other APIs:

The API Mesh allows businesses to access functionality across multiple systems to provide better end-user experiences. The API Mesh allows developers to configure multiple APIs and other sources and serve them through a single gateway. Developers can query the combined sources through a single [GraphQL] query. Adobe Commerce, for example, also [supports GraphQL queries].

## Features

<br></br>

-  **Adobe API Manager** - A reverse proxy that accepts most API calls for many backend services
-  **Configurable Integrations** - Low/No-code method to integrate with your own private APIs with Adobe Commerce and other Adobe products, and third-party APIs
<!-- The two features below likely refer to the App Builder and may need to be deleted before beta -->
-  **Backwards Compatibility** - Preserve existing APIs while gradually adopting new ones
-  **Extensibility** - Customize and extend all of your APIs directly in the gateway without making changes to the API source

### Guide

Review the following guides to learn more about the API Mesh and extensibility at Adobe.

<DiscoverBlock slots="link, text"/>

[API Mesh for Adobe Developer App Builder](gateway/index.md)

Allows developers to integrate private and third-party APIs and other software interfaces with Adobe Commerce and other Adobe products using Adobe IO.

<DiscoverBlock slots="link, text"/>

[GraphQL Mesh Reference](./reference/)

View the GraphQL Mesh documentation reference to learn detailed information about using handlers and transforms with API Mesh.

<DiscoverBlock slots="link, text"/>

[Adobe I/O Events for Adobe Commerce](https://developer.adobe.com/commerce/events)

Makes Commerce transactional data available to App Builder using Adobe I/O. You can define the events to transmit data each time an event triggers, or only under circumstances defined within configuration rules.

<DiscoverBlock slots="link, text"/>

[App Builder](https://developer.adobe.com/app-builder/docs/overview/)

Is a complete framework that enables enterprise developers to build and deploy custom web applications that extend Adobe Experience Cloud solutions and run on Adobe infrastructure.

<!-- Link Definitions -->

[GraphQL]: https://graphql.org/
[supports GraphQL queries]: https://devdocs.magento.com/guides/v2.4/graphql/index.html
