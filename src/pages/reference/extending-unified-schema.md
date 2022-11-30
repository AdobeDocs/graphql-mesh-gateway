---
title: Extending the Unified Schema
description: Learn how to extend the unified schema with resolvers.
---

# Extending the Unified Schema

We saw in [Combining multiple Sources](combining-multiple-sources.md) that `additionalResolvers` can shape and augment the Unified Schema with custom resolvers.

However, the `additionalResolvers` value can also be the path to a JavaScript/TypeScript file that exports the custom resolvers implementation.

## Programmatic `additionalResolvers`

In [Combining multiple Sources](combining-multiple-sources.md), the `additionalResolvers` could have been provided programatically as shown in the [`multiple-sources-prog-resolvers`](https://github.com/charlypoly/graphql-mesh-docs-first-gateway/tree/master/packages/multiple-sources-prog-resolvers) example.

The following `meshrc.yaml` configuration add the following fields:

- `Store.bookSells: [Sells!]!`: to get the selling from a given store

- `Sells.book: Book`: to get the book of a given store selling record

- `Book.author: authors_v1_Author`: to get the author of a book

```json
{
    "sources": null,
    "transforms": null,
    "additionalTypeDefs": "extend type Store {\n  bookSells: [Sells!]!\n}\nextend type Sells {\n  book: Book\n}\nextend type Book {\n  author: authors_v1_Author\n}\n",
    "additionalResolvers": [
        "./resolvers"
    ]
}
```

```ts
import { Resolvers } from './.mesh'

const resolvers: Resolvers = {
  Book: {
    author: {
      selectionSet: /* GraphQL */`
      {
        authorId
      }
      `,
      resolve: async (root, _args, context, info) => {
        return await context.Authors.Query.authors_v1_AuthorsService_GetAuthor({
          root,
          args: {
            input: {
              id: root.authorId,
            }
          },
          context,
          info,
        })
      }
    }
  },
  Store: {
    bookSells: {
      selectionSet: /* GraphQL */`
      {
        id
      }
      `,
      resolve: async (root, _args, context, info) => {
        return await context.Stores.Query.bookSells({
          root,
          args: {
            storeId: root.id
          },
          context,
          info
        })
      }
    }
  },
  Sells: {
    book: {
      selectionSet: /* GraphQL */`
      {
        bookId
      }
      `,
      resolve: async (root, _args, context, info) => {
        return await context.Books.Query.book({
          root,
          args: {
            id: root.bookId
          },
          context,
          info
        })
      }
    }
  }
}

export default resolvers
```

GraphQL Mesh relies on [GraphQL Code Generator](https://www.graphql-code-generator.com/) to generate the `Resolvers` type that gives you access to:

- fully typed resolvers map

- fully typed SDK (through the `context`) to fetch data from Sources

### Using the SDK to fetch Sources

Let's take a closer look at the `Book.author` resolver implementation.

The resolver is accessing the "Authors" source SDK through the `context` to fetch data from the `authors_v1_AuthorsService_GetAuthor(id: ID!)` Query as follows:

```ts
await context.Authors.Query.authors_v1_AuthorsService_GetAuthor({
  root,
  args: {
    input: {
      id: root.authorId,
    }
  },
  context,
  info,
})
```

`authors_v1_AuthorsService_GetAuthor` is a generated SDK method that allows to query our gRPC Books Source as it was a GraphQL Schema.

Any SDK method take the following arguments:

- `root`, `context` and `info` are mandatory parameters that we forward from the resolvers calling the method

- `args`: arguments to pass to the Mutation or Query

- `selectionSet`: allows you to specify a selection on the Query/Mutation to fetch nested data

- `valuesFromResults`: allows you to provide a function to transform the results (if the result is an array, the function will be mapped to each element)

<InlineAlert variant="info" slots="text"/>

Comparing `valuesFromResults` to `selectionSet` helps to "flatten"/"unnest" data from results.
