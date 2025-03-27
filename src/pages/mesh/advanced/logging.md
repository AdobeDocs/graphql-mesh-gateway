---
title: Logging
description: Learn how to use logs for API Mesh for Adobe Developer App Builder.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Logging

API Mesh for Adobe Developer App Builder allows you to use logs to monitor and debug issues with your mesh and its sources. After [getting a list](#display-recent-requests) of recent logs by rayID, you can [look up a recent log](#display-a-single-log-by-rayid). Alternatively, you can [export logs in bulk](#export-bulk-logs) for a specific time range.

<InlineAlert variant="info" slots="text"/>

Only [edge meshes](../basic/create-mesh.md#access-your-mesh-urls) support logging.

## Display recent requests

The following command displays the 15 most recent requests by rayID and the status of those requests:

```bash
aio api-mesh:log-list 
```

By default, the requests display in YAML.

The rayID is a unique identifier that is associated with every request made through an edge mesh. After finding the relevant rayID, use the `aio api-mesh:log-get` command to retrieve the logs for that rayID.

For more information see [`aio api-mesh:log-list`](./index.md#aio-api-meshlog-list).

## Display a single log by rayID

After finding the desired rayID with the [`aio api-mesh:log-list`](#display-recent-requests) command, you can use the following command to retrieve the logs for a specific rayID:

```bash
aio api-mesh:log-get 1a123456789abcd0
```

For more information see [`aio api-mesh:log-get`](./index.md#aio-api-meshlog-get).

## Export bulk logs

Use the following command to create a CSV file with logs for the selected mesh during the specified time range. The maximum time between the `startTime` and `endTime` is 30 minutes:

```bash
aio api-mesh:log-get-bulk --startTime 2024-08-27T21:31:39Z --endTime 2024-08-27T21:55:54Z --filename mesh_logs.csv
```

The time format is `YYYY-MM-DDTHH:MM:SSZ`. You must convert your local time to UTC.

For more information see [`aio api-mesh:log-get-bulk`](./index.md#aio-api-meshlog-get-bulk).
