---
title: SOAP handler | API Mesh for Adobe Developer App Builder
---

# SOAP

The SOAP handler allows you to consume [SOAP](https://soapui.org) `WSDL` files and generate a remote executable schema for those services.

Add SOAP handlers to your mesh:

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "CountryInfo",
        "handler": {
          "soap": {
            "wsdl": "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL"
          }
        }
      }
    ]
  }
}
```

## Config API Reference

- `wsdl` (type: `String`, required) - A URL to your WSDL
- `basicAuth` (type: `Object`) - Basic Authentication Configuration, includes the following fields:
  - `username` (type: `String`, required) - Username for Basic Authentication
  - `password` (type: `String`, required) - Password for Basic Authentication
- `securityCert` (type: `Object`) - SSL Certificate Based Authentication Configuration, includes the following fields:
  - `publicKey` (type: `String`) - Your public key
  - `privateKey` (type: `String`) - Your private key
  - `password` (type: `String`) - Password
  - `publicKeyPath` (type: `String`) - Path to the file or URL contains your public key
  - `privateKeyPath` (type: `String`) - Path to the file or URL contains your private key
  - `passwordPath` (type: `String`) - Path to the file or URL contains your password
- `schemaHeaders` (type: `Any`) - JSON object representing the Headers to add to the runtime of the API calls only for schema introspection. You can also provide `.js` or `.ts` file path that exports `schemaHeaders` as an object.
- `operationHeaders` (type: `JSON`) - JSON object representing the headers to add to the runtime of the API calls for operation during runtime
- `includePorts` (type: `Boolean`) - If `true`, the ports defined in the WSDL are represented as GraphQL-Type objects in the schema. The fields of the object will be the operations of the port.
Most SOAP endpoints only define one port, so including it in the schema will be inconvenient, but if there are multiple ports with operations of the same name, you should set this option to `true`. If set to `false` (default), only one of the identically-named operations will be callable.
- `includeServices` (type: `Boolean`) - If `true`, the services defined in the WSDL will be represented as GraphQL-Type objects in the schema. The fields of the object will be the ports of the service (or the operation, dependent on `includePorts`). Most SOAP endpoints only define one service, so including it in the schema will be inconvenient, but if there are multiple services with operations of the same name, you should set this option to `true`. If set to `false` (default), only one of the identically-named operations will be callable.
- `selectQueryOrMutationField` (type: `Array of Object`) - Allows you to explicitly override the default operation (Query or Mutation) for any SOAP operation:
  - `service` (type: `String`, required)
  - `port` (type: `String`, required)
  - `operation` (type: `String`, required)
  - `type` (type: `String (query | mutation)`, required)
- `selectQueryOperationsAuto` (type: `Boolean`) - Automatically puts operations starting with `query` or `get` into the Query type
