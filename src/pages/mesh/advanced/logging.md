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

## Log forwarding

Log forwarding allows you to forward logs from API Mesh to a user-owned third-party service.

Using a third-party service allows you to control throttling, log size limits, and log retention policies.

### Set up log forwarding

1. Run the following command to set up log forwarding:

  ```bash
  aio api-mesh config set log-forwarding
  ```

1. Select your log forwarding destination from the list of available options. (Currently, only New Relic is supported.)

1. Enter the base URI. Base URIs vary by region. If you do not know your New Relic instance's region, refer to the browser URL of your New Relic home page:

   - URLs beginning with `https://one.newrelic.com/` should use the `https://log-api.newrelic.com/log/v1` URI format.
   - URLs beginning with `https://one.eu.newrelic.com/` should use the `https://log-api.eu.newrelic.com/log/v1` URI format.

1. Enter the license key. You can get this from the New Relic API keys screen, using the **INGEST - LICENSE API** key type.

1. If the license key is not valid, you see an error message.

1. If the license key is valid, you see a success message.

### Get the log forwarding configuration

To retrieve an existing log forwarding configuration, run the following command:

```bash
aio api-mesh:config get log-forwarding
```

### Delete the log forwarding configuration

To delete the log forwarding configuration, and effectively disable log forwarding, run the following command:

```bash
aio api-mesh:config delete log-forwarding
```
