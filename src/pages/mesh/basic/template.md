---
title: Create a mesh from a template
description: Use the prebuilt template to quickly create and test a mesh.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Create a mesh from a template

API Mesh for Adobe Developer App Builder provides a straightforward way to [create a mesh](create-mesh.md). Alternatively, you can create a mesh from a template, which avoids most of the installation and setup steps required for a traditionally created mesh.

## Clone the repository

From the [API Mesh template repository](https://github.com/adobe-commerce/api-mesh-starter-kit/), click the **Use this template** button to create a new repository based on the template.

## Create a project and workspace

In the Adobe Developer Console, create a project and workspace and add the API Mesh API to it. [Create your project and workspace](./work-with-mesh.md#projects-and-workspaces).

## Configure secrets

In the Developer Console, click the **Download** button in the top-right corner of the Project Overview page.

In your cloned repository, add the following [configuration variables](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository) from the JSON file.

| Variable name in GitHub | Name defined in downloaded JSON |
| ---------- | ------- |
| CLIENTID | `client_id` |
| CLIENTSECRET | `client_secret` |
| TECHNICALACCOUNTID | `technical_account_email` |
| TECHNICALACCOUNTEMAIL | `technical_account_id` |
| IMSORGID | `ims_org_id` |
| ORGID | `project` > `org` > `id` |
| PROJECTID | `project` > `id` |
| WORKSPACEID | `project` > `workspace` > `id` |

## Test your mesh in the GitHub Codespace

<InlineAlert variant="info" slots="text"/>

When working with codespaces, make sure to follow Github's [security best practices](https://docs.github.com/en/codespaces/reference/security-in-github-codespaces).

After configuring your variables, click the **Code** dropdown in your repository and select the **Codespaces** tab. Click **Create Codespace**. The codespace will automatically set up the environment for you.

Once your codespace loads, and the `yarn start` command completes, click the **Ports** tab in the bottom panel. Since portforwarding is automatically enabled, you can query the mesh over the internet. Click the link in the **Forwarded Address** column. This page should give you a `404` error. You need to add `/graphql` to the URL to access the GraphQL playground. Your link should look like the following:

`https://name-for-site-123456abc-5000.app.github.dev/graphql`

<InlineAlert variant="info" slots="text" repeat="2"/>

Do not use this URL for production purposes. Instead, use the endpoint provided when [publishing](#modify-and-publish-your-mesh).

This URL is accessible over the internet based on the permissions of your repository and whether the server is running or not. For example, if your repository is private, users will need to log in to access the URL. If your repository is public, users can access the URL without logging in.

Now test the following query by adding it to the query window and clicking the **Play** (Execute Query) button:

```graphql
{
  storeConfig {
    store_code
  }
}
```

You should receive a response from the Adobe Commerce API configured in your `.env` file (by default this is [Venia](https://venia.magento.com), Commerce's reference storefront):

```json
{
  "data": {
    "storeConfig": {
      "store_code": "default"
    }
  },
  "extensions": {}
}
```

## Modify and publish your mesh

Either modify your `mesh.json` file or the `.env` file to add or replace your Commerce source. Alternatively, you can replace your mesh configuration file with a mesh from the [code samples repository](https://github.com/adobe/adobe-commerce-samples/tree/main/api-mesh).

Then use the **Source Control** tab in your Codespace to commit your changes. Once you commit your changes, the GitHub Actions will automatically update the deployed mesh.

After you publish your mesh, you can access it using the URL provided listed in the **Describe** section of the **Deploy Mesh** step in the GitHub Actions output.

## Files in the template repository

- `mesh.json` - The mesh configuration file, which contains a sample mesh with a single source.
- `.env` - The environment file that contains variables for the mesh configuration file.
- `package.json` - The dependencies and scripts to test and deploy your mesh.
- `.vscode/launch.json` - A VS Code configuration to allow debugging in VS Code or in GitHub Codespaces.
- `.devcontainer/devcontainer.json` - Codespace's configuration for the development. This configuration helps set up packages and build the mesh automatically. It also configures port-forwarding, so you can use any GraphQL interface to interact with the mesh.
- `.github/workflows/deployMesh.yml` - A GitHub workflow to automatically publish the mesh config whenever you commit a change to the `main` branch.
