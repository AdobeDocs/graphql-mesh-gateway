---
title: Command Reference
description: A description of the CLI commands available for API Mesh for Adobe Developer App Builder.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Command Reference

API Mesh for Adobe Developer App Builder CLI allows you to manage and modify meshes. This page covers commands exclusive to API Mesh. For authorization and other Adobe I/O Extensible CLI commands, refer to the [Adobe IO CLI command list](https://github.com/adobe/aio-cli#commands). For installation instructions, refer to [Getting Started](../basic/index.md).

## aio api-mesh:init

Creates a [local development environment](./developer-tools.md#create-a-local-environment). You only need to run this command if you want to set up a local environment.

### Usage

```bash
aio api-mesh:init PROJECTNAME [-p <value>] [-m npm|yarn] [-g y|n] [--help]
```

### Flags

The following arguments are all optional. If you do not supply them, the terminal response will prompt you for the information.

`-p` or `--path` allows you to specify the location to set up the local environment.

`-g` or `--git` is a binary argument that requires `Y` or `N` to determine if you want to use `git` for your local environment.

`-m` or `--packageManager` is a binary argument that requires `npm` or `yarn` to determine which package manager to use for the local environment. (Requires [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).)

`--help` provides information on the specified command.

#### Example

The following example creates the environment in the `mesh_examples` subdirectory of the current directory with `git` enabled and the package manager set to `yarn`:

  ```bash
  aio api-mesh:init myMesh --path ./mesh_examples --git Y --package-manager yarn
  ```

### Response

```terminal
Local workspace created successfully
```

## aio api-mesh:run

[Deploys a mesh locally](./developer-tools.md#create-a-local-environment). You only need to run this command if you want to work with your mesh locally for testing. Run `aio api-mesh:init` before running this command.

### Usage

```bash
aio api-mesh:run [FILE] [-p <value>] [--debug] [-e <value>] [-c] [--select] [-s <value>] [--help]
```

### Flags

The following arguments are all optional.

`-p` or `--port` allows you to specify the port number for your local environment. The default is `5000`.

`-s` or `--secrets` allows you to specify the path to secrets file.

`--select` deploys the mesh artifact in the selected workspace without rebuilding it. The select command will not download [secrets](./secrets.md) as artifacts. To use secrets with the `--select` flag, combine it with the `--secrets` flag and provide a local file that contains your secrets.

  ```bash
  aio api-mesh:run mesh.json --select --secrets secrets.yaml
  ```

`--debug` enters debug mode. To debug in an IDE such as Visual Studio Code, add the following configuration to your `launch.json` file:

  ```json
  {
    "name": "Debug Mesh",
    "port": 9229,
    "request": "attach",
    "skipFiles": ["<node_internals>/**"],
    "type": "node"
  }
  ```

`--help` provides information on the specified command.

For more information on debugging, see the [`node.js` Inspector documentation.](https://nodejs.org/en/docs/inspector#inspector-clients)

#### Example

The following example runs the mesh locally at port `9000`.

  ```bash
  aio api-mesh:run mesh.json -p 9000
  ```

### Response

```terminal
Starting server on port : 5000
Server is running on http://localhost:5000/graphql
```

## aio api-mesh:create

Creates a new mesh based on the settings in the specified `JSON` file in your working directory. After creating your mesh, you will receive a `meshId`, like `12a3b4c5-6d78-4012-3456-7e890fa1bcde`, to refer to it in the future. For more information, see [Creating a mesh](../basic/create-mesh.md).

<InlineAlert variant="info" slots="text"/>

You only need to run the `create` command once. For subsequent changes to your mesh, use the [`update` command](#aio-api-meshupdate).

### Usage

```bash
aio api-mesh:create [FILE] [-i] [-c] [--json] [-e <value>] [-s <value>] [--help]
```

### Arguments

`FILE` The JSON file that contains your mesh's handlers and transforms.

### Flags

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to create a mesh in a different workspace. You can also manually [modify the cache](../basic/work-with-mesh.md#projects-and-workspaces).

`-c` or `--autoConfirmAction` automatically confirms the mesh creation instead of prompting the user to confirm.

`--json` outputs the `json` of the created mesh.

`-e` or `--env` allows you to provide an environment variables file. Refer to [developer tools](./developer-tools.md#environment-variables) for more information.

`--secrets [FILE]` allows you to provide a separate YAML file that defines your [secrets](./secrets.md).

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:create mesh.json
```

#### Response

```terminal
Your mesh is being provisioned. Wait a few minutes before checking the status of your mesh: 12a3b4c5-6d78-4012-3456-7e890fa1bcde
To check the status of your mesh, run:

aio api-mesh:status
```

## aio api-mesh:update

Updates the mesh for the workspace you select based on the settings specified in the `JSON` file. For more information, see [Updating a mesh](../basic/create-mesh.md#update-an-existing-mesh).

### Usage

```bash
aio api-mesh:update [FILE] [-i] [-c] [-e <value>] [-s <value>] [--help]
```

### Arguments

`FILE` The JSON file that contains your mesh's handlers and transforms.

### Flags

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to update a mesh in a different workspace. You can also manually [modify the cache](../basic/work-with-mesh.md#projects-and-workspaces).

`-c` or `--autoConfirmAction` automatically confirms the mesh update instead of prompting the user to confirm.

`-e` or `--env` allows you to provide an environment variables file. Refer to [developer tools](./developer-tools.md#environment-variables) for more information.

`-s` or `--secrets [FILE]` allows you to provide a separate YAML file that defines your [secrets](./secrets.md).

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:update mesh.json
```

#### Response

```terminal
Your mesh is being provisioned. Wait a few minutes before checking the status of your mesh 12a3b4c5-6d78-4012-3456-7e890fa1bcde
To check the status of your mesh, run:
aio api-mesh:status
```

## aio api-mesh:status

Retrieves the current status of your create or update command.

<InlineAlert variant="info" slots="text"/>

If your mesh is taking too long to build, consider using [local development](./developer-tools.md#create-a-local-environment).

### Example

```bash
aio api-mesh:status
```

#### Response

Four possible responses reflect the status of your mesh:

- Success - Your mesh was successfully created or updated.

  ```terminal
  Mesh was built successfully.
  ```

- Pending - Your mesh is queued and awaiting processing.

  ```terminal
  Pending: Mesh is awaiting processing.
  ```

- Building - Our servers are currently processing your mesh.

  ```terminal
  Pending: Mesh is currently building. Wait a few minutes before checking again.
  ```

- Error - Your mesh encountered an error.

  ```terminal
  Mesh build has errors.
  RequestId: 1234567890
  ```

## aio api-mesh:get

Retrieves the current `JSON` mesh file for the workspace you select. Any [secrets](secrets.md) you defined when creating the mesh are not included in the response.

### Usage

```bash
aio api-mesh:get [FILE] [-i] [--json] [--help]
```

### Arguments
  
`DOWNLOAD` (Optional) specify the local filename to create from the mesh.

### Flags

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to retrieve a mesh from a different workspace. You can also manually [modify the cache](../basic/work-with-mesh.md#projects-and-workspaces).

`--json` outputs the file as JSON.

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:get
```

#### Response

```terminal
Successfully retrieved mesh {
  "lastUpdated": "2022-06-01T12:12:12.0000",
  "meshConfig": {
    "sources": [
      {
        "name": "Commerce",
        "handler": {
          "graphql": {
            "endpoint": "https://<your_commerce_site>/graphql/"
          }
        }
      },
      {
        "name": "AEM",
        "handler": {
          "graphql": {
            "endpoint": "https://<your_AEM_site>/endpoint.json"
          }
        }
      },
      {
        "name": "LiveSearch",
        "handler": {
          "graphql": {
            "endpoint": "https://<your_commerce_site>/search/graphql",
            "operationHeaders": {
              "Magento-Store-View-Code": "default",
              "Magento-Website-Code": "base",
              "Magento-Store-Code": "main_website_store",
              "Magento-Environment-Id": "<your_environment_id>",
              "x-api-key": "search_gql",
              "Content-Type": "application/json"
            },
            "schemaHeaders": {
              "Magento-Store-View-Code": "default",
              "Magento-Website-Code": "base",
              "Magento-Store-Code": "main_website_store",
              "Magento-Environment-Id": "<your_environment_id>",
              "x-api-key": "search_gql",
              "Content-Type": "application/json"
            }
          }
        }
      }
    ]
  },
  "meshId": "12a3b4c5-6d78-4012-3456-7e890fa1bcde",
  "lastUpdatedBy": {
    "firstName": "User",
    "lastName": "Name",
    "userEmail": "uname@domain.com",
    "userId": "A4BF2F3C61FC531A0A494210@AdobeID",
    "displayName": "User%20Name"
  },
  "meshStatus": "success",
}
```

## aio api-mesh:delete

Deletes the mesh from the selected workspace.

### Usage

```bash
aio api-mesh:delete [-i] [-c] [--help]
```

### Flags

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to delete a mesh from a different workspace. You can also manually [modify the cache](../basic/work-with-mesh.md#projects-and-workspaces).

`-c` or `--autoConfirmAction` automatically confirms the mesh deletion instead of prompting the user to confirm.

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:delete
```

### Response

```terminal
Successfully deleted 12a3b4c5-6d78-4012-3456-7e890fa1bcde
```

## aio api-mesh:describe

Describes the mesh for the selected workspace.

### Usage

```bash
aio api-mesh:describe [-i] [--help]
```

### Flags

`-i` or`--ignoreCache` ignores the cached organization, project, and workspace, which allows you to get the description of a different workspace. You can also manually [modify the cache](../basic/work-with-mesh.md#projects-and-workspaces).

`--help` provides information on the specified command

### Response

```terminal
Selected organization: my-org
Selected project: test-project
Select workspace: Stage
Successfully retrieved mesh details 

Org ID: 123456789
Project ID: 1234567890123456789
Workspace ID: 2345678901234567890
Mesh ID: 12a3b4c5-6d78-4012-3456-7e890fa1bcde
Mesh Endpoint: https://edge-graph.adobe.io/api/123456-123-456-789-1234567890/graphql
```

## aio api-mesh:source:discover

Lists all available sources. Select a source to view its configuration file and copy its content to your clipboard. You can also view available sources directly in the [api-mesh-sources](https://github.com/adobe/api-mesh-sources/tree/main/connectors) repository.

<InlineAlert variant="info" slots="text"/>

Sources are prebuilt mesh configuration files that are formatted for a specific combination of handlers. Each source contains a mesh configuration file designed for a specific first or third-party source. Third parties can submit their sources as a pull request to the [api-mesh-sources](https://github.com/adobe/api-mesh-sources) repository. See [Create a mesh from a source](../basic/create-mesh.md#create-a-mesh-from-a-source) for more information.

### Usage

```bash
aio api-mesh:source:discover [--help]
```

### Flags

`--help` provides information on the specified command.

### Response

```terminal
[
  {
      "name": "Adobe Commerce Compare List",
      "version": "0.0.2",
      "description": "Source to get information about Compare list",
      "author": "Adobe team",
      "provider": {
          "name": "Commerce",
          "handler": {
            "graphql": {
              "endpoint": "https://venia.magento.com/graphql/"
            }
          },
          "transforms": [
            {
              "rename": {
                "mode": "bare | wrap",
                "renames": [
                  {
                    "from": {
                      "type": "Query",
                      "field": "compareList"
                    },
                    "to": {
                      "type": "Query",
                      "field": "productCompareList"
                    }
                  }
                ]
              }
            },
            {
              "filterSchema": {
                "mode": "bare | wrap",
                "filters": [
                  "Query.!category",
                  "Query.!customerOrders",
                  "Query.!urlResolver",
                  "Query.!wishlist"
                ]
              }
            },
          ]
        }
  }
]
```

## aio api-mesh:source:get

Prints the specified source's mesh file and allows you to copy it to the clipboard.

<InlineAlert variant="info" slots="text"/>

Sources are prebuilt mesh configuration files that are formatted for a specific combination of handlers. Each source contains a mesh configuration file designed for a specific first or third-party source. Third parties can submit their sources as a pull request to the [api-mesh-sources](https://github.com/adobe/api-mesh-sources) repository. See [Create a mesh from a source](../basic/create-mesh.md#create-a-mesh-from-a-source) for more information.

### Usage

```bash
aio api-mesh:source:get [-s <value>] [-m] [--help]
```

### Flags

`-s` or `--source` (required) allows you to specify the name of the source you want to copy.
`-m` or `--multiple` allows you to add multiple sources, which are returned in an array.
`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:source:get -s "AEM Assets API"
```

With multiple sources:

```bash
aio api-mesh:source:get -m -s "AEM Assets API" -s "Adobe Target API"
```

### Response

```terminal
[
  {
      "name": "AEM Assets API",
      "version": "0.0.2",
      "description": "A source for the AEM Assets API",
      "author": "Adobe team",
      "provider": {
          "name": "Commerce",
          "handler": {
            "graphql": {
              "endpoint": "https://venia.magento.com/graphql/"
            }
          },
          "transforms": [
            {
              "rename": {
                "mode": "bare | wrap",
                "renames": [
                  {
                    "from": {
                      "type": "Query",
                      "field": "compareList"
                    },
                    "to": {
                      "type": "Query",
                      "field": "productCompareList"
                    }
                  }
                ]
              }
            },
            {
              "filterSchema": {
                "mode": "bare | wrap",
                "filters": [
                  "Query.!category",
                  "Query.!customerOrders",
                  "Query.!urlResolver",
                  "Query.!wishlist"
                ]
              }
            },
            {
              "cache": [
                {
                  "field": "Query.storeConfig",
                  "invalidate": {
                    "ttl": 3600
                  }
                }
              ]
            }
          ]
        }
  }
]
```

## aio api-mesh:source:install

The `install` command adds the specified source to the currently selected workspace's mesh configuration.

<InlineAlert variant="info" slots="text"/>

Sources are prebuilt mesh configuration files that are formatted for a specific combination of handlers. Each source contains a mesh configuration file designed for a specific first or third-party source. Third parties can submit their sources as a pull request to the [api-mesh-sources](https://github.com/adobe/api-mesh-sources) repository. See [Create a mesh from a source](../basic/create-mesh.md#create-a-mesh-from-a-source) for more information.

### Usage

```bash
aio api-mesh:source:install "<source_name>"
```

To install a specific version of a source, use the following command:

```bash
aio api-mesh:source:install [SOURCE] [-v <value>] [-f <value>] [-i] [--help]
```

The two variable flags, `-v` and `-f`, described in the following section, allow you to automatically replace any of the variables defined in the source that you are installing with your values.

When using the `-f` or `--variable-file` flag, you must specify the variables in a separate file. The following example defines the variable file formatting:

```json
{
"ENDPOINT_URL": "https://venia.magento.com/graphql"
}
```

### Flags

`-v` or `--variable` specifies the values of any variables defined in the `variables` array of the mesh configuration file for the source. Use commas to separate multiple variables.

`-f` or `--variable-file` specifies a file location that contains variables to use in the mesh configuration file for the source. The file must be in `.json` format.

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to install a source in a different workspace.

`--help` provides information on the specified command.

### Example

```bash
aio api-mesh:source:install "AEM Assets API"
```

With a variable:

```bash
aio api-mesh:source:install "AEM Assets API" -v ENDPOINT_URL:https://venia.magento.com/graphql
```

With a variable file:

```bash
aio api-mesh:source:install "AEM Assets API" -f documents/my_variables.json
```

Install a specific version:

```bash
aio api-mesh:source:install "AEM Assets API"@0.0.1
```

### Response

```bash
Successfully updated the mesh with the id: MESH_ID
```

## aio api-mesh:log-list

The `log-list` command lists the most recent requests for your mesh by rayID. By default, the command shows the 15 most recent requests.

### Usage

```bash
aio api-mesh:log-list [-i] [--filename <value>] [--help]
```

### Flags

The following arguments are optional:

`--filename` allows you to download a CSV list of rayIDs with the specified filename. This flag exports all requests from the last 15 minutes.

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to make new selections. You can also manually [modify the cache](../basic/work-with-mesh.md#projects-and-workspaces).

`--help` provides information on the specified command.

### Response

```terminal
Selected organization: <ORG_NAME>
Selected project: <PROJECT_NAME>
Select workspace: <WORKSPACE_NAME>
 Ray id           Timestamp      Response status Level          
 ──────────────── ────────────── ─────────────── ────────────── 
 1a123456789abcd1 1724766278577  200             log            
 1a123456789abcd2 1724766287188  200             log            
 1a123456789abcd3 1724766286997  200             log            
 1a123456789abcd4 1724766280810  200             error
 ```

## aio api-mesh:log-get

After finding the desired rayID with the [`aio api-mesh:log-list` command](#aio-api-meshlog-list), you can use the following command to retrieve the logs for a specific rayID:

### Usage

```bash
aio api-mesh:log-get RAYID [-i] [--help]
```

### Flags

The following arguments are optional.

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to make new selections. You can also manually [modify the cache](../basic/work-with-mesh.md#projects-and-workspaces).

`--help` provides information on the specified command.

#### Example

The following example gets the log for the `1a123456789abcd0` rayID:

```bash
aio api-mesh:log-get 1a123456789abcd0
```

### Response

```terminal
EventTimestampMs : 1724660422500
Exceptions : []
Logs : [{'Level': 'log', 'Message': ['[object Object]'], 'TimestampMs': 1724660422580}, {'Level': 'log', 'Message': ['{"sources":[{"name":"venia","handler":{"graphql":{"useGETForQueries":true,"endpoint":"https://venia.magento.com/graphql","operationHeaders":{"x-test-header":"{context.headers[\'x-test-header\']}"}}}}],"responseConfig":{"includeHTTPDetails":true},"additionalResolvers":[],"plugins":[{"httpDetailsExtensions":{}}]}'], 'TimestampMs': 1724660422500}]
Outcome : ok
MeshId : 12a3b4c5-6d78-4012-3456-7e890fa1bcde
RayId : 1a123456789abcd0
MeshUrl : https://edge-graph.adobe.io/api/REDACTED/graphql
RequestMethod : POST
RequestStatus : 200 
```

## aio api-mesh:log-get-bulk

The `log-get-bulk` command creates a CSV file with logs for the selected mesh during the specified time range. The maximum time range is 30 minutes and only logs from the last 30 days are accessible.

### Usage

```bash
aio api-mesh:log-get-bulk [--startTime <value>] [--endTime <value>] [--filename <value>] [--past <value>] [--from <value>] [-i] [--help]
```

### Flags

The following arguments are required:

`--startTime` the start time for log collection in the format `YYYY-MM-DDTHH:MM:SSZ`. You must convert your local time to UTC.

`--endTime` the end time for log collection in the format `YYYY-MM-DDTHH:MM:SSZ`. You must convert your local time to UTC.

`--filename` specifies the name of the file to output the logs to.

`--past` specifies the number of minutes in the past to get logs. The maximum value is `30mins`.

`--from` specifies the number of minutes before a specific time to get logs. The maximum value is `30mins`.

The following arguments are optional:

`-i` or `--ignoreCache` ignores the cached organization, project, and workspace, which allows you to make new selections. You can also manually [modify the cache](../basic/work-with-mesh.md#projects-and-workspaces).

`--help` provides information on the specified command.

#### Example

The following example bulk downloads logs as a file named `mesh_logs.csv` for the specified time range:

```bash
aio api-mesh:log-get-bulk --startTime 2024-08-27T21:31:39Z --endTime 2024-08-27T21:55:54Z --filename mesh_logs.csv
```

### Response

```terminal
Expected file size is 500 KB. Confirm mesh_logs.csv download? (y/n)`
...
Successfully downloaded the logs to mesh_logs.csv.
```

The downloaded file will look similar to [this example](../../_examples/bulk-logs.csv).
