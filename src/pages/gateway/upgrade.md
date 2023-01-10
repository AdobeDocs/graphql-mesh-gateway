---
title: Upgrade Versions
description: This page describes breaking changes and how to migrate from one version of API Mesh for Adobe Developer App Builder to another.
---

# Upgrade versions

This page lists breaking changes between versions of API Mesh for Adobe Developer App Builder. For a list of new features and resolved issues, refer to the [release notes](release-notes.md).

## Software updates

If you are upgrading from a beta release to GA, you must update to `nvm` 18.x.x and update the mesh code.

1. Update `nvm` to version 18. The following command shows one way to do this:

   ```bash
   nvm use 18
   ```

1. Update the API Mesh for Adobe Developer plugin.

   To update Adobe I/O and all registered plugins, run the following command:

   ```bash
   aio update
   ```

  To update the API Mesh for Adobe Developer App Builder plug only, run the following command:

   ```bash
   npm install -g @adobe/aio-cli-plugin-api-mesh
   ```

See our [NPM page](https://www.npmjs.com/package/@adobe/aio-cli-plugin-api-mesh) or [Getting Started](getting-started.md#configure-your-environment) for more information.

## Upgrading

You must modify any previously created meshes to account for the following breaking changes when updating to the new release.

### Deprecated experimental features

The beta release contained two experimental features that are not supported in the GA release.

- The Resolver Composition transform has been deprecated and is no longer supported.
- The Hook transform requires additional fixes and testing. We intend to re-enable this transform in a subsequent release.

#### Resolver Composition transform deprecated

The Resolver Composition transform (`composeResolvers`) is no longer supported.

Remove any instances of `composerResolvers` from your mesh before running a [create](command-reference.md#aio-api-meshcreate) or [update](command-reference.md#aio-api-meshupdate) command.

#### Hooks transform temporarily disabled

We have temporarily disabled the [Hooks transform](hooks.md). Hooks will return in an upcoming release.

Remove any `Hook` transforms from your mesh before running a [create](command-reference.md#aio-api-meshcreate) or [update](command-reference.md#aio-api-meshupdate) command.

### Runtime headers

Runtime headers that use the following format are now deprecated:

```bash
GGW-SH-<SourceName>-<HeaderName>
```

Instead, use the following methods:

-  [OpenAPI handlers](../reference/handlers/openapi.md#headers-from-context)
-  [GraphQL handlers](../reference/handlers/graphql.md#headers-from-context)
-  [JSON schema handlers](../reference/handlers/json-schema.md#headers-from-context)

### Mesh create and update time

While most [create](command-reference.md#aio-api-meshcreate) and [update](command-reference.md#aio-api-meshupdate) commands will take a few seconds, complex meshes and meshes with several sources will take a few minutes to fully provision and propagate.

To check the status of your mesh, use the [`aio api-mesh:status` command](command-reference.md#aio-api-meshstatus), which allows you to view where your mesh is in the provisioning process.

Additionally, due to our new asynchronous architecture, the create/update commands now add your mesh to a queue where it waits to be processed, which means you will no longer receive an error if your mesh fails to create/update. We have added the [`aio api-mesh:status` command](command-reference.md#aio-api-meshstatus) to allow you to check the processing status of your mesh and see any errors that occurred during creating/updating.

### CORS formatting change

The [CORS headers](headers.md#cors-headers) format has changed. As the following examples demonstrate, the `headers` object is now the `CORS` object.

**Previous format**

```json
...
  "responseConfig": {
    "headers": {
    ...
    }
  }
```

**New format**

```json
  "responseConfig": {
    "CORS": {
    ...
    }
  }
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

    It can take a few minutes to fully provision and propagate your mesh.
