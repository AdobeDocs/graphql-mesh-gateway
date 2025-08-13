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

When connecting the Adobe Commerce REST API and the Commerce Catalog Service, you will have conflicting object names. For example, the XYZ object exists in both the Adobe Commerce REST API, and the Commerce Catalog service. Using the [`prefix` transform](./basic/transforms/prefix.md), you can append different prefixes to each source, to avoid having conflicting object names.

## Connecting to multiple Adobe Commerce GraphQL endpoints

If you need to combine two Adobe Commerce GraphQL endpoints without introducing any prefixes, you can use this [`encapsulate` transform example](./basic/transforms/encapsulate.md#adobe-commerce-example).

This example also applies to avoiding naming conflicts from any similar schemas.

## Storefront integration

Adobe Commerce users can consider API Mesh as a low-code way to integrate other APIs to the Storefront and Storefront Management APIs. It also provides a way for the Storefront API and the Storefront Management APIs to communicate with each other.
