---
title: Use cases
description: Learn about use cases for API Mesh.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Use cases

<!-- Page under construction, please ignore placeholder text -->

## Connecting to Adobe Commerce services

When connecting the Adobe Commerce REST API and the Commerce Catalog Service, you will have conflicting object names. For example, the <XYZ> object exists in both the Adobe Commerce REST API, and the Commerce Catalog service. Using the [`prefix` transform](./transforms/prefix.md), you can append different prefixes to each source, to avoid having conflicting object names.

## Storefront integration

Adobe Commerce users can consider API Mesh as a low-code way to integrate other APIs to the Storefront and Storefront Management APIs. It also provides a way for the Storefront API and the Storefront Management APIs to communicate with each other.
