---
title: Migration
description: This page describes breaking changes and how to migrate from one version of API Mesh for Adobe Developer App Builder to another.
---

# Migration

This page lists breaking changes between versions of API Mesh for Adobe Developer App Builder. For a list of new features and resolved issues, refer to the [release notes](release-notes.md).

To update to the latest version, run the following command:

```bash
npm install -g @adobe/aio-cli-plugin-api-mesh
```

See our [NPM page](https://www.npmjs.com/package/@adobe/aio-cli-plugin-api-mesh) or [Getting Started](getting-started.md#configure-your-environment) for more information.

## Migrating from Beta to GA

If you participated in the beta for API Mesh, you may need to account for the following breaking changes when updating to the GA release.

### Resolver Composition transform deprecated

The Resolver Composition transform (`composeResolvers`) is no longer supported.

### Hooks transform temporarily disabled

The new [Hooks transform](hooks.md) will be temporarily disabled as part of this release. We will enable this transform in a future release.

### Mesh create and update time

While most [create](command-reference.md#aio-api-meshcreate) and [update](command-reference.md#aio-api-meshupdate) commands will happen very quickly, it can take up to five minutes to fully provision and propagate your mesh.

To address this, we have added the [`aio api-mesh:status` command](command-reference.md#aio-api-meshstatus) which allows you to view where your mesh is in the provisioning process. Additionally, this command will indicate any errors associated with creating your mesh.

### CORS formatting change

The [CORS headers](headers.md#cors-headers) format has changed. As the following examples demonstrate, the `headers` object is now the `CORS` object.

**Previous format**

```json
...
  "responseConfig": {
    "headers": {
...
```

**New format**

```json
  "responseConfig": {
    "CORS": {
...
```

Additionally, the `preflightContinue` field is no longer needed and will cause an error if used. Refer to the [CORS headers](headers.md#cors-headers) example for more information.

### Update existing meshes

API Mesh now runs on updated versions of GraphQL Mesh [handlers](source-handlers.md) and [transforms](transforms.md). To move to the new codebase and enable these upgrades, update your existing meshes.

1. [Select the workspace](create-mesh.md#select-a-project-or-workspace) that contains the mesh you want to update.

1. [Retrieve](create-mesh.md#retrieve-a-previously-created-meshid) your previously created mesh by running the following [`get` command](command-reference.md#aio-api-meshget).

    ```bash
    aio api-mesh:get download.json
    ```

  This command creates a file named `download.json` that contains a copy of the mesh from the selected workspace.

1. Run the [update](create-mesh.md#update-an-existing-mesh) command and reference the previously created file.

    ```bash
    aio api-mesh:update download.json
    ```

    It can take up to five minutes for updated meshes to propagate.
