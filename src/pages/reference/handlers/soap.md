---
title: SOAP handler | API Mesh for Adobe Developer App Builder
---

# SOAP

<InlineAlert variant="warning" slots="text"/>

The SOAP handler is experimental and should not be used in production deployments.

The SOAP handler allows you to consume [SOAP](https://soapui.org) `WSDL` files and generate a remote executable schema for those services.

Add SOAP handlers to your mesh:

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "SoapSource",
        "handler": {
          "soap": {
            "source": "http://<Commerce Host>/soap?wsdl&services=customerCustomerRepositoryV1",
            "wsdl": "http://<Commerce Host>/soap?wsdl&services=customerCustomerRepositoryV1",
            "operationHeaders": {
              "x-operation-header-key": "sample-x-operation-header-value"
            },
            "schemaHeaders": {
              "x-schema-header-key": "sample-x-schema-header-value"
            }
          }
        }
      }
    ]
  }
}
```

## SOAP limitations

The experimental SOAP handler has the following limitations:

- A `source` field and a `wsdl` field (with identical values) are required
- `context.headers` are not available inside `operationHeaders`
- `mutations` must be used when querying

### Querying

When querying a SOAP source inside a mesh, use a `mutation` instead of a `query`, as illustrated in the following example:

```graphql
mutation {
  catalogProductRepositoryV1Get(
    sku: "product_dynamic_249"
    editMode: true
    storeId: 1
    forceReload: true
  ),



  catalogCategoryListV1GetList(searchCriteria:"category")
}
```

## Config API reference

- `source`(type: `String`, required) - A URL to your WSDL, must be identical to `wsdl`
- `wsdl` (type: `String`, required) - A URL to your WSDL, must be identical to the `source`
- `basicAuth` (type: `Object`) - Basic Authentication Configuration, includes the following fields:
  - `username` (type: `String`, required) - Username for Basic Authentication
  - `password` (type: `String`, required) - Password for Basic Authentication
- `securityCert` (type: `Object`) - SSL Certificate Based Authentication Configuration, includes the following fields:
  - `publicKey` (type: `String`) - Public key
  - `privateKey` (type: `String`) - Private key
  - `password` (type: `String`) - Password
  - `publicKeyPath` (type: `String`) - Path to the file or URL that contains your public key
  - `privateKeyPath` (type: `String`) - Path to the file or URL that contains your private key
  - `passwordPath` (type: `String`) - Path to the file or URL that contains your password
-  `schemaHeaders` (type: `Any`) - JSON object for adding headers to API calls for runtime schema introspection
   - You can also provide `.js` or `.ts` file path that exports `schemaHeaders` as an object.
-  `operationHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime operation execution
- `includePorts` (type: `Boolean`) - A flag that defines if ports defined in the WSDL are represented in the schema
  - If `true`, the ports defined in the WSDL are represented as GraphQL-type objects in the schema. The fields of the object will be the operations of the port. Most SOAP endpoints only define one port, so including it in the schema will be inconvenient, but if there are multiple ports with operations of the same name, you should set this option to `true`. If set to `false` (default), only one of the identically-named operations will be callable.
- `includeServices` (type: `Boolean`) - A flag that defines if services defined in the WSDL are represented in the schema
  - If `true`, the services defined in the WSDL will be represented as GraphQL-type objects in the schema. The fields of the object will be the ports of the service (or the operation, dependent on `includePorts`). Most SOAP endpoints only define one service, so including it in the schema will be inconvenient, but if there are multiple services with operations of the same name, you should set this option to `true`. If set to `false` (default), only one of the identically-named operations will be callable.
- `selectQueryOrMutationField` (type: `Array of Object`) - Allows you to explicitly override the default operation (Query or Mutation) for any SOAP operation:
  - `service` (type: `String`, required)
  - `port` (type: `String`, required)
  - `operation` (type: `String`, required)
  - `type` (type: `String (query | mutation)`, required)
- `selectQueryOperationsAuto` (type: `Boolean`) - Automatically adds operations starting with `query` or `get` to the Query type
