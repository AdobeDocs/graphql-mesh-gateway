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

### Export bulk logs with a relative time range

You can use the `--past` flag to specify the number of minutes in the past to get logs. The maximum value is `30`.

```bash
aio api-mesh:log-get-bulk --past 30 --filename mesh_logs.csv
```

## Log forwarding

<InlineAlert variant="warning" slots="text"/>

Log forwarding is an experimental feature and may not function as expected.

Log forwarding allows you to forward logs from API Mesh to a user-owned third-party service.

Using a third-party service allows you to control throttling, log size limits, and log retention policies.

### Set up log forwarding

1. Run the following command to set up log forwarding:

  ```bash
  aio api-mesh:config:set:log-forwarding
  ```

1. Select your log forwarding destination from the list of available options. (Currently, only New Relic is supported.)

1. Enter the base URI. Base URIs vary by region. If you do not know your New Relic instance's region, refer to the browser URL of your New Relic home page:

   - URLs beginning with `https://one.newrelic.com/` should use the `https://log-api.newrelic.com/log/v1` URI format.
   - URLs beginning with `https://one.eu.newrelic.com/` should use the `https://log-api.eu.newrelic.com/log/v1` URI format.

1. Enter the license key. You can get this from the New Relic API keys screen, using the **INGEST - LICENSE API** key type.

<InlineAlert variant="info" slots="text"/>

API Mesh supports both the 32-character and 40-character New Relic license keys.

### Get the log forwarding configuration

To retrieve an existing log forwarding configuration, run the following command:

```bash
aio api-mesh:config:get:log-forwarding
```

For security reasons, the license key is not displayed in the output.

### Delete the log forwarding configuration

To delete the log forwarding configuration, and effectively disable log forwarding, run the following command:

```bash
aio api-mesh:config:delete:log-forwarding
```

### Get log forwarding errors

To get a list of the last 10 log forwarding errors, use the following command:

```bash
aio api-mesh:config:get:log-forwarding errors
```

## Logging dashboard

If you are using New Relic, you can import the logging dashboard to your New Relic account.

