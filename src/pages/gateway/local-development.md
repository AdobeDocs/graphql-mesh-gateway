---
title: Local development
description: Learn how to create a local development environment for API Mesh.
---

# Local development

The `aio api-mesh:init` command allows you to build a local development environment at the specified location.

1. Run the following command.

    ```
    aio api-mesh:init <project-name>
    ```

1. Select the folder to install the dev environment in.

1. Indicate if you want to use `git`. (Requires [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).)

1. Indicate if you want to use Node Package Manager (`npm`) or `yarn`. (Requires [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).)

The console indicates that the local environment installed successfully.

<InlineAlert variant="info" slots="text"/>

Most of these steps can be automated using flags described in the [command reference](./command-reference.md#aio-api-meshinit).
