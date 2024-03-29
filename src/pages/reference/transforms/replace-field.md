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

The `replaceField` transform allows you to replace the configuration properties of a GraphQL field (source) with the ones of another field (target).

The `replace-field` transforms allow you to replace the configuration properties of one field with another. This allows you to hoist field values from a subfield to its parent.

Use this transform to clean up redundant queries or replace field types.
It can be customized to completely replace and/or compose resolve functions with a great degree of customization.

<InlineAlert variant="info" slots="text"/>

Currently, this transform supports `bare` mode only. For information about `bare` and `wrap` modes, read the [dedicated section](index.md#two-different-modes).

## Usage

The following example hoists the Adobe Commerce `name` field from the `ProductInterface` to the `label` field of `ProductImage`:

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
        "transforms": [
          {
            "replaceField": {
              "replacements": [
                {
                  "to": {
                    "type": "ProductImage",
                    "field": "label"
                  },
                  "from": {
                    "type": "ProductInterface",
                    "field": "name"
                  },
                  "scope": "hoistValue"
                }
              ]
            }
          }
        ]
      }
    ]
  }
}
```

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
<!-- 
## Custom composers

Performing value hoisting or replacing the entire field config is powerful, but it might not always fully satisfy custom needs.
For instance, if you applied transforms to the bare schema (such as field renaming), the built-in value hoisting functionality won't work because you'd need to hoist the child property provided by the original schema, and not the renamed version.

The transform allows you to assign composers to replace the rule, which lets you define your custom logic on top of fields' resolve functions.

A composer is a function that wraps the resolve function, giving you access to this before it is executed. You can then intercept its output value so that finally you can also define a custom return value.

Let's look at an example.
Currently, our `Book` type has a `code` field; we want to replace this field and turn it into a boolean. Our logic assumes that if we have a book code, it means this book is available in our store.
Eventually, we want to completely replace `code` with `isAvailable`; as you can see, this requires implementing custom logic.

```json
{
  "transforms": [
    {
      "replaceField": {
        "typeDefs": "type NewBook {\n  isAvailable: Boolean\n}\n",
        "replacements": [
          {
            "from": {
              "type": "Book",
              "field": "code"
            },
            "to": {
              "type": "NewBook",
              "field": "isAvailable"
            },
            "composer": "./customComposers.ts#isAvailable"
          }
        ]
      }
    }
  ]
}
```

```js
// customResolvers.js

module.exports = {
  isAvailable: next => async (root, args, context, info) => {
    // 'next' is the field resolve function
    const code = await next(root, args, context, info)
    return Boolean(code)
  }
}
```

Now our `code` field will return a Boolean as per custom logic implemented through the javascript function above.

## Renaming fields

If we continue to elaborate on what we did above, when attaching composers to field resolvers to implement custom logic; it seems logical that a field that has been changed in Type and so return value, even with the addition of custom logic, has certainly evolved from the original field and so it would probably be best to rename it.

replaceField transform allows you to do that directly as part of the replacements rules; you just need to pass the `name` property to define a new name for your target field.

Let's wrap this up by adding a finishing touch to our schema:

```json
{
  "transforms": [
    {
      "replaceField": {
        "typeDefs": "type NewBook {\n  isAvailable: Boolean\n}\n",
        "replacements": [
          {
            "from": {
              "type": "Query",
              "field": "books"
            },
            "to": {
              "type": "BooksApiResponse",
              "field": "books"
            },
            "scope": "hoistValue"
          },
          {
            "from": {
              "type": "Book",
              "field": "code"
            },
            "to": {
              "type": "NewBook",
              "field": "isAvailable"
            },
            "composer": "./customResolvers.js#isAvailable",
            "name": "isAvailable"
          }
        ]
      }
    }
  ]
}
```

And now we have the following shiny GraphQL schema:

```graphql
type Query {
  books: [Book]
}

type Book {
  title: String!
  author: Author!
  isAvailable: Boolean
}

type Author {
  name: String!
  age: Int!
}
```
 -->
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
   -  `name` (type: `String`)
