---
title: Upgrade Versions
description: This page describes breaking changes and how to migrate from one version of API Mesh for Adobe Developer App Builder to another.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
  - Upgrade
---

# Upgrade versions

This page lists breaking changes between versions of API Mesh for Adobe Developer App Builder. For a list of new features and resolved issues, refer to the [release notes](release-notes.md).

## Software updates

`nvm` 18 is required for API Mesh.

1. Update `nvm` to version 18. The following command shows one way to do this:

   ```bash
   nvm use 18
   ```

1. Update the API Mesh plugin.

   To update Adobe I/O and all registered plugins, run the following command:

   ```bash
   aio update
   ```

  To update the API Mesh plugin only, run the following command:

   ```bash
   aio plugins:install @adobe/aio-cli-plugin-api-mesh
   ```

If you encounter any issues installing the plugin, try uninstalling any existing plugins first by running `aio plugins:uninstall`. The `aio plugins` command will list any installed plugins.

See our [NPM page](https://www.npmjs.com/package/@adobe/aio-cli-plugin-api-mesh) or [Getting Started](getting-started.md#configure-your-environment) for more information.

### Mesh create and update time

While most [create](command-reference.md#aio-api-meshcreate) and [update](command-reference.md#aio-api-meshupdate) commands will take a few seconds, complex meshes and meshes with several sources will take a few minutes to fully provision and propagate.

To check the status of your mesh, use the [`aio api-mesh:status` command](command-reference.md#aio-api-meshstatus), which allows you to view where your mesh is in the provisioning process.

Additionally, due to our new asynchronous architecture, the create/update commands now add your mesh to a queue where it waits to be processed, which means you will no longer receive an error if your mesh fails to create/update. We have added the [`aio api-mesh:status` command](command-reference.md#aio-api-meshstatus) to allow you to check the processing status of your mesh and see any errors that occurred during creating/updating.
<!-- 
### Update existing meshes

API Mesh now runs on updated versions of GraphQL Mesh [handlers](source-handlers.md) and [transforms](transforms.md). To move to the new codebase and enable these upgrades, update your existing meshes.

1. [Select the workspace](work-with-mesh.md#select-a-project-or-workspace) that contains the mesh you want to update.

1. [Retrieve](work-with-mesh.md#retrieve-a-previously-created-meshid-or-mesh-endpoint-url) your previously created mesh by running the following [`get` command](command-reference.md#aio-api-meshget).

    ```bash
    aio api-mesh:get download.json
    ```

  This command creates a file named `download.json` that contains a copy of the mesh from the selected workspace.

1. Run the [update](create-mesh.md#update-an-existing-mesh) command and reference the previously created file.

    ```bash
    aio api-mesh:update download.json
    ```

    It can take a few minutes to fully provision and propagate your mesh. -->
