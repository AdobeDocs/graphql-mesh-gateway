---
title: federation Transform (Apollo)
---

# federation transform

`federation` transform allows to add the resolvers and directives to conform to the federation specification. Much of the federation source code could be reused ensuring it is compliant to the specification. This transform uses [`graphql-transform-federation`](https://github.com/0xR/graphql-transform-federation) package.

## How to use?

Add the following configuration to your Mesh config file:

```json
{
  "transforms": [
    {
      "federation": {
        "types": [
          {
            "name": "Query",
            "config": {
              "extend": true
            }
          },
          {
            "name": "Product",
            "config": {
              "extend": true,
              "keyFields": [
                "id"
              ],
              "fields": [
                {
                  "name": "id",
                  "external": true
                }
              ],
              "resolveReference": {
                "queryFieldName": "user"
              }
            }
          }
        ]
      }
    }
  ]
}

```

### Add Reference Resolver as a Code File

If you want to add more complex business logic, you can point to a code file that exports a resolver function.

```json
{
  "resolveReference": "./userResolveReference.js"
}
```

`./userResolveReference.js`
```js
// So we can point to an existing query field to resolve that entity
module.exports = (root, context, info) =>
                    context.accounts.Query.user({ root, args: { id: root.id }, context, info })
```

## Config API Reference

-  `types` (type: `Array of Object`, required):
   -  `name` (type: `String`, required)
   -  `config` (type: `Object`):
      -  `keyFields` (type: `Array of String`, required)
      -  `extend` (type: `Boolean`)
      -  `fields` (type: `Array of Object`, required):
         -  `name` (type: `String`, required)
         -  `config` (type: `Object`, required):
            -  `external` (type: `Boolean`)
            -  `provides` (type: `String`)
            -  `requires` (type: `String`)
      -  `resolveReference` -  One of:
         -  `String`
         -  `object`:
            -  `queryFieldName` (type: `String`, required) - Name of root field name that resolves the reference
            -  `keyArg` (type: `String`) - If the root field name has multiple args,
            you need to define which argument should receive the key