1. Go to the [New Relic One](https://one.newrelic.com/) home page.

1. Click the **Dashboards** icon in the left navigation.

1. Click the **Import** button.

1. Select the `logging.json` file and click **Import**.

For more information see [Import a dashboard](https://docs.newrelic.com/docs/query-your-data/explore-query-data/dashboards/manage-your-dashboard/#dash-json).

The [example dashboard](#example-dashboard) displays: request count, request method, request method aggregate, worker logs, and access logs. You can alternatively use the following queries:

<CodeBlock slots="heading, code" repeat="2" languages="graphql, json" />

#### Query mesh logs

```sql
SELECT `Exceptions`, `Logs` as Logs, `RayID` as RayId, `Request.Method`, `Request.URL`, `Response.Status`, `ScriptTags`, `meshId` as meshId, logtype FROM Log SINCE 7 days ago ORDER by timestamp DESC LIMIT MAX WHERE meshId = '' AND ('' = '' OR RayID = '') and logtype = 'mesh_logs'
```

#### Query access logs

```sql
FROM Log SELECT ClientIP AS 'Client IP', RayID, ClientDeviceType AS 'Device', ClientRequestMethod AS 'Method', ClientRequestURI AS 'URI', EdgeColoCode AS 'Edge', EdgeServerIP AS 'Edge IP', ClientRequestSource AS 'Request Source', CacheCacheStatus AS 'Cache Status', EdgeResponseStatus AS 'Response Status', EdgeResponseBytes AS 'Response Bytes', EdgeResponseContentType AS 'Content Type', OriginResponseStatus AS 'Origin Response', OriginIP, WorkerCPUTime, WorkerWallTimeUs WHERE CacheCacheStatus IS NOT NULL AND ClientRequestSource != 'edgeWorkerCacheAPI' AND ('' = '' OR RayID = '') and meshId = '' and logtype = 'access_logs'
```

### Example dashboard

```json
{
  "name": "Log forwarding test stage",
  "description": null,
  "permissions": "PUBLIC_READ_WRITE",
  "pages": [
    {
      "name": "Mesh Details",
      "description": null,
      "widgets": [
        {
          "title": "Request Count",
          "layout": {
            "column": 1,
            "row": 1,
            "width": 4,
            "height": 3
          },
          "linkedEntityGuids": null,
          "visualization": {
            "id": "viz.line"
          },
          "rawConfiguration": {
            "facet": {
              "showOtherSeries": false
            },
            "legend": {
              "enabled": true
            },
            "markers": {
              "displayedTypes": {
                "criticalViolations": false,
                "deployments": true,
                "relatedDeployments": true,
                "warningViolations": false
              }
            },
            "nrqlQueries": [
              {
                "accountIds": [
                  3371751
                ],
                "query": "SELECT count(*)\nFROM Log\nWHERE logtype = 'mesh_logs' AND `meshId` = {{mesh_id}}\nSINCE 7 days ago\nTIMESERIES\nLIMIT MAX"
              }
            ],
            "platformOptions": {
              "ignoreTimeRange": false
            },
            "thresholds": {
              "isLabelVisible": true
            },
            "yAxisLeft": {
              "zero": true
            },
            "yAxisRight": {
              "zero": true
            }
          }
        },
        {
          "title": "Request Method Over Time",
          "layout": {
            "column": 5,
            "row": 1,
            "width": 4,
            "height": 3
          },
          "linkedEntityGuids": null,
          "visualization": {
            "id": "viz.line"
          },
          "rawConfiguration": {
            "facet": {
              "showOtherSeries": false
            },
            "legend": {
              "enabled": true
            },
            "markers": {
              "displayedTypes": {
                "criticalViolations": false,
                "deployments": true,
                "relatedDeployments": true,
                "warningViolations": false
              }
            },
            "nrqlQueries": [
              {
                "accountIds": [
                  3371751
                ],
                "query": "WITH `Request.Method` as requestMethod\nSELECT count(*)\nFROM Log\nFACET requestMethod\nWHERE `logtype` = 'mesh_logs' AND `meshId` = {{mesh_id}}\nSINCE 7 days ago\nTIMESERIES\nLIMIT MAX\n"
              }
            ],
            "platformOptions": {
              "ignoreTimeRange": false
            },
            "thresholds": {
              "isLabelVisible": true
            },
            "yAxisLeft": {
              "zero": true
            },
            "yAxisRight": {
              "zero": true
            }
          }
        },
        {
          "title": "Request Method Aggregate",
          "layout": {
            "column": 9,
            "row": 1,
            "width": 4,
            "height": 3
          },
          "linkedEntityGuids": null,
          "visualization": {
            "id": "viz.table"
          },
          "rawConfiguration": {
            "facet": {
              "showOtherSeries": false
            },
            "nrqlQueries": [
              {
                "accountIds": [
                  3371751
                ],
                "query": "WITH `Request.Method` AS requestMethod, `Response.Status` as responseStatus\nSELECT count(*)\nFROM Log\nFACET requestMethod, responseStatus\nSINCE 7 days ago\nWHERE requestMethod is NOT NULL AND `meshId` = {{mesh_id}}"
              }
            ],
            "platformOptions": {
              "ignoreTimeRange": false
            }
          }
        },
        {
          "title": "Worker Logs",
          "layout": {
            "column": 1,
            "row": 4,
            "width": 12,
            "height": 4
          },
          "linkedEntityGuids": null,
          "visualization": {
            "id": "viz.table"
          },
          "rawConfiguration": {
            "facet": {
              "showOtherSeries": false
            },
            "nrqlQueries": [
              {
                "accountIds": [
                  3371751
                ],
                "query": "SELECT `Exceptions`, `Logs` as Logs, `RayID` as RayId, `Request.Method`, `Request.URL`, `Response.Status`, `ScriptTags`, `meshId` as meshId, logtype\nFROM Log\nSINCE 7 days ago\nORDER by timestamp DESC\nLIMIT MAX\nWHERE meshId = {{mesh_id}} AND ({{ray_id}} = '' OR RayID = {{ray_id}}) and logtype = 'mesh_logs' --AND (RayId = '92c8e9ce78c65a1a')"
              }
            ],
            "platformOptions": {
              "ignoreTimeRange": false
            }
          }
        },
        {
          "title": "Access Logs",
          "layout": {
            "column": 1,
            "row": 8,
            "width": 12,
            "height": 3
          },
          "linkedEntityGuids": null,
          "visualization": {
            "id": "logger.log-table-widget"
          },
          "rawConfiguration": {
            "nrqlQueries": [
              {
                "accountIds": [
                  3371751
                ],
                "query": "FROM Log SELECT ClientIP AS 'Client IP', RayID, ClientDeviceType AS 'Device', ClientRequestMethod AS 'Method', ClientRequestURI AS 'URI', EdgeColoCode AS 'Edge', EdgeServerIP AS 'Edge IP', ClientRequestSource AS 'Request Source', CacheCacheStatus AS 'Cache Status', EdgeResponseStatus AS 'Response Status', EdgeResponseBytes AS 'Response Bytes', EdgeResponseContentType AS 'Content Type', OriginResponseStatus AS 'Origin Response', OriginIP, WorkerCPUTime, WorkerWallTimeUs WHERE CacheCacheStatus IS NOT NULL AND ClientRequestSource != 'edgeWorkerCacheAPI' AND ({{ray_id}}='' OR RayID = {{ray_id}}) and meshId = {{mesh_id}} and logtype = 'access_logs'\n"
              }
            ]
          }
        }
      ]
    }
  ],
  "variables": [
    {
      "name": "mesh_id",
      "items": null,
      "defaultValues": [],
      "nrqlQuery": null,
      "options": {},
      "title": "Mesh ID",
      "type": "STRING",
      "isMultiSelection": null,
      "replacementStrategy": "STRING"
    },
    {
      "name": "ray_id",
      "items": null,
      "defaultValues": [],
      "nrqlQuery": null,
      "options": {},
      "title": "Ray ID",
      "type": "STRING",
      "isMultiSelection": null,
      "replacementStrategy": "STRING"
    }
  ]
}
```
