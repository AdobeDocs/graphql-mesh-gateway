---
title: Adobe Graph Architecture Overview
description: A description of the architecture and how requests are processed inside Adobe Graph.
---

# Architecture overview

Depending on your role and use case for Adobe Graph, there are different ways to view the gateway architecture.

If you are interested in how you can affect the gateway, you can follow this process in the diagram below:

-  **A** - Configure the GraphQL Mesh using the Adobe I/O CLI.
-  **B** - Install App builder extensions to customize your GraphQL Mesh configuration.

If you are interested in how the internal Adobe network processes your calls, you can follow this process in the diagram below:

-  **1** - The Adobe I/O Gateway processes the API requests, providing monitoring, authentication, and security.
-  **2** - The Schema Management Service generates a GraphQL schema for each tenant based on its GraphQL mesh configuration.
-  **3** - The GraphQL server fetches data from the upstream APIs based on the mesh configuration.

The diagram below explains the high-level architecture of Adobe Graph.

![architecture diagram](../images/adobe-graph-architecture.svg)
