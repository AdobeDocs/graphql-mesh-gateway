---
title: Secrets management
description: Learn how to manage secrets for API Mesh for Adobe Developer App Builder.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Secrets management

API Mesh for Adobe Developer App Builder allows you to manage secrets or variables for a mesh. You can use these secrets in your mesh configuration file to securely manage sensitive information. When creating or updating a mesh, you can provide a separate file that defines your secrets. API Mesh encrypts secrets using AES 512-bit encryption.

For security purposes, you cannot receive the secrets once you define them when creating or updating a mesh. For example, running an `aio api-mesh get` command returns your mesh with the values defined within the mesh configuration file, such as `{context.secrets.SECRET}` and does not return the actual secret's value.

## Create a `secrets.yaml` file

Create a `secrets.yaml` file that contains your secrets. You can modify the file name as necessary. Secrets management only supports the `yaml` and `yml` file extensions. The file should be in the following format:

```yaml
secret: "secret-value"
```

The following example contains a Bash command as a value for the `TOKEN` secret. API Mesh supports Bash commands with or without brackets, such as `$TOKEN` or `$[TOKEN]`.

<InlineAlert variant="info" slots="text"/>

Bash commands are not supported in Windows environments.

```yaml
AEM: 
  TOKEN: $TOKEN
  AEMUSERNAME: "user-name"
  adminname: "admin-name"

API_KEY: ${COMMERCE_API_KEY}

<InlineAlert variant="warning" slots="text"/>

You cannot escape the `$` character in secrets files. This means that a secret's value cannot contain `$`, unless it is part of a Bash command.

## Add secrets to your mesh configuration file

Once you have created your `secrets.yaml` file, you can reference the secrets in your mesh configuration file using the following format:

<!-- if this example isn't valid, we need to replace it with another very simple example. -->

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Adobe Commerce",
        "handler": {
          "graphql": {
            "endpoint": "venia.magento.com/graphql",
            "operationHeaders": {
              "secret": "{context.secrets.<secret-name>}"
            }
          }
        }
      }
    ],
  }
}
```

For more complex use cases, see [Examples](#examples).

## Create or update your mesh secrets

When you create or update a mesh that you want to include secrets in, add the `--secrets` flag followed by the path to your secrets file. If you do not provide the secrets file when updating a mesh that has secrets, the secrets` values are overwritten by their literal references.

<CodeBlock slots="heading, code" repeat="2" languages="bash, bash" />

#### Create

```bash
aio api-mesh create mesh.json --secrets secrets.yaml
```

#### Update

```bash
aio api-mesh update mesh.json --secrets secrets.yaml
```

Your mesh now contains the secrets defined in your `secrets.yaml` file.

## Examples

The following examples demonstrate different use cases in which using secrets management is beneficial.

### Header reflection

The following example mesh configuration uses a header reflection service to demonstrate how you can pass your secrets as headers. This can be useful to test and debug your configuration.

<InlineAlert variant="warning" slots="text"/>

Do not use sensitive data with this example, since it is designed to display your secrets as headers.

The **JSON file** tab contains a more readable version of the JSON file that appears in the mesh in the `files` object.

<CodeBlock slots="heading, code" repeat="3" languages="json, yaml, json" />

#### `mesh.json`

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "headersData",
        "handler": {
          "JsonSchema": {
            "baseUrl": "<header-reflection-service>",
            "operations": [
              {
                "type": "Query",
                "field": "data",
                "path": "/",
                "method": "GET",
                "responseSchema": "./getHeadersSchema.json"
              }
            ],
            "operationHeaders": {
              "secretHeader": "{context.secrets.API_KEY}",
              "secretAEMHeader": "{context.secrets.AEM.TOKEN}"
            }
          }
        }
      }
    ],
    "files": [
      {
        "path": "./getHeadersSchema.json",
        "content": "{\"$schema\":\"http://json-schema.org/draft-07/schema#\",\"type\":\"object\",\"required\":[\"headerKeys\",\"headerValues\",\"headers\"],\"properties\":{\"headerKeys\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}},\"headerValues\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}},\"headers\":{\"type\":\"object\"}}}"
      }
    ]
  }
}
```

#### `secrets.yaml`

```yaml
AEM: 
  TOKEN: "my-token"
  AEMUSERNAME: "user-name"
  adminname: "admin-name"

API_KEY: $COMMERCE_API_KEY
```

#### JSON file

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "headerKeys",
    "headerValues",
    "headers"
  ],
  "properties": {
    "headerKeys": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "headerValues": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "headers": {
      "type": "object"
    }
  }
}
```

Use the following GraphQL query to retrieve the headers:

<CodeBlock slots="heading, code" repeat="2" languages="json, json" />

#### GraphQL

```graphql
{
  data {
    headers
  }
}
```

#### Response

```json
{
  "data": {
    "data": {
      "headers": {
        "accept-encoding": "gzip, br",
        "cf-connecting-ip": "0.0.0.0",
        "cf-ipcountry": "US",
        "cf-ray": "abc123abc123",
        "cf-visitor": "{\"scheme\":\"https\"}",
        "connection": "Keep-Alive",
        "host": "header-reflection-service",
        "secretaemeader": "abcabcdefdefxyzxyz",
        "secretheader": "\\/root",
        "x-forwarded-proto": "https",
        "x-real-ip": "0.0.0.0"
      }
    }
  },
  "extensions": {}
}
```

### Authorization

The following example provides a simple authorization test. This mesh only returns a valid response, if the `TOKEN` in the `secrets.yaml` file is also passed as an authorization header in the request. If the token does not match, the mesh will return an unauthorized error.

The **JavaScript file** tab contains a more readable version of the Javascript that appears in the mesh in the `files` object.

<CodeBlock slots="heading, code" repeat="3" languages="json, yaml, javascript" />

#### `mesh.json`

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Commerce",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      }
    ],
    "plugins": [
      {
        "hooks": {
          "beforeAll": {
            "composer": "./hooks.js#isAuth",
            "blocking": true
          }
        }
      }
    ],
    "files": [
      {
        "path": "./hooks.js",
        "content": "module.exports = {\r\n  isAuth: ({ context }) => {\r\n    const { headers, secrets } = context;\r\n\r\n    if (headers.authorization != secrets.TOKEN) {\r\n      return {\r\n        status: \"ERROR\",\r\n        message: \"Unauthorized\",\r\n      };\r\n    } else {\r\n      return {\r\n        status: \"SUCCESS\",\r\n        message: \"Authorized\",\r\n      };\r\n    }\r\n  },\r\n};\r\n"
      }
    ]
  }
}
```

#### `secrets.yaml`

```yaml
TOKEN: "abcabcdefdefxyzxyz"
```

#### JavaScript file

```javascript
module.exports = {
    isAuth: ({
        context
    }) => {
        const {
            headers,
            secrets
        } = context;

        if (headers.authorization != secrets.TOKEN) {
            return {
                status: "ERROR",
                message: "Unauthorized",
            };
        } else {
            return {
                status: "SUCCESS",
                message: "Authorized",
            };
        }
    },
};
```

After adding the token from the `secrets.yaml` file to your authorization header, run the following query:

<CodeBlock slots="heading, code" repeat="3" languages="json, json, json" />

#### Query

```graphql
{
  storeConfig {
    base_Url
  }
}
```

#### Authorized response

```json
{
  "data": {
    "storeConfig": {
      "base_url": "cache_url"
    }
  },
  "extensions": {}
}
```

#### Unauthorized response

```json
{
  "data": null,
  "errors": [
    "Unauthorized"
  ]
}
```
