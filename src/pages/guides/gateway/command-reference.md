---
title: Command Reference
description: A description of the CLI commands available for Adobe Graph.
---

# Command Reference

The Adobe Graph CLI allows you to manage and modify tenants. This page covers commands exclusive to Adobe Graph. For authorization and other Adobe I/O Extensible CLI commands, refer to the [Adobe IO CLI command list]. For installation instructions, refer to [Getting Started].

All commands on this page support the `--help` argument, which provides information about the command.

-  [aio commerce-gateway:tenant:create](aio_commerce-gateway:tenant:create)
-  [aio commerce-gateway:tenant:update](#aio_commerce-gateway:tenant:update)
-  [aio commerce-gateway:tenant:get](#aio_commerce-gateway:tenant:get)

## aio commerce-gateway:tenant:create

Creates a new tenant based on the settings in the specified `JSON` file in your working directory. The `tenantId` key value in your `JSON` file determines the name for your tenant. For more information, see [Creating a tenant].

### Usage

```bash
aio commerce-gateway:tenant:create [FILE]
```

### Arguments

  FILE    The JSON file that contains your mesh's handlers and transforms

### Example

```bash
aio commerce-gateway:tenant:create mesh.json
```

#### Response

```terminal
Start create tenant
Selecting your organization as: my-organization-name
Initialized user login and the selected organization
OrgCode - createTenant: 27E41B3246BEC9B16E398115@MyOrg
here
Successfully created a tenant with the ID: tenantId1234 and imsOrgCode: 27E41B3246BEC9B16E398115@MyOrg
```

## aio commerce-gateway:tenant:update

Updates an existing tenant based on the settings in the specified `JSON` file. For more information, see [Updating a tenant].

<InlineAlert variant="info" slots="text"/>

You cannot modify the `tenantId` when updating a tenant.

### Usage

```bash
aio commerce-gateway:tenant:update [TENANTID] [FILE]
```

### Arguments

  TENANTID  The name of the existing tenantId that you want to update
  FILE      The JSON file that contains your mesh's handlers and transforms

### Example

```bash
aio commerce-gateway:tenant:update tenant1 mesh.json
```

#### Response

```terminal
Selecting your organization as: my-organization-name
Initialized user login and the selected organization
OrgCode - updateTenant: 27E41B3246BEC9B16E398115@MyOrg
204
Successfully updated the tenant with the id: tenantId1234
```

## aio commerce-gateway:tenant:get

Retrieves the current `JSON` mesh file for the specified tenant.

### Usage

```bash
aio commerce-gateway:tenant:get [TENANTID]
```

### Arguments

  TENANTID  The name of the existing tenantId that you want to view

### Example

```bash
aio commerce-gateway:tenant:update tenant1 mesh.json
```

#### Response

```terminal
get tenantId1234
Selecting your organization as: my-organization-name
Initialized user login and the selected organization
OrgCode - getTenant: 27E41B3246BEC9B16E398115@MyOrg
Config : [object Object]
{"imsOrgId":"27E41B3246BEC9B16E398115@MyOrg","lastUpdated":"1234123412341","meshConfig":{"sources":[{"name":"Commerce","handler":{"graphql":{"endpoint":"https://<your_commerce_site>/graphql/"}}},{"name":"AEM","handler":{"graphql":{"endpoint":"https://<your_AEM_site>/endpoint.json"}}},{"name":"LiveSearch","handler":{"graphql":{"endpoint":"https://<your_commerce_site>/search/graphql","operationHeaders":{"Magento-Store-View-Code":"default","Magento-Website-Code":"base","Magento-Store-Code":"main_website_store","Magento-Environment-Id":"<your_environment_id>","x-api-key":"search_gql","Content-Type":"application/json"},"schemaHeaders":{"Magento-Store-View-Code":"default","Magento-Website-Code":"base","Magento-Store-Code":"main_website_store","Magento-Environment-Id":"<your_environment_id>","x-api-key":"search_gql","Content-Type":"application/json"}}}}]},"tenantId":"tenantId1234","lastUpdatedBy":{"firstName":"User","lastName":"Name","userEmail":"uname@domain.com","userId":"undefined","displayName":"User%20Name"}}
```

<!-- Link Definitions -->
[Getting Started]: getting-started.md
[Adobe IO CLI command list]: https://github.com/adobe/aio-cli#commands
[Creating a tenant]: create-tenant.md
[Updating a tenant]: create-tenant.md#update_an_existing_tenant
