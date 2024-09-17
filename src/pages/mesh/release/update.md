---
title: Update notice
description: This page describes the upcoming update to Legacy Mesh endpoints in favor of Edge Mesh endpoints.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Important update notice

As part of our ongoing commitment to provide you with the best possible experience, we are enhancing API Mesh's infrastructure to run at the edge in 330 global locations.

Multiple partners are already using the updated version of API Mesh and have seen significant improvements in performance and reliability.

<InlineAlert variant="info" slots="text"/>

Due to compatibility limitations, certain features, such as [hooks](../advanced/hooks.md), [SOAP handlers](../basic/handlers/soap.md), and [`replaceField` transforms](../basic/transforms/replace-field.md) are not available in edge meshes. These features will be available in a future release.

## Why the change?

- Improved response times and enhanced API performance
- Easier integration with industry-standard tools and third-party products
- Reduced potential of degraded performance caused by other hosted meshes
- Better security and compliance
- Increased observability

## What does this mean for you?

- **Continuity**: Your existing Mesh instances will continue to function until **October 15th, 2024**. You must update any application using a legacy endpoint of API Mesh by this date to ensure your application does not face any downtime.
- **Action Required**: Upgrade your [aio-cli plugin to the latest version](./upgrade.md#upgrade-versions). You will see minor changes to the CLI experience to display a new "Edge mesh" endpoint alongside your existing "Legacy mesh". This means your mesh is provisioned to the new API Mesh infrastructure. Going forward, you will need to use the "Edge mesh" endpoint for all applications to ensure functionality past the completion date. See [create a mesh](../basic/create-mesh.md#access-your-mesh-urls) for more information.

<InlineAlert variant="info" slots="text"/>

Edge meshes can take slightly longer to build than legacy meshes. Wait two or three minutes before running the `aio api-mesh: status` command. Consider using [local development](../advanced/developer-tools.md#local-development-files) for testing and development purposes.

## Fastly and edge meshes

If you intend to use Fastly, follow [Configure Fastly for edge meshes](../advanced/caching/fastly.md).

## Key Dates

Update Start Date: August 15, 2024
Expected Completion Date: October 15, 2024

If you have any questions or concerns, contact our team directly, by emailing nrobichaud@adobe.com and pganapat@adobe.com or by joining the [#app-builder-community](https://magentocommeng.slack.com/archives/C04KT43Q75K) Slack channel.

## Performance testing

When performance testing edge meshes in API Mesh, you need to account for cold starts to get an accurate measurement of the performance.

If applicable, you should use the `Connection: Keep-Alive` header described in [Optimizing edge mesh performance](../basic/create-mesh.md#optimizing-edge-mesh-performance).

Alternatively, you can manually warm the cache using the process described in [Performance testing](../best-practices/performance.md#performance-testing).
