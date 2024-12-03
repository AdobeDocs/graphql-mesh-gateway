"use strict";(self.webpackChunkgraphql_mesh_gateway=self.webpackChunkgraphql_mesh_gateway||[]).push([[9789],{40173:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return d},default:function(){return h}});var o=t(58168),r=t(80045),a=(t(88763),t(15680)),i=t(83407);const s=["components"],d={},m=(l="InlineAlert",function(e){return console.warn("Component "+l+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.mdx)("div",e)});var l;const p={_frontmatter:d},u=i.A;function h(e){let{components:n}=e,t=(0,r.A)(e,s);return(0,a.mdx)(u,(0,o.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.mdx)("h1",{id:"extend-your-schema-with-additionaltypedefs"},"Extend your schema with ",(0,a.mdx)("inlineCode",{parentName:"h1"},"AdditionalTypeDefs")),(0,a.mdx)("p",null,"This topic describes how to use multiple APIs. Your mesh can merge different data sources into a single unified GraphQL Schema, but it is not an alternative to Schema Stitching, Apollo Federation, Bare Schema Merging, or another merging strategy."),(0,a.mdx)("p",null,"In addition to ",(0,a.mdx)("inlineCode",{parentName:"p"},"@apollo/gateway"),", API Mesh supports subscriptions out-of-box."),(0,a.mdx)("p",null,(0,a.mdx)("a",{parentName:"p",href:"https://product.voxmedia.com/2020/11/2/21494865/to-federate-or-stitch-a-graphql-gateway-revisited"},"Learn more key differences between Schema Stitching and Apollo Federation")),(0,a.mdx)("h2",{id:"extending-graphql-schema-with-additionaltypedefs"},"Extending GraphQL Schema with ",(0,a.mdx)("inlineCode",{parentName:"h2"},"additionalTypeDefs")),(0,a.mdx)("p",null,"You can add new types or fields to the current unified GraphQL Schema by using the ",(0,a.mdx)("inlineCode",{parentName:"p"},"additionalTypeDefs")," configuration field."),(0,a.mdx)("p",null,"For example, if we have the StackExchange API in our Mesh configuration:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "sources": [\n    {\n      "name": "StackExchange",\n      "handler": {\n        "openapi": {\n          "source": "https://raw.githubusercontent.com/grokify/api-specs/master/stackexchange/stackexchange-api-v2.2_openapi-v3.0.yaml"\n        }\n      }\n    }\n  ],\n  "additionalTypeDefs": "extend type Query {\\n  listQuestionsFromStackOverflow(first: Int!): [Question]\\n}\\n"\n}\n')),(0,a.mdx)("p",null,"We might want to add a new field under the ",(0,a.mdx)("inlineCode",{parentName:"p"},"Query")," root type named ",(0,a.mdx)("inlineCode",{parentName:"p"},"viewsInPastMonth"),", but we will need a resolver for this field."),(0,a.mdx)("h2",{id:"merging-types-from-different-sources-type-merging"},"Merging types from different sources (Type Merging)"),(0,a.mdx)("p",null,"Imagine you have two different services, ",(0,a.mdx)("inlineCode",{parentName:"p"},"Books")," and ",(0,a.mdx)("inlineCode",{parentName:"p"},"Authors"),", which are exposing the following schemas:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-graphql"},"# Authors\ntype Query {\n  authors(ids: [ID!]): [Author!]!\n  author(id: ID!): Author!\n}\n\ntype Author {\n  id: ID!\n  name: String!\n}\n")),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-graphql"},"# Books\ntype Query {\n  books(ids: [ID!]): [Book!]!\n  book(id: ID!): Book!\n  authorWithBooks(id: ID!): Author!\n  authorsWithBooks(ids: [ID!]): [Author!]!\n}\n\ntype Book {\n  id: ID!\n  title: String!\n  authorId: ID!\n}\n\ntype AuthorWithBooks {\n  id: ID!\n  books: [Book!]!\n}\n")),(0,a.mdx)("p",null,"Then you could use the ",(0,a.mdx)("a",{parentName:"p",href:"../../basic/transforms/rename.md"},(0,a.mdx)("inlineCode",{parentName:"a"},"Rename"))," transform to rename ",(0,a.mdx)("inlineCode",{parentName:"p"},"AuthorWithBooks")," to ",(0,a.mdx)("inlineCode",{parentName:"p"},"Author"),"."),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "sources": [\n      {\n        "name": "BookService",\n        "handler": null,\n        "transforms": [\n          {\n            "rename": {\n              "renames": [\n                {\n                  "from": {\n                    "type": "AuthorWithBooks"\n                  },\n                  "to": {\n                    "type": "Author"\n                  }\n                },\n                {\n                  "from": {\n                    "type": "Query",\n                    "field": "authorWithBooks"\n                  },\n                  "to": {\n                    "type": "Query",\n                    "field": "author"\n                  }\n                }\n              ]\n            }\n          }\n        ]\n      }\n    ]\n  }\n]\n')),(0,a.mdx)("p",null,"After that ",(0,a.mdx)("inlineCode",{parentName:"p"},"rename"),", you would expect the following query to work, but it will fail because the mesh does not know which field belongs to which source and how to combine those."),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-graphql"},"{\n  author(id: 0) {\n    id # This field is common\n    name # This field is from `AuthorService`\n    books { # This field is from `BookService`\n      id\n      title\n    }\n  }\n}\n")),(0,a.mdx)("p",null,"For other ways to extend the schema consider using ",(0,a.mdx)("a",{parentName:"p",href:"./resolvers/programmatic-resolvers.md"},(0,a.mdx)("inlineCode",{parentName:"a"},"additionalResolvers"))," or ",(0,a.mdx)("a",{parentName:"p",href:"../../basic/transforms/type-merging.md"},"type merging"),"."),(0,a.mdx)("h2",{id:"batching-requests-between-sources-to-prevent-an-n1-problem"},"Batching requests between sources to prevent an N+1 problem"),(0,a.mdx)("p",null,"The previous example works fine, but there is an N+1 problem. It sends ",(0,a.mdx)("inlineCode",{parentName:"p"},"n")," requests for ",(0,a.mdx)("inlineCode",{parentName:"p"},"n")," entities. But we have ",(0,a.mdx)("inlineCode",{parentName:"p"},"authors")," and ",(0,a.mdx)("inlineCode",{parentName:"p"},"books"),". Type Merging is smart enough to handle batching if you point it to a field that returns a list of entities. Let's update our mesh to the following:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "sources": [\n    {\n      "name": "AuthorService",\n      "handler": null,\n      "transforms": [\n        {\n          "typeMerging": {\n            "queryFields": [\n              {\n                "queryFieldName": "authors",\n                "keyField": "id"\n              }\n            ]\n          }\n        }\n      ]\n    },\n    {\n      "name": "BookService",\n      "handler": null,\n      "transforms": [\n        {\n          "rename": {\n            "renames": [\n              {\n                "from": {\n                  "type": "AuthorWithBooks"\n                },\n                "to": {\n                  "type": "Author"\n                }\n              },\n              {\n                "from": {\n                  "type": "Query",\n                  "field": "authorWithBooks"\n                },\n                "to": {\n                  "type": "Query",\n                  "field": "author"\n                }\n              },\n              {\n                "from": {\n                  "type": "Query",\n                  "field": "authorsWithBooks"\n                },\n                "to": {\n                  "type": "Query",\n                  "field": "authors"\n                }\n              }\n            ]\n          }\n        },\n        {\n          "typeMerging": {\n            "queryFields": [\n              {\n                "queryFieldName": "books",\n                "keyField": "id"\n              },\n              {\n                "queryFieldName": "authors",\n                "keyField": "id"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  ]\n}\n')),(0,a.mdx)("p",null,"And now it batches the requests to the inner sources."),(0,a.mdx)("h2",{id:"consuming-apollo-federation-services"},"Consuming Apollo Federation Services"),(0,a.mdx)("p",null,"The mesh uses ",(0,a.mdx)("a",{parentName:"p",href:"https://github.com/gmac/schema-stitching-handbook/tree/master/federation-services"},"Schema Stitching")," to consume the existing Apollo Federation services, so you can combine Federation and Type Merging."),(0,a.mdx)("p",null,"Follow the Apollo Federation spec and integrate your existing Federated services. Your mesh can mix and match Federation and Stitching approaches including all other transforms (Type Merging, Rename, Filter, etc.)."),(0,a.mdx)("p",null,"You can also transform your existing non-federated schemas into a federated service."),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "sources": [\n    {\n      "name": "accounts",\n      "handler": {\n        "graphql": {\n          "endpoint": "<your_url>"\n        }\n      },\n      "transforms": [\n        {\n          "federation": {\n            "types": [\n              {\n                "name": "Query",\n                "config": {\n                  "extend": true\n                }\n              },\n              {\n                "name": "User",\n                "config": {\n                  "keyFields": [\n                    "id"\n                  ],\n                  "resolveReference": {\n                    "queryFieldName": "user"\n                  }\n                }\n              }\n            ]\n          }\n        }\n      ]\n    },\n    {\n      "name": "reviews",\n      "handler": {\n        "graphql": {\n          "endpoint": "<your_url>"\n        }\n      }\n    },\n    {\n      "name": "products",\n      "handler": {\n        "graphql": {\n          "endpoint": "<your_url>"\n        }\n      }\n    },\n    {\n      "name": "inventory",\n      "handler": {\n        "graphql": {\n          "endpoint": "<your_url>"\n        }\n      }\n    }\n  ]\n}\n')),(0,a.mdx)(m,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,a.mdx)("p",null," You can view the ",(0,a.mdx)("a",{parentName:"p",href:"../../basic/transforms/federation.md"},"federation transformer")," documentation to learn more about adding federation metadata to a non-federated GraphQL Schema."))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-mesh-advanced-extend-index-md-77e45998c5e2483bec11.js.map