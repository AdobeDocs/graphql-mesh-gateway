---
title: Migration notice
description: This page describes the upcoming migration of Legacy Mesh endpoints in favor of Edge Mesh endpoints.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Important migration notice

As part of our ongoing commitment to provide you with the best possible experience, we are enhancing API Mesh's infrastructure to run at the edge in over 200 global regions.

Multiple partners are already using the updated version of API Mesh and have seen significant improvements in performance and reliability.

## Why the change?

- Improved response times and enhanced API performance
- Easier integration with industry-standard tools and third-party products
- Reduced potential of degraded performance caused by other hosted meshes
- Better security and compliance
- Increased observability

## What does this mean for you?

- **Continuity**: Your existing Mesh instances will continue to function until **October 15th, 2024**. You must migrate any application using a legacy endpoint of API Mesh by this date to ensure your application does not face any downtime.
- **Action Required**: Upgrade your [aio-cli plugin to the latest version](./upgrade.md#upgrade-versions). You will see minor changes to the CLI experience to display a new "Edge mesh" endpoint alongside your existing "Legacy mesh". This means your mesh is provisioned to the new API Mesh infrastructure. Going forward, you will need to use the "Edge mesh" endpoint for all applications to ensure functionality past the migration date. See [create a mesh](../basic/create-mesh.md#access-your-mesh-urls) for more information.

<InlineAlert variant="info" slots="text"/>

Edge meshes can take slightly longer to build than legacy meshes. Wait two or three minutes before running the `aio api-mesh: status` command. Consider using [local development](../advanced/developer-tools.md#local-development-files) for testing and development purposes.

## Key Dates
<!-- need to add date and contact info -->

Migration Start Date: TBD
Expected Completion Date: TBD

If you have any questions or concerns, reach out to our team directly by email at [contact].
