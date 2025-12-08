---
title: Release notes
description: This page lists changes that were made in each version of API Mesh for Adobe Developer App Builder.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

import UpdateNotice from '/src/_includes/update-notice.md'

<UpdateNotice />

# Release notes

The following sections list updates to API Mesh for Adobe Developer App Builder.

To use the latest enhancements, update your CLI to the latest version:

```bash
aio plugins:install @adobe/aio-cli-plugin-api-mesh
```

## Known issues

If you encounter a `TypeError`, such as `HandlerCtor is not a constructor`, when running a CLI command, you should uninstall and reinstall the API Mesh plugin and try the command again:

```bash
aio plugins:uninstall @adobe/aio-cli-plugin-api-mesh
```

```bash
aio plugins install @adobe/aio-cli-plugin-api-mesh
```

## December 03, 2025

This release contains the following changes to API Mesh:

### Enhancements

- Added a [prompting guide](../basic/prompting.md) to generate API Mesh configurations using AI prompting techniques.

## December 01, 2025

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an intermittent issue where provisioning context state that could cause a `Context state is not configured for this mesh` error.
- Resolved a possible `TypeError` that could lead to `500` errors when your mesh is experiencing heavy traffic.

## September 29, 2025

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an issue that could prevent retrieving logs in the CLI. <!-- CEXT-5292 -->

## September 18, 2025

This release contains the following changes to API Mesh:

### Enhancements

