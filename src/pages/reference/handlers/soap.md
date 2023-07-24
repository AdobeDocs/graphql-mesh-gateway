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
  - This redundancy is a temporary limitation and will be addressed in a future release.
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
-  `schemaHeaders` (type: `Any`) - JSON object for adding headers to API calls for runtime schema introspection
   - You can also provide `.js` or `.ts` file path that exports `schemaHeaders` as an object.
-  `operationHeaders` (type: `JSON`) - JSON object for adding headers to API calls for runtime operation execution
