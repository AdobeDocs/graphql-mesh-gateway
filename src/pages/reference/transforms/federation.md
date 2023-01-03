---
title: federation Transform (Apollo) | API Mesh for Adobe Developer App Builder
---

# federation transform

`federation` transform allows you to add resolvers and directives to conform to the federation specification. Much of the federation source code could be reused to ensure that it is compliant to the specification. This transform uses the [`graphql-transform-federation`](https://github.com/0xR/graphql-transform-federation) package.

## Usage

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
              "key": {
                "Fields": [
                  "id"
              ],
            },
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

To add more complex business logic, you can point to a code file that exports a resolver function.

```json
{
  "resolveReference": "https://my-site.com/userResolveReference.js"
}
```

`./userResolveReference.js`

```js
// So we can point to an existing query field to resolve that entity
export default function (root, context, info)  {
  return context.accounts.Query.user({ root, args: { id: root.id }, context, info })
}
```

## Config API Reference

-  `types` (type: `Array of Object`, required):
   -  `name` (type: `String`, required)
   -  `config` (type: `Object`):
      - `key` (type: `Array of Object`):
        - `fields` (type: `String`)
      -  `shareable` (type: `Boolean`)
      -  `extend` (type: `Boolean`)
      -  `fields` (type: `Array of Object`, required):
         -  `name` (type: `String`, required)
         -  `config` (type: `Object`, required):
            -  `external` (type: `Boolean`)
            -  `provides` (type: `String`)
               -  `fields` (type: `String`)
            -  `requires` (type: `String`)
               -  `fields` (type: `String`)
            - `tag` (type: `Object`):
              - `name` (type: `String`)
            - `inaccessible` (type: `Boolean`)
            - `override` (type: `Object`):
              - `from` (type: `String`)
      -  `resolveReference` -  One of the following:
         -  `String`
         -  `object`:
            -  `queryFieldName` (type: `String`, required) - Name of root field name that resolves the reference
            -  `args` (type: `JSON`) - Configure the arguments for the field:

                ```json
                {
                    "args": {
                        "someArg": "{root.someKeyValue}"
                    }
                }
                ```