Added support for customer group–specific caching in API Mesh by enabling [cache variance](../advanced/caching/index.md#cache-variance) on custom headers with the `x-api-mesh-vary` header.

## September 08, 2025

This release contains the following changes to API Mesh:

### Bug fixes

- Fixed a serialization error that could occur when using `useGETForQueries` with GraphQL handlers.

## August 11, 2025

This release contains the following changes to API Mesh:

### Enhancements

- Added `context.logger` for [hooks](../advanced/hooks.md#contextlogger) and [custom resolvers](../advanced/extend/resolvers/programmatic-resolvers.md#contextlogger).

- Added [context state](../advanced/context-state.md) to allow persisting reusable values for hooks and resolvers.

- Added support for the following hooks:

  - [`afterAll`](../advanced/hooks.md#afterall) - Runs after querying all sources.
  - [`beforeSource`](../advanced/hooks.md#beforesource) - Runs before querying a source.
  - [`afterSource`](../advanced/hooks.md#aftersource) - Runs after querying a source.

### Troubleshooting

If you encounter the following error, refer to [Troubleshooting](../release/update.md#troubleshooting) for a solution.

```terminal
Mesh TypeError: Cache is not a constructor
```

## August 08, 2025

This release contains the following changes to API Mesh:

### Enhancements

- Updated the user interface in the developer console to allow you to view the [deployment history](../basic/create-mesh.md#deployment-history) for your mesh.

- Added an [Open Playground](../basic/create-mesh.md#api-playground) button to the developer console user interface that allows you to interact with your mesh using a GraphiQL client.

- Added an `--active` flag to the [`aio api-mesh:get`](../advanced/index.md#aio-api-meshget) command that allows you to retrieve the most recent successfully deployed mesh.

## June 24, 2025

This release contains the following changes to API Mesh:

### Enhancements

- Added support for `.graphql` files in the [`files` array](../advanced/developer-tools.md#reference-files-directly).

## June 24, 2025

This release contains the following changes to API Mesh:

### Bug fixes

- Fixed an error that could occur when using the `aio api-mesh:run` command with unreferenced files in your mesh configuration.

## June 16, 2025

This release contains the following changes to API Mesh:

### Enhancements

- Resolved a `500` error that could occur when fetching a GraphQL source.

## June 05, 2025

This release contains the following changes to API Mesh:

### Enhancements

- You can now [create a mesh from a template](../basic/create-mesh.md#create-a-mesh-from-a-template) using the `aio api-mesh create --template` command.
- You can now get a list of [log forwarding errors](../advanced/logging.md#get-log-forwarding-errors) using the `aio api-mesh:config:get:log-forwarding errors` command.
- Local composers now support [fetching from remote origins](../advanced/hooks.md#fetching-from-remote-origins) using `fetch()`.

## May 22, 2025

This release contains the following changes to API Mesh:

### Enhancements

- [Log forwarding](../advanced/logging.md#log-forwarding) now forwards key request and response headers, and HTTP access logs in addition to worker logs.
- Standardized error messages for improved usability and debugging.

### Bug fixes

- Fixed an issue where OpenAPI handlers with `int64` format properties could cause errors when querying.

## May 12, 2025

This release contains the following changes to API Mesh:

### Enhancements

- Added the `cf-ray` and `x-request-id` response headers, which are passed in subrequests to your mesh sources, to assist with [tracking and debugging](../advanced/headers.md#response-tracking-and-debugging).
- Added support for older New Relic license keys when using [log forwarding](../advanced/logging.md#log-forwarding).
- Updated the Adobe Commerce samples repository with a new [response caching example](https://github.com/adobe/adobe-commerce-samples/blob/main/api-mesh/response-caching/README.md).

## April 22, 2025

This release contains the following changes to API Mesh:

### Enhancements

- This release introduces [native caching](../advanced/caching/index.md#enable-native-caching) for API Mesh, including how to [verify caching behavior using response headers](../advanced/caching/index.md#verifying-the-caching-behavior-using-response-headers). It also provides guidance on [source-driven caching](../advanced/caching/index.md#source-driven-caching).
- Logging now includes HTTP details. To see these changes, perform a [mesh update](../basic/create-mesh.md#update-an-existing-mesh).
- The [`log-get-bulk` command](../advanced/logging.md#export-bulk-logs-with-a-relative-time-range) now allows you to specify the number of minutes in the past to get logs.

### Bug fixes

- [Deleting a mesh](../basic/create-mesh.md#delete-a-mesh) will now also delete the mesh's [logging configuration](../advanced/logging.md).

## April 17, 2025

This release contains the following changes to API Mesh:

### Enhancements

- A new **experimental** feature allows you to [forward logs](../advanced/logging.md#log-forwarding) to New Relic using the [`aio api-mesh:config:set:log-forwarding`](../advanced/index.md#aio-api-meshconfig) command.

- The CLI now warns you if you have `includeHTTPDetails` set to `true` in your mesh configuration. This is a security risk and should not be used in production.

## April 03, 2025

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an issue where breakpoints were not respected in local development when using the `aio api-mesh run` command.

## March 27, 2025

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an encoding issue that could cause problems when interacting with a mesh. [Update your CLI to the latest version](./upgrade.md#software-updates), if you experience similar issues.
- Resolved an issue that prevented certain `additionalResolvers` from functioning correctly when using [local development](../advanced/developer-tools.md).

## March 03, 2025

This release contains the following changes to API Mesh:

### Enhancements

- [Hooks](../advanced/hooks.md) are now supported in local development for edge meshes.
- Improved the information provided in the CLI when requesting the status of a provisioning mesh with the [`aio api-mesh:status` command](../advanced/index.md#aio-api-meshstatus).

## February 26, 2025

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an issue that could cause truncated logs.

## February 19, 2025

This release contains the following changes to API Mesh:

### Enhancements

- Authorization improvements to the CLI. To install the latest version of the API Mesh plugin, run the following command:

  ```bash
  aio plugins:install @adobe/aio-cli-plugin-api-mesh
  ```

- The CLI now notifies you when a new version of the `aio-cli-plugin-api-mesh` plugin is available.

## February 6, 2025

This release contains the following changes to API Mesh:

### Enhancements

- [Native caching](../advanced/caching/index.md) closed beta is now available for edge meshes.
- [Local development](../advanced/developer-tools.md) is now available for edge meshes.
  - [Hooks](../advanced/hooks.md) are currently not supported in local development.
- Internal authorization improvements.

## January 09, 2025

This release contains the following changes to API Mesh:

### Bug fixes

- Fixed an issue where downstream errors were not logged correctly.
- Internal efficiency improvements.
