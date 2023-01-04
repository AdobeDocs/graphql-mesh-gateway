---
title: Release notes
description: This page lists changes that were made in each version of API Mesh for Adobe Developer App Builder.
---

# Release notes

The following sections indicate when updates were made to API Mesh for Adobe Developer App Builder. Refer to the [Migration page](migration.md) for more information on upgrading versions.

## Jan 15, 2023

We have made the following changes since the API Mesh beta:

### Enhancements

- The new [Hooks transform](hooks.md) allows you to invoke composable functions.
- The new [`aio api-mesh:status` command](command-reference.md#aio-api-meshstatus) allows you to: <!-- the target of the link above is added in PR #75 -->
  - View where your mesh is in the provisioning process
  - See any provisioning errors associated with your mesh
- Error messages will now contain `RequestIds`. You can provide these IDs to support when troubleshooting errors.
- Responses now include response time information.

### Bug Fixes

- Resolved an issue that previously prevented mesh updates from propagating.
- Mesh updates that result in errors no longer overwrite the mesh in the selected workspace.
