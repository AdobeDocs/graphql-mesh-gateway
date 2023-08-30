---
title: Release notes
description: This page lists changes that were made in each version of API Mesh for Adobe Developer App Builder.
---

# Release notes

The following sections indicate when updates were made to API Mesh for Adobe Developer App Builder. Refer to the [Upgrade version](upgrade.md) for more information on upgrading versions.

## August 30, 2023

This release contains the following changes to API Mesh:

### Enhancements

Due to upcoming changes in the [Adobe I/O Extensible CLI](https://developer.adobe.com/runtime/docs/guides/tools/cli_install/), the [API Mesh CLI](./getting-started.md#configure-your-environment) may encounter an `Unable to create API key` error when running an `aio api-mesh create` command on a workspace that has an existing API key. To resolve this run `aio-update` or `aio plugins:update @adobe/aio-cli-plugin-api-mesh` to ensure you have version `3.0.0` of the API Mesh plugin.

Alternatively, if updating your plugin is not an option, you can manually [delete the credential](https://developer.adobe.com/developer-console/docs/guides/credentials/#api-key) from Adobe Developer Console by navigating to **API Keys** in the appropriate workspace and clicking **Delete Credential**.

## August 17, 2023

This release contains the following changes to API Mesh:

### Enhancements

- Added support for [aliasing](./work-with-mesh.md#aliasing).
- Added internal caching improvements. You may notice improvements to response time.

## July 31, 2023

This release contains the following changes to API Mesh:

### Enhancements

- Added the [SOAP handler](../reference/handlers/soap.md) to API Mesh.
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

- Added support for automatically importing files for [local `hooks`](./hooks.md#local-composers).

## June 6, 2023

This release contains the following changes to API Mesh:

### Enhancements

Fastly headers for Adobe Commerce sources no longer prefix headers with their source name. For more information, refer to [Fastly prefixing](./headers.md#fastly-prefixing). This enhancement introduces [breaking changes](./upgrade.md#upgrading-to-the-june-1-2023-release) for a narrow use case where the modified headers were being consumed.

### Bug fixes

Resolved an issue that caused meshes to not update immediately.

## June 1, 2023

This release contains the following changes to API Mesh:

### Bug fixes

Resolved an issue that caused a "job stalled more than allowable limit" error when provisioning a mesh.

## May 16, 2023

This release contains the following changes to API Mesh:

### Enhancements

The [`hooks` plugin](./hooks.md) allows you to invoke a composable [local or remote](./hooks.md#local-vs-remote-functions) function on a targeted node.

## May 4, 2023

This release contains the following changes to API Mesh:

### Enhancements

Added several new tools for local development. We will continue to enhance developer tooling in future releases.

- Added an [`init` command](./developer-tools.md#initiate-a-local-environment) to set up a local environment.
- Enabled the use of a `.env` file to supply your mesh with [environment variables](./developer-tools.md#environment-variables).
- Added the ability to [reference local files directly](./developer-tools.md#reference-files-directly) in your mesh, which removes the need to stringify and minify file attachments.

### Bug fixes

- Resolved an issue where the `useGETForQueries` flag was not respected.
- Operational headers are now converted to `lowercase` at runtime to prevent capitalization mismatches.

## April 20, 2023

This release contains the following changes to API Mesh:

### Enhancements

- Internal autoscaling updates.

### Bug fixes

- Resolved an issue that could cause a "Module Not Found" error.

## Mar 31, 2023

This release contains the following changes to API Mesh:

### Enhancements

- Improved performance.
- Updated logging protocols to support backend server updates.

## Mar 16, 2023

This release contains the following changes to API Mesh:

### Enhancements

- Improved API Mesh performance and response times.

### Bug fixes

- Resolved an issue where `access-control-allow-origin` header would not respect the `responseConfig`.

## Feb 23, 2023

This release contains the following changes to API Mesh:

### Enhancements

- The new [`includeHTTPDetails` option](work-with-mesh.md#include-httpdetails-in-query-responses) controls whether users who query the mesh receive `httpDetails` in their responses.

### Bug fixes

- Resolved an issue that allowed meshes to have multiple `sources` with the same name.

### Breaking changes

- If your mesh has multiple sources with the same name, you will need to change them to unique names and then [update your mesh](create-mesh.md#update-an-existing-mesh).

- The `httpDetails` header has been deprecated in favor of [`includeHTTPDetails`](work-with-mesh.md#include-httpdetails-in-query-responses).

## Jan 17, 2023

We have made the following changes since the API Mesh beta:

### Enhancements

- The new [`aio api-mesh:status` command](command-reference.md#aio-api-meshstatus) allows you to:

  - View where your mesh is in the provisioning process

  - See any provisioning errors associated with your mesh

- Error messages will now contain `RequestIds`. You can provide these IDs to support when troubleshooting errors.

- Responses now include response time information for each source in your mesh.

- Use the [`httpdetails`](headers.md#retrieving-handler-details) header to see response times and other information from your source handlers.

- `nvm` 18.x.x is required to upgrade API mesh. See [Software updates](upgrade.md#software-updates) for details.

### Bug fixes

- Resolved an issue that previously prevented mesh updates from propagating.

- Mesh updates that result in errors no longer overwrite the mesh in the selected workspace.

### Breaking changes

The following [breaking changes](upgrade.md) must be addressed to make previously created meshes compatible with the new version.

- [Mesh updates](upgrade.md#update-existing-meshes) - All previously created meshes will need to be [updated](upgrade.md#update-existing-meshes) to use the new version.

- [Runtime headers](upgrade.md#runtime-headers) - Runtime headers using the `GGW-SH-` format are no longer supported. Instead, use [dynamic header values](../reference/handlers/openapi.md#headers-from-context).

- [Mesh create and update time changes](upgrade.md#mesh-create-and-update-time) - The `create` and `update` processes now run asynchronously and will typically take a few seconds to process. However, complex meshes, may take longer.

- [CORS formatting](upgrade.md#cors-formatting-change) - CORS headers format has changed.

Additionally, the beta release contained two experimental features that are not supported in the GA release:

- [composeResolvers deprecation](upgrade.md#resolver-composition-transform-deprecated) - The Resolver Composition transform has been deprecated.

- [Hook transform deprecation](upgrade.md#hooks-transform-temporarily-disabled) - The Hook transform requires additional fixes and testing. We intend to re-enable this transform in a subsequent release.
