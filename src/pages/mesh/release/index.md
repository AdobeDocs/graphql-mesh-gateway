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

## December 10, 2024

This release contains the following changes to API Mesh:

### Enhancements

- Internal logging improvements.

### Bug fixes

- Resolved an issue where [creating a mesh from a template](../basic/create-mesh.md#create-a-mesh-from-a-template) caused an error.

## December 05, 2024

This release contains the following changes to API Mesh:

### Enhancements

- We have removed the SOAP handler because it is not compatible with edge meshes.
- You can now pass a maximum of 500 headers to your mesh.
- Security improvements.

## December 03, 2024

This release contains the following changes to API Mesh:

### Enhancements

- Edge meshes are now the only available mesh option. Legacy meshes are no longer available.

## November 25, 2024

This release contains the following changes to API Mesh:

### Enhancements

- Added a configuration option allowing you to [disable introspection](../basic/work-with-mesh.md#disable-introspection) on your mesh for security purposes.

### Bug fixes

- Resolved an error where specific special characters in a Project, Workspace, or Organization name could cause issues with provisioning.

## November 19, 2024

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an issue where special characters in an Org, Project, or Workspace name could cause a provisioning error.
- Resolved an issue where fetching a source with multiple `set-cookie` headers caused an unexpected server error.

## November 04, 2024

This release contains the following changes to API Mesh:

### Enhancements

- [`beforeAll` hooks](../advanced/hooks.md) now work with [edge meshes](../basic/create-mesh.md#access-your-mesh-urls).
- The `source` field is now available for GraphQL handlers, allowing you to [provide an introspection file](../basic/handlers/graphql.md#provide-an-introspection-file).
- Enhancements to performance and stability.

## October 03, 2024

This release contains the following changes to API Mesh:

### Enhancements

Added a success message when you use the [`aio api-mesh log-list`](../advanced/index.md#aio-api-meshlog-list) command with the `--filename` flag that confirms file creation.

## October 01, 2024

This release contains the following changes to API Mesh:

### Enhancements

- Added the ability to run scheduled performance tests on your edge mesh. For more information, see [schedule performance testing](../advanced/developer-tools.md#schedule-performance-testing).
- Increased the edge mesh query timeout from `30` seconds to `60` seconds.

### Bug fixes

- Resolved an issue where the `aio api-mesh log list --filename` command would return an error if the filename included special characters.
- Resolved an issue that caused `500` errors when using a `GET` request with a body.

## September 26, 2024

This release contains the following changes to API Mesh:

### Enhancements

Edge logging - API Mesh now supports detailed logging for [edge meshes](../release/update.md). See [Logging](../advanced/logging.md) for more information. You will need to [update your CLI](../release/upgrade.md#upgrade-versions) to the latest version to access the new commands.

## September 24, 2024

This release contains the following changes to API Mesh:

### Enhancements

Improved performance during cold starts for edge meshes. For previously created meshes, you must run the `aio api-mesh update` command on your edge mesh before you can benefit from this enhancement.

## August 15, 2024

This release contains the following changes to API Mesh:

### Enhancements

API Mesh at the Edge - The current API Mesh architecture uses a standard configuration spread across multiple regions. To improve response times and provide better benefits to our users, we are introducing edge deployment for meshes. Edge meshes exist closer to your data sources, which reduces latency and generally improves the user experience by making meshes more performant. Edge meshes provide the following benefits:

With API Mesh on the edge:

- Improved response times and enhanced API performance
- Easier integration with industry-standard tools and third-party products
- Reduced potential of other hosted meshes degrading the performance of your mesh
- Better security and compliance
- Increased observability

Adobe recommends using edge meshes for the best performance. Refer to [Access your mesh URLs](../basic/create-mesh.md#access-your-mesh-urls) for more information.

<InlineAlert variant="info" slots="text"/>

If you have an allowlist, add the [edge mesh IP addresses](https://www.cloudflare.com/ips/).

<InlineAlert variant="info" slots="text"/>

If you intend to use Fastly, follow [Configure Fastly for edge meshes](../advanced/caching/fastly.md).

The following commands will take slightly longer to complete. Consider using [local development](../advanced/developer-tools.md#local-development-files) for testing and development purposes:

- `aio api-mesh create`
- `aio api-mesh update`
- `aio api-mesh delete`

<InlineAlert variant="info" slots="text"/>

Due to compatibility limitations, certain features, such as [hooks](../advanced/hooks.md), SOAP handlers, and [`replaceField` transforms](../basic/transforms/replace-field.md) are not available in edge meshes.

<InlineAlert variant="info" slots="text"/>

With the update to edge, API Mesh no longer requires API keys.

### Performance testing

When performance testing edge meshes in API Mesh, you need to account for cold starts to get an accurate measurement of the performance.

If applicable, you should use the `Connection: keep-alive` header described in [Optimizing edge mesh performance](../basic/create-mesh.md#optimizing-edge-mesh-performance).

Alternatively, you can manually warm the cache using the process described in [Performance testing](../best-practices/performance.md#performance-testing).

## August 06, 2024

This release contains the following changes to API Mesh:

- You can now escape the `$` character in [secrets](../advanced/secrets.md) files by using a backslash (`\`). For example, `SECRET: \$SECRET`.
- Improved error handling when secrets contained in a mesh configuration are not found in the associated secrets `yaml` file.

### Bug fixes

- Resolved an issue where the selected Org, Project, and Workspace were not saved between CLI commands.
- Resolved a `CANNOT FIND MODULE` error that could occur when using the `aio api-mesh run` command.

## July 22, 2024

This release contains the following changes to API Mesh:

### Enhancements

- API Mesh now supports including secrets in your mesh configuration file. For more information, see [Secrets management](../advanced/secrets.md).
- Several new files are available in [local development](../advanced/developer-tools.md#local-development-files) after running the `aio api-mesh init` command. These files enhance the developer experience and facilitate future enhancements.

### Bug fixes

- Fixed an issue where multiple `Set-Cookie` response headers could be concatenated in a single response.
- Equals signs (`=`) are now allowed in [environment variables](../advanced/developer-tools.md#environment-variables).

## May 21, 2024

This release contains the following changes to API Mesh:

### Bug fixes

Resolved an unexpected error that could occur when implementing [CI/CD](../best-practices/cicd.md).
