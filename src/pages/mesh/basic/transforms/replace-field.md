---
title: replaceField | API Mesh for Adobe Developer App Builder
description: Learn how to clean up redundant queries or replace files types with the replaceField transform.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# `replaceField` transform

The `replaceField` transform is deprecated. If you attempt to create an edge mesh with the `replaceField` transform, your edge mesh will not progress past the provisioning status. Alternatively, you can use the following `additonalResolvers` method.

## Replacing fields with `additionalResolvers`

Previously, the `replaceField` transform allowed you to replace the configuration properties of one field with another, hoisting field values from a subfield to its parent. This transform allowed you to clean up redundant queries or replace field types.

Since the `replaceField` transform is deprecated, you can achieve the same functionality by using [`additionalResolvers`](../../advanced/extend/resolvers/index.md) in your mesh configuration. The `additionalResolvers` property allows you to add custom resolvers to your mesh. These resolvers can replace fields, hoist values, or perform other custom logic.

<InlineAlert variant="info" slots="text"/>

Custom resolvers can hoist and replace existing fields as long as the field types are the same. If the field types are different, you can [extend](../../advanced/extend/index.md) the type to include a new field and hide the original field using a [`filterSchema` transform](./filter-schema.md).

The following example hoists the Adobe Commerce `name` field from the `ProductInterface` to the `label` field of `ProductImage` by adding the `replace.js` resolver to the mesh configuration.

<CodeBlock slots="heading, code" repeat="2" languages="json, javascript" />

#### `mesh.json`

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "AdobeCommerce",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql"
          }
        },
      }
    ]
    "additionalResolvers": ["./replace.js"]
  }
}
```

#### `replace.js`

```javascript
module.exports = {
    resolvers: {
        SimpleProduct: {
            name: {
                selectionSet: '{ name image { label } }',
                resolve: (root) => {
                    return root.image.label;
                }
            }
        }
    }
} 
```

<!-- 
## How the transform works

`from` defines your source, the field in the schema you want to replace.

```json
[
  {
    "from": {
      "type": "Query",
      "field": "books"
    }
  }
]
```

In this case, we want to replace the field `books` in the type `Query`, which has the type `BooksApiResponse`.

`to` defines the target, and which field should replace your identified source field.

```json
{
  "to": {
    "type": "BooksApiResponse",
    "field": "books"
  }
}
```

To summarize, with the configuration above, we want the field `books` in type `Query` to be replaced from being of type `BooksApiResponse` to become type `[Book]`.

Finally, since we no longer have any reference to `BooksApiResponse` this becomes a loose type, which means the transform will purge it from the GraphQL schema.

## Transform scopes

We explored how to use the transform to replace field Types.
The transform always replaces the type of source field with the type of the target.

However, the transform also allows you to pass a scope property, which values can be `config` or `hoistValue`.

We could say that the scope property could also take a `type` value, but since it's the minimum requirement to replace the Type, this is considered the default scope and so it wouldn't make sense to pass it when you desire just this behavior.

### `scope:` config

The transform will replace the full field config when you pass `scope: config{:yaml}`.

A field config includes properties of the field such as `description`, `type`, `args`, `resolve`, `subscribe`, `deprecationReason`, `extensions`, `astNode`.

As you can see, this is very comprehensive as it includes things like arguments and the resolve and subscribes functions.

This can be useful when you have custom resolve functions on your target field. So you are happy to replace the source field entirely. However, you should be careful when you fully understand the implications of the behavior for your replaced field.

### `scope: hoistValue`

We have seen how `hoistValue` can be useful in the full example described in the "How to use?" paragraph.

Once again, by default, the transform will replace the Type of the field only.

When passing `scope: hoistValue{:yaml}` in addition to replacing the Type, the transform will wrap the resolve function of the original field (source) with an extra function. This function intercepts the return value of the resolver to ultimately return only the direct child property that has the same name as the target field; hence performing value hoisting.

Taking into account the original schema shared above, originally, `Query.books` would return a value like this:

```json
{
  "books": {
    "books": [
      { "title": "abc", "author": "def" },
      { "title": "ghi", "author": "lmn" }
    ]
  }
}
```

But the wrapping function applied to the original resolver, when passing a `hoistValue` scope, will change the value above to this:

```json
{
  "books": [
    { "title": "abc", "author": "def" },
    { "title": "ghi", "author": "lmn" }
  ]
}
```

## Additional type definitions

The examples shared so far are simple because we wanted to replace fields with other available fields in the original schema.

However, sometimes you might want to replace a field Type with something that is not available in the original schema.
In this case, the transform allows you to pass additional type definitions that will be injected into your schema to use them as target field Types.

Let's have a look at a Mesh config to be applied to the GraphQL schema shared above:

```json
{
  "transforms": [
    {
      "replaceField": {
        "typeDefs": "type NewAuthor {\n  age: String\n}\n",
        "replacements": [
          {
            "from": {
              "type": "Author",
              "field": "age"
            },
            "to": {
              "type": "NewAuthor",
              "field": "age"
            }
          }
        ]
      }
    }
  ]
}
```

The config above will change the type `Author` from this:

```diff
type Author {
  name: String!
- age: Int!
+ age: String
}
```

To this:

```graphql
type Author {
  name: String!
  age: String
}
```

## Config API Reference

-  `typeDefs` (type: `Any`) - Additional type definitions, used to replace field types
-  `replacements` (type: `Array of Object`, required) - Array of rules to replace fields
   -  `from` (type: `Object`, required):
      -  `type` (type: `String`, required)
      -  `field` (type: `String`, required)
   -  `to` (type: `Object`, required):
      -  `type` (type: `String`, required)
      -  `field` (type: `String`, required)
   -  `scope` (type: `String (config | hoistValue)`)
   -  `composer` (type: `Any`)
   -  `name` (type: `String`) -->
