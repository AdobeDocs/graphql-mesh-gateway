"use strict";(self.webpackChunkgraphql_mesh_gateway=self.webpackChunkgraphql_mesh_gateway||[]).push([[7495],{58179:function(e,n,a){a.r(n),a.d(n,{_frontmatter:function(){return p},default:function(){return h}});var r,t=a(87462),m=a(63366),i=(a(15007),a(64983)),l=a(91515),o=["components"],p={},d=(r="InlineAlert",function(e){return console.warn("Component "+r+" was not imported, exported, or provided by MDXProvider as global scope"),(0,i.mdx)("div",e)}),s={_frontmatter:p},u=l.Z;function h(e){var n=e.components,a=(0,m.Z)(e,o);return(0,i.mdx)(u,(0,t.Z)({},s,a,{components:n,mdxType:"MDXLayout"}),(0,i.mdx)("h1",{id:"json-schema-handlers"},"JSON schema handlers"),(0,i.mdx)("p",null,"This handler allows you to load any remote REST service and describe its request/response. With this handler, you can easily customize and control the GraphQL schema in API Mesh for Adobe Developer App Builder."),(0,i.mdx)(d,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,i.mdx)("p",null,"If your REST service's request or response format is modified, you must update your mesh configuration file with the modified request or response. Then ",(0,i.mdx)("a",{parentName:"p",href:"../../gateway/create-mesh.md#update-an-existing-mesh"},"update your mesh")," to allow API Mesh to cache any changes."),(0,i.mdx)("p",null,"If your source handler's schema is modified, you must ",(0,i.mdx)("a",{parentName:"p",href:"../../gateway/create-mesh.md#update-an-existing-mesh"},"update your mesh")," to allow API Mesh to cache any changes."),(0,i.mdx)("p",null,"For more information on creating JSON schemas, refer to this ",(0,i.mdx)("a",{parentName:"p",href:"https://json-schema.org/learn/getting-started-step-by-step.html"},"JSON schema tutorial"),"."),(0,i.mdx)(d,{variant:"warning",slots:"text",mdxType:"InlineAlert"}),(0,i.mdx)("p",null,"The ",(0,i.mdx)("inlineCode",{parentName:"p"},"JsonSchema")," source in GraphQL Mesh uses a different capitalization scheme than other handlers. Using ",(0,i.mdx)("inlineCode",{parentName:"p"},"jsonSchema")," will result in an error."),(0,i.mdx)(d,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,i.mdx)("p",null,"JSON schema handlers do not support ",(0,i.mdx)("inlineCode",{parentName:"p"},"responseConfig")," functionality."),(0,i.mdx)("p",null,"To get started, use the handler in your Mesh config file:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "sources": [\n    {\n      "name": "MyApi",\n      "handler": {\n        "JsonSchema": {\n          "baseUrl": "https://some-service-url/endpoint-path/",\n          "operations": [\n            {\n              "type": "Query",\n              "field": "users",\n              "path": "/users",\n              "method": "GET",\n              "responseSchema": "https://my-json-schema/users.json"\n            }\n          ]\n        }\n      }\n    }\n  ]\n}\n')),(0,i.mdx)("p",null,"JSON Schema handlers can also use local sources, see ",(0,i.mdx)("a",{parentName:"p",href:"../handlers/index.md#reference-local-files-in-handlers"},"Reference local file handlers")," for more information."),(0,i.mdx)("h2",{id:"headers-from-context"},"Headers from context"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "sources": [\n    {\n      "name": "MyGraphQLApi",\n      "handler": {\n        "JsonSchema": {\n          "baseUrl": "https://some-service-url/endpoint-path/",\n          "operationHeaders": {\n            "Authorization": "Bearer {context.headers[\'x-my-api-token\']}"\n          }\n        }\n      }\n    }\n  ]\n}\n')),(0,i.mdx)("h2",{id:"query-parameters"},"Query Parameters"),(0,i.mdx)("p",null,"There are a few methods to define the query parameters, select the one that fits your needs (or combine them):"),(0,i.mdx)("h3",{id:"auto-declare"},"Auto declare"),(0,i.mdx)("p",null,"The mesh automatically generates arguments for operations if needed. Arguments are generated as nullable strings by default."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "sources": [\n        {\n            "name": "MyGraphQLApi",\n            "handler": {\n                "JsonSchema": {\n                    "baseUrl": "https://some-service-url/endpoint-path/",\n                    "operations": [\n                        {\n                            "type": "Query",\n                            "field": "user",\n                            "path": "/user?id={args.id}",\n                            "method": "GET",\n                            "responseSchema": "./json-schemas/user.json"\n                        }\n                    ]\n                }\n            }\n        }\n    ]\n}\n')),(0,i.mdx)("h3",{id:"manual-declare"},"Manual declare"),(0,i.mdx)("p",null,"You can define the arguments of the operation using the ",(0,i.mdx)("inlineCode",{parentName:"p"},"argTypeMap")," config field, according to the JSON Schema spec."),(0,i.mdx)("p",null,"In this example, we declare a ",(0,i.mdx)("inlineCode",{parentName:"p"},"page")," argument as an object with ",(0,i.mdx)("inlineCode",{parentName:"p"},"limit")," and ",(0,i.mdx)("inlineCode",{parentName:"p"},"offset")," properties:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "argTypeMap": {\n        "page": {\n            "type": "object",\n            "properties": {\n                "limit": {\n                    "type": "number"\n                },\n                "offset": {\n                    "type": "number"\n                }\n            }\n        }\n    }\n}\n')),(0,i.mdx)("p",null,"In addition, especially for non-primitive types, the arguments should be added to the path using the ",(0,i.mdx)("inlineCode",{parentName:"p"},"queryParamArgMap")," config field."),(0,i.mdx)("p",null,"Here we add the ",(0,i.mdx)("inlineCode",{parentName:"p"},"page")," argument to the query parameters:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "queryParamArgMap": {\n        "page": "page"\n    }\n}\n')),(0,i.mdx)("p",null,"And here is the final config:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "sources": [\n        {\n            "name": "MyGraphQLApi",\n            "handler": {\n                "JsonSchema": {\n                    "baseUrl": "https://some-service-url/endpoint-path/",\n                    "operations": [\n                        {\n                            "type": "Query",\n                            "field": "users",\n                            "path": "/getUsers",\n                            "method": "GET",\n                            "responseSample": "./jsons/MyField.response.json",\n                            "responseTypeName": "MyResponseName",\n                            "argTypeMap": {\n                                "page": {\n                                    "type": "object",\n                                    "properties": {\n                                        "limit": {\n                                            "type": "number"\n                                        },\n                                        "offset": {\n                                            "type": "number"\n                                        }\n                                    }\n                                }\n                            },\n                            "queryParamArgMap": {\n                                "page": "page"\n                            }\n                        }\n                    ]\n                }\n            }\n        }\n    ]\n}\n')),(0,i.mdx)("h2",{id:"config-api-reference"},"Config API reference"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"baseUrl")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"String"),")"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"operationHeaders")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"JSON"),")"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"schemaHeaders")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"JSON"),")"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"operations")," - (required) Array of:",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"object"),":",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"field")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"String"),", required)",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},"Cannot contain hyphens."))),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"description")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"String"),")"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"type")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"String (Query | Mutation | Subscription)"),", required)"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"requestSchema")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"Any"),")"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"requestSample")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"Any"),")"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"requestTypeName")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"String"),")"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"responseSchema")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"Any"),")",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},"Remote files and URLs are not supported. You must provide a local path."))),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"responseSample")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"Any"),")",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},"Remote files and URLs are not supported. You must provide a local path."))),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"responseTypeName")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"String"),")"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"argTypeMap")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"JSON"),")"))))),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"ignoreErrorResponses")," (type: ",(0,i.mdx)("inlineCode",{parentName:"li"},"Boolean"),")")))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-reference-handlers-json-schema-md-9f989b2de57dcc46b221.js.map