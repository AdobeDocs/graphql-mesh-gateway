---
title: Getting Started
description: Set up and configure API Mesh for Adobe Developer App Builder.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Getting started

This guide provides you with the basic steps you need to set up your API management environment.

## Prerequisites

Before you can begin using the API Mesh, you must install:

-  [Node.js](https://nodejs.org/en/download/package-manager)

-  [nvm](https://github.com/nvm-sh/nvm) 18.x.x (Mac/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows)

You will also need:

-  An Adobe IO account. If you do not already have an Adobe IO account, [install Adobe IO](https://developer.adobe.com/app-builder/docs/guides/runtime_guides/tools/cli-install).
-  An API to integrate (for example, your own API, any public OpenAPI REST endpoint, or an [Adobe Experience Manager API](https://experienceleague.adobe.com/docs/experience-manager-screens/user-guide/developing/rest-api.html)).
-  (Optional) A working instance of Adobe Commerce with either Luma or Venia sample data. You can also include a Live Search instance. The examples in this guide mainly use Commerce to demonstrate features and functionality.

## Install the `aio` CLI

Install [Adobe I/O Extensible CLI](https://developer.adobe.com/app-builder/docs/guides/runtime_guides/tools/cli-install) by running the following command:

```bash
npm install -g @adobe/aio-cli
```

## Configure your environment

Once you have an Adobe IO account, you can use the following command line interface (CLI) command to install the [API Mesh plugin](https://www.npmjs.com/package/@adobe/aio-cli-plugin-api-mesh) in your project directory:

   ```bash
   aio plugins:install @adobe/aio-cli-plugin-api-mesh
   ```

## Next steps

-  Proceed to [create a mesh](create-mesh.md).
