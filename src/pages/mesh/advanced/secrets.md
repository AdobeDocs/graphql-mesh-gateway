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

API Mesh for Adobe Developer App Builder allows you to manage secrets for a mesh. You can use these secrets in your mesh configuration file to securely manage sensitive information. When creating or updating a mesh, you can provide a separate file that defines your secrets. API Mesh encrypts secrets using AES 512-bit encryption.

For security purposes, you cannot receive the secrets once you define them when creating or updating a mesh. For example, running an `aio api-mesh get` command returns your mesh with the values defined within the mesh configuration file, such as `{context.secrets.SECRET}` and does not return the actual secret's value.

## Create a secrets file

Create a YAML file, such as `secrets.yaml`, to define your secrets. The file name must end with the `yaml` or `yml` file extension. Each line in the files defines a different secret.

The following example contains a Bash variable as a value for the `TOKEN` secret. API Mesh supports strings and numbers with or without single or double quotes and Bash variables with or without brackets, such as `$TOKEN` or `$[TOKEN]`.

<InlineAlert variant="info" slots="text"/>

Bash variables are not supported in Windows.

```yaml
TOKEN: $TOKEN
USERNAME: user-name
adminname: 'admin-name'
AEM_USERNAME: "user-name"

API_KEY: ${COMMERCE_API_KEY}
API_KEY2: $COMMERCE_API_KEY
```

<InlineAlert variant="warning" slots="text"/>

You cannot escape the `$` character in secrets files. This means that a secret's value cannot contain `$`, unless it is part of a Bash command.

## Add secrets to your mesh configuration file

Once you have created your `secrets.yaml` file, you can reference the secrets in your mesh configuration file. You can use secrets in the following locations:

- Headers
  - Operational headers
- JavaScript files
  - Local hooks
  - Additional resolvers

When using secrets with operational headers, use the template literals syntax, for example, `{context.secrets.<SECRET_NAME>}`.

When using secrets in JavaScript files using hooks or resolvers, use the secret in context, for example, `const secretValue = context.secrets.<SECRET_NAME>`.

The following file provides an example using operational headers:

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

The `getHeadersSchema.json` tab contains the JSON file referenced in the example mesh's `operations` object. This file provides the required response schema. Copy the file into the same folder as your `mesh.json` file before creating or updating your mesh.

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
              "secretAEMHeader": "{context.secrets.TOKEN}"
            }
          }
        }
      }
    ],
  }
}
```

#### `secrets.yaml`

```yaml
TOKEN: "my-token"
AEMUSERNAME: "user-name"
adminname: "admin-name"

API_KEY: $COMMERCE_API_KEY
```

#### `getHeadersSchema.json`

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

Use the following GraphQL query to retrieve the headers. This query will vary depending on the header reflection service you are using.

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

The `hooks.js` tab contains the JavaScript file referenced in the example mesh's `plugins` object. This file provides the required composer. Copy the file into the same folder as your `mesh.json` file before creating or updating your mesh.

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
  }
}
```

#### `secrets.yaml`

```yaml
TOKEN: "abcabcdefdefxyzxyz"
```

#### `hooks.js`

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
    base_url
  }
}
```

#### Authorized response

```json
{
  "data": {
    "storeConfig": {
      "base_url": "https://www.example.com"
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
