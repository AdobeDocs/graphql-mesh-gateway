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

The following sections list updates to API Mesh for Adobe Developer App Builder. Refer to the [Upgrade version](upgrade.md) for more information on upgrading.

## November 04, 2024

This release contains the following changes to API Mesh:

### Enhancements

- [`beforeAll` hooks](../advanced/hooks.md) now work with [edge meshes](../basic/create-mesh.md#access-your-mesh-urls). <!-- CEXT-2904 >
- Enhancements to performance and stability. <!-- various tickets>
- The `source` field is now available for GraphQL handlers, allowing you to [provide an introspection file](../basic/handlers/graphql.md#provide-an-introspection-file). <!-- CEXT-3760 >

### Bug fixes

- Resolved an issue that caused meshes with `openapi` handlers to send the wrong content type header when working with the Adobe Commerce REST API. <!-- CEXT-3661 >

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

After updating your mesh, the `aio api-mesh describe` command contains both a legacy mesh endpoint and an edge mesh endpoint. Legacy meshes will be removed later this year.

<InlineAlert variant="info" slots="text"/>

If you have an allowlist, add the [edge mesh IP addresses](https://www.cloudflare.com/ips/).

<InlineAlert variant="info" slots="text"/>

If you intend to use Fastly, follow [Configure Fastly for edge meshes](../advanced/caching/fastly.md).

The following commands will take slightly longer to complete. Consider using [local development](../advanced/developer-tools.md#local-development-files) for testing and development purposes:

- `aio api-mesh create`
- `aio api-mesh update`
- `aio api-mesh delete`

<InlineAlert variant="info" slots="text"/>

Due to compatibility limitations, certain features, such as [hooks](../advanced/hooks.md), [SOAP handlers](../basic/handlers/soap.md), and [`replaceField` transforms](../basic/transforms/replace-field.md) are not available in edge meshes. These features will be available in a future release.

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

## April 23, 2024

This release contains the following changes to API Mesh:

### Bug fixes

Resolved an issue that could cause operation headers to be exposed as query string parameters in the source URL when `useGETForQueries` was set to `true`.

## April 04, 2024

This release contains the following changes to API Mesh:

### Bug fixes

Resolved an issue that prevented resolvers from updating when updating a mesh.

## January 30, 2024

This release contains the following changes to API Mesh:

### Bug fixes

Resolved a `MODULE_NOT_FOUND` error in the `@adobe/aio-cli-plugin-api-mesh` CLI. If you encounter this error, upgrade to version `3.2.2 (latest)`.

<InlineAlert variant="info" slots="text"/>

To update to the newest version of the CLI, run `aio update` or `aio plugins:install @adobe/aio-cli-plugin-api-mesh`.

## January 11, 2023

This release contains the following changes to API Mesh:

### Enhancements

- A `--select` argument is now available for the [`run` command](../advanced/index.md#aio-api-meshrun). By providing the `--select` argument, you can run a mesh based on the mesh artifact in the selected workspace instead of rebuilding the mesh.

- Various improvements to server performance.

## November 14, 2023

This release contains the following changes to API Mesh:

### Enhancements

- Internal monitoring and optimization upgrades.

<InlineAlert variant="info" slots="text"/>

Due to an internal upgrade, to get CORS response headers when querying your mesh, you must provide an `origin` request header with the origin URL as the value. For example, `origin: https://graph.adobe.io`.

### Bug fixes

- Resolved an issue in the CLI where using the `aio api-mesh get --json` command in a workspace with no mesh configuration would return an inconsistent error.

<InlineAlert variant="info" slots="text"/>

To update to the newest version of the CLI, run `aio update` or `aio plugins:install @adobe/aio-cli-plugin-api-mesh`.

## October 18, 2023

This release contains the following changes to API Mesh:

### Bug fixes

Performance fixes.

## October 09, 2023

This release contains the following changes to API Mesh:

### Enhancements

A [`run` command](../advanced/index.md#aio-api-meshrun) beta is now available, which allows you to [create a local API Mesh environment](../advanced/developer-tools.md#create-a-local-environment) for development and testing purposes. The `run` command works in concert with the [`init` command](../advanced/index.md#aio-api-meshinit) and [environment variables](../advanced/developer-tools.md#environment-variables) to provide more robust developer tooling.

<InlineAlert variant="info" slots="text"/>

Beta features may not be fully supported.

To update to the newest version of the CLI, run `aio update` or `aio plugins:install @adobe/aio-cli-plugin-api-mesh`.

## September 21, 2023

This release contains the following changes to API Mesh:

### Enhancements

- [GraphQL aliasing](https://graphql.org/learn/queries/) is now enabled.
  - As a part of this enhancement, several [handler](../basic/handlers/index.md) and [transform](../basic/transforms/index.md) packages have been updated.

## August 30, 2023

This release contains the following changes to API Mesh:

### Enhancements

Due to upcoming changes in the [Adobe I/O Extensible CLI](https://developer.adobe.com/runtime/docs/guides/tools/cli_install/), the [API Mesh CLI](../basic/index.md#configure-your-environment) may encounter an `Unable to create API key` error when running an `aio api-mesh create` command on a workspace that has an existing API key. To resolve this run `aio update` or `aio plugins:install @adobe/aio-cli-plugin-api-mesh` to ensure you have version `3.0.0` of the API Mesh plugin.

Alternatively, if updating your plugin is not an option, you can manually [delete the credential](https://developer.adobe.com/developer-console/docs/guides/credentials/#api-key) from Adobe Developer Console by navigating to **API Keys** in the appropriate workspace and clicking **Delete Credential**.

## August 17, 2023

This release contains the following changes to API Mesh:

### Enhancements

- Added support for [aliasing](../basic/work-with-mesh.md#aliasing).
- Added internal caching improvements. You may notice improvements to response time.

## July 31, 2023

This release contains the following changes to API Mesh:

### Enhancements

- Added the [SOAP handler](../basic/handlers/soap.md) to API Mesh.
  - The SOAP handler is experimental and should not be used in production deployments.
- Added internal logging improvements.

### Bug fixes

- Removed a configuration option that was enabled but not supported.
- Resolved a `500 Internal Server Error` that could occur when deleting a mesh.
- Resolved a `400 Bad Request` that could occur when updating a mesh.

## June 29, 2023

This release contains the following changes to API Mesh:

### Bug fixes

- A previous release introduced an issue that could cause unnecessary delays on GraphQL requests. This issue has been resolved and could result in improved performance.

## June 27, 2023

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an issue where error details from GraphQL sources appeared as a generic error. API Mesh now forwards the error details from the GraphQL source.

## June 15, 2023

This release contains the following changes to API Mesh:

### Enhancements

- Added support for automatically importing files for [local `hooks`](../advanced/hooks.md#local-composers).
