---
title: Command Reference
description: A description of the CLI commands available for Adobe API Manager.
---

# Command Reference

The Adobe API Manager CLI allows you to manage and modify meshs. This page covers commands exclusive to Adobe API Manager. For authorization and other Adobe I/O Extensible CLI commands, refer to the [Adobe IO CLI command list]. For installation instructions, refer to [Getting Started].

All commands on this page support the `--help` argument, which provides information about the command.

## aio api-manager:mesh:create

Creates a new mesh based on the settings in the specified `JSON` file in your working directory. The `meshId` key value in your `JSON` file determines the name for your mesh. For more information, see [Creating a mesh].

### Usage

```bash
aio api-manager:mesh:create [FILE]
```

### Arguments

  FILE    The JSON file that contains your mesh's handlers and transforms

### Example

```bash
aio api-manager:mesh:create mesh.json
```

#### Response

```terminal
Start create mesh
Selecting your organization as: my-organization-name
Initialized user login and the selected organization
OrgCode - createMesh: 27E41B3246BEC9B16E398115@MyOrg
here
Successfully created a mesh with the ID: meshId1234 and imsOrgCode: 27E41B3246BEC9B16E398115@MyOrg
```

## aio api-manager:mesh:update

Updates an existing mesh based on the settings in the specified `JSON` file. For more information, see [Updating a mesh].

<InlineAlert variant="info" slots="text"/>

You cannot modify the `meshId` when updating a mesh.

### Usage

```bash
aio api-manager:mesh:update [MESHID] [FILE]
```

### Arguments

  MESHID  The name of the existing meshId that you want to update
  FILE      The JSON file that contains your mesh's handlers and transforms

### Example

```bash
aio api-manager:mesh:update mesh1 mesh.json
```

#### Response

```terminal
Selecting your organization as: my-organization-name
Initialized user login and the selected organization
OrgCode - updateMesh: 27E41B3246BEC9B16E398115@MyOrg
204
Successfully updated the mesh with the id: meshId1234
```

## aio api-manager:mesh:get

Retrieves the current `JSON` mesh file for the specified mesh.

### Usage

```bash
aio api-manager:mesh:get [MESHID]
```

### Arguments

  MESHID  The name of the existing meshId that you want to view

### Example

```bash
aio api-manager:mesh:get meshId1234
```

#### Response

```terminal
get meshId1234
Selecting your organization as: my-organization-name
Initialized user login and the selected organization
OrgCode - getMesh: 27E41B3246BEC9B16E398115@MyOrg
Config : [object Object]
{"imsOrgId":"27E41B3246BEC9B16E398115@MyOrg","lastUpdated":"1234123412341","meshConfig":{"sources":[{"name":"Commerce","handler":{"graphql":{"endpoint":"https://<your_commerce_site>/graphql/"}}},{"name":"AEM","handler":{"graphql":{"endpoint":"https://<your_AEM_site>/endpoint.json"}}},{"name":"LiveSearch","handler":{"graphql":{"endpoint":"https://<your_commerce_site>/search/graphql","operationHeaders":{"Magento-Store-View-Code":"default","Magento-Website-Code":"base","Magento-Store-Code":"main_website_store","Magento-Environment-Id":"<your_environment_id>","x-api-key":"search_gql","Content-Type":"application/json"},"schemaHeaders":{"Magento-Store-View-Code":"default","Magento-Website-Code":"base","Magento-Store-Code":"main_website_store","Magento-Environment-Id":"<your_environment_id>","x-api-key":"search_gql","Content-Type":"application/json"}}}}]},"meshId":"meshId1234","lastUpdatedBy":{"firstName":"User","lastName":"Name","userEmail":"uname@domain.com","userId":"undefined","displayName":"User%20Name"}}
```

<!-- Link Definitions -->
[Getting Started]: getting-started.md
[Adobe IO CLI command list]: https://github.com/adobe/aio-cli#commands
[Creating a mesh]: create-mesh.md
[Updating a mesh]: create-mesh.md#update_an_existing_mesh
