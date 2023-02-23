---
title: Release notes
description: This page lists changes that were made in each version of API Mesh for Adobe Developer App Builder.
---

# Release notes

The following sections indicate when updates were made to API Mesh for Adobe Developer App Builder. Refer to the [Upgrade version](upgrade.md) for more information on upgrading versions.

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
