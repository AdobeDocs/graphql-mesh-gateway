---
title: Release notes
description: This page lists changes for each version of API Mesh for Adobe Developer App Builder.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

<Fragment src="../../includes/update-notice.md"/>

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

## September 01, 2026

This release contains the following changes to API Mesh:

### Bug fixes

- Improved error handling for rejections caused by exceeding a configured query limit.
- Resolved an issue that could causes errors when running `aio api-mesh init`.

## June 03, 2026

This release contains the following changes to API Mesh:

### Enhancements

- Added [`queryConfig`](../advanced/query-config.md), a new top-level mesh configuration object that allows you to harden your mesh against oversized, abusive, or schema-probing GraphQL queries. All protections are disabled by default. Supported controls include: \<!-- CEXT-5692, CEXT-5693, CEXT-5694 --\>
  - [`blockFieldSuggestion`](../advanced/query-config.md#blockfieldsuggestion) - Suppresses hints in error responses to prevent schema enumeration.
  - [`costLimit`](../advanced/query-config.md#costlimit) - Rejects queries whose computed cost exceeds the configured maximum.
  - [`maskErrors`](../advanced/query-config.md#maskerrors) - Replaces unintentional resolver errors with a generic message so internal details are not leaked to clients.
  - [`maxAliases`](../advanced/query-config.md#maxaliases) - Limits the number of aliases used in a single query.
  - [`maxDepth`](../advanced/query-config.md#maxdepth) - Limits the nesting depth of incoming queries.
  - [`maxDirectives`](../advanced/query-config.md#maxdirectives) - Limits the number of directives used in a single query.
  - [`maxTokens`](../advanced/query-config.md#maxtokens) - Limits the total number of GraphQL tokens parsed per query.

## May 14, 2026

This release contains the following changes to API Mesh:

### Enhancements

- Added support for referencing a local `.graphql` schema file directly from a [`graphql` handler's `source` field](../basic/handlers/graphql.md#provide-an-introspection-file). The file is automatically resolved and attached to your mesh, so large schemas can be stored separately instead of being embedded in your mesh configuration.

## April 28, 2026

This release contains the following changes to API Mesh:

### Bug fixes

- **Local Secrets Now Support JSON-Encoded Values** - The local `aio api-mesh run` command now properly handles JSON-encoded secret values in the same way the deployed tenant worker does.

## March 30, 2026

This release contains the following changes to API Mesh:

### Enhancements

- Added support for `.graphql` files in [`additionalTypeDefs`](../advanced/extend/index.md), allowing you to reference `.graphql` files instead of using inline type definition strings.

## March 23, 2026

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an issue with [secrets management](../advanced/secrets.md) that could affect secret processing for certain data types.

## January 07, 2026

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an issue where the Developer Console UI incorrectly displayed a status of "Provisioning" for successfully deployed meshes.

## December 03, 2025

This release contains the following changes to API Mesh:

### Enhancements

- Added a [prompting guide](../basic/prompting.md) to generate API Mesh configurations using AI prompting techniques.

## December 01, 2025

This release contains the following changes to API Mesh:

### Bug fixes

- Resolved an intermittent issue where provisioning context state that could cause a `Context state is not configured for this mesh` error.
- Resolved a possible `TypeError` that could lead to `500` errors when your mesh is experiencing heavy traffic.
