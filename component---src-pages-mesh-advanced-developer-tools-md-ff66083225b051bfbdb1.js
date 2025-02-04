"use strict";(self.webpackChunkgraphql_mesh_gateway=self.webpackChunkgraphql_mesh_gateway||[]).push([[1828],{72108:function(e,n,a){a.r(n),a.d(n,{_frontmatter:function(){return d},default:function(){return h}});var i=a(58168),t=a(80045),l=(a(88763),a(15680)),m=a(83407),o=a(19835);const r=["components"],d={},s=(p="InlineAlert",function(e){return console.warn("Component "+p+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.mdx)("div",e)});var p;const c={_frontmatter:d},u=m.A;function h(e){let{components:n}=e,a=(0,t.A)(e,r);return(0,l.mdx)(u,(0,i.A)({},c,a,{components:n,mdxType:"MDXLayout"}),(0,l.mdx)("h1",{id:"local-development"},"Local development"),(0,l.mdx)("p",null,"The processes covered in this topic allow developers to set up a local environment, use environment variables, and directly reference files in API Mesh for Adobe Developer App Builder."),(0,l.mdx)(s,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,l.mdx)("p",null,(0,l.mdx)("a",{parentName:"p",href:"./hooks.md"},"Hooks")," are currently not supported in local development."),(0,l.mdx)("h2",{id:"create-a-local-environment"},"Create a local environment"),(0,l.mdx)("p",null,"A local development environment for API Mesh allows you to run a local version for development and testing purposes."),(0,l.mdx)("p",null,"The ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshinit"},(0,l.mdx)("inlineCode",{parentName:"a"},"aio api-mesh:init")," command")," allows you to build a local development environment at the specified location."),(0,l.mdx)(s,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,l.mdx)("p",null,"All of these steps can be automated using flags described in the ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshinit"},"command reference"),"."),(0,l.mdx)("ol",null,(0,l.mdx)("li",{parentName:"ol"},(0,l.mdx)("p",{parentName:"li"},"Run the following command."),(0,l.mdx)("pre",{parentName:"li"},(0,l.mdx)("code",{parentName:"pre",className:"language-bash"},"aio api-mesh:init <project-name>\n"))),(0,l.mdx)("li",{parentName:"ol"},(0,l.mdx)("p",{parentName:"li"},"Select the directory to install the dev environment in.")),(0,l.mdx)("li",{parentName:"ol"},(0,l.mdx)("p",{parentName:"li"},"Indicate if you want this environment to be a Git project. (Requires ",(0,l.mdx)("a",{parentName:"p",href:"https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"},"Git"),".) Git is required for ",(0,l.mdx)("a",{parentName:"p",href:"../best-practices/cicd.md"},"CI/CD"),".")),(0,l.mdx)("li",{parentName:"ol"},(0,l.mdx)("p",{parentName:"li"},"Specify whether you want to use Node Package Manager (",(0,l.mdx)("inlineCode",{parentName:"p"},"npm"),") or ",(0,l.mdx)("inlineCode",{parentName:"p"},"yarn"),". (Requires ",(0,l.mdx)("a",{parentName:"p",href:"https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"},(0,l.mdx)("inlineCode",{parentName:"a"},"npm"))," or ",(0,l.mdx)("a",{parentName:"p",href:"https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable"},(0,l.mdx)("inlineCode",{parentName:"a"},"yarn")),".)"),(0,l.mdx)("p",{parentName:"li"},"The console indicates that the local environment installed successfully.")),(0,l.mdx)("li",{parentName:"ol"},(0,l.mdx)("p",{parentName:"li"},"To deploy your mesh locally, use the ",(0,l.mdx)("inlineCode",{parentName:"p"},"run")," command. The port defaults to ",(0,l.mdx)("inlineCode",{parentName:"p"},"5000"),". You can specify a different port by using the ",(0,l.mdx)("inlineCode",{parentName:"p"},"--port")," flag or by adding your desired port number to the ",(0,l.mdx)("a",{parentName:"p",href:"#environment-variables"},(0,l.mdx)("inlineCode",{parentName:"a"},".env")," file"),", for example, ",(0,l.mdx)("inlineCode",{parentName:"p"},"PORT=9000"),"."),(0,l.mdx)("pre",{parentName:"li"},(0,l.mdx)("code",{parentName:"pre",className:"language-terminal"},"aio api-mesh run mesh.json --port 9000\n")),(0,l.mdx)("p",{parentName:"li"},"The console indicates your server status. If your build is successful, your mesh will be accessible at ",(0,l.mdx)("inlineCode",{parentName:"p"},"http://localhost:5000/graphql")," by default."),(0,l.mdx)("p",{parentName:"li"},"Use the ",(0,l.mdx)("inlineCode",{parentName:"p"},"--select")," argument with the ",(0,l.mdx)("inlineCode",{parentName:"p"},"run")," command to deploy the mesh artifact in the selected workspace without rebuilding it."))),(0,l.mdx)("h3",{id:"local-development-files"},"Local development files"),(0,l.mdx)("p",null,"The ",(0,l.mdx)("inlineCode",{parentName:"p"},"aio api-mesh:init")," command creates the following files locally:"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},".devcontainer/devcontainer.json")," - Allows the mesh to run local development in a container, such as GitHub Codespaces."),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},".github/workflows/deploy.yaml")," - Adds example workflows for GitHub Actions, such as ",(0,l.mdx)("a",{parentName:"li",href:"../best-practices/cicd.md"},"CI/CD"),"."),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},".vscode/launch.json")," - sets up a debug configuration for Visual Studio Code and GitHub Codespaces."),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},".env")," - A sample ",(0,l.mdx)("a",{parentName:"li",href:"#environment-variables"},"environment variables")," file."),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"mesh.json")," - A sample mesh configuration file."),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"README.md")," - Provides basic information about local development.")),(0,l.mdx)(s,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,l.mdx)("p",null,"Other files will vary depending on your selections during the ",(0,l.mdx)("inlineCode",{parentName:"p"},"aio api-mesh:init")," dialog."),(0,l.mdx)("h2",{id:"environment-variables"},"Environment variables"),(0,l.mdx)("p",null,"Environment variables allow developers to make changes to a single variable, with one or more occurrences, across multiple meshes. An ",(0,l.mdx)("inlineCode",{parentName:"p"},".env")," file will be created automatically when running the ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshinit"},(0,l.mdx)("inlineCode",{parentName:"a"},"init")," command"),"."),(0,l.mdx)("p",null,"The ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshcreate"},(0,l.mdx)("inlineCode",{parentName:"a"},"create"))," and ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshupdate"},(0,l.mdx)("inlineCode",{parentName:"a"},"update"))," commands support the use of an ",(0,l.mdx)("inlineCode",{parentName:"p"},"--env")," flag, which allows you to provide an environment variables file location. For example:"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-bash"},"aio api-mesh:create ../mesh.json --env .env_adhoc\n")),(0,l.mdx)(s,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,l.mdx)("p",null,"If your mesh contains environment variables, but you have not specified a variable file, the ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshcreate"},(0,l.mdx)("inlineCode",{parentName:"a"},"create"))," or ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshupdate"},(0,l.mdx)("inlineCode",{parentName:"a"},"update"))," commands look for your variables in a file named ",(0,l.mdx)("inlineCode",{parentName:"p"},".env")," in the current directory."),(0,l.mdx)("p",null,"The variables in your ",(0,l.mdx)("inlineCode",{parentName:"p"},".env")," file are inserted into your mesh when the mesh is created or updated. The following is an example of an ",(0,l.mdx)("inlineCode",{parentName:"p"},".env")," file:"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-typescript"},"APIName='Adobe Commerce API'\ncommerceURL='<your_endpoint>'\nincludeHTTPDetailsValue=true\nPORT=9000\n")),(0,l.mdx)("p",null,"The following mesh uses the preceding ",(0,l.mdx)("inlineCode",{parentName:"p"},".env")," file to populate the name and endpoint for the first source, as well as the state of the ",(0,l.mdx)("inlineCode",{parentName:"p"},"includeHTTPDetails")," flag."),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "meshConfig": {\n        "sources": [\n            {\n                "name": "{{env.APIName}}",\n                "handler": {\n                    "graphql": {\n                        "endpoint": "{{env.commerceURL}}"\n                    }\n                }\n            }\n        ],\n        "responseConfig":{\n            "includeHTTPDetails":{{env.includeHTTPDetailsValue}}\n        }\n    }\n}\n')),(0,l.mdx)("p",null,"In the previous example, since ",(0,l.mdx)("inlineCode",{parentName:"p"},"includeHTTPDetailsValue")," expects a boolean value and not a string, the corresponding variable for that value ",(0,l.mdx)("inlineCode",{parentName:"p"},"{{env.includeHTTPDetailsValue}}")," is not enclosed in quotes. If you have strict settings in your IDE that prevent you from saving JSON similar to the previous example, you can instead save the mesh configuration file as a ",(0,l.mdx)("inlineCode",{parentName:"p"},".txt"),"."),(0,l.mdx)("p",null,"After running the ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshcreate"},(0,l.mdx)("inlineCode",{parentName:"a"},"create"))," or ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshupdate"},(0,l.mdx)("inlineCode",{parentName:"a"},"update"))," command with the ",(0,l.mdx)("inlineCode",{parentName:"p"},"--env")," flag, the published mesh will look like the following:"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "meshConfig": {\n        "sources": [\n            {\n                "name": "Adobe Commerce API",\n                "handler": {\n                    "graphql": {\n                        "endpoint": "<your_endpoint>"\n                    }\n                }\n            }\n        ],\n        "responseConfig":{\n            "includeHTTPDetails":true\n        }\n    }\n}\n')),(0,l.mdx)("p",null,"You can confirm that your variables were updated successfully by running the ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshget"},(0,l.mdx)("inlineCode",{parentName:"a"},"aio api-mesh:get")," command"),"."),(0,l.mdx)("h2",{id:"reference-files-directly"},"Reference files directly"),(0,l.mdx)("p",null,"In addition to ",(0,l.mdx)("a",{parentName:"p",href:"../basic/handlers/index.md#reference-local-files-in-handlers"},"qualifying the ",(0,l.mdx)("inlineCode",{parentName:"a"},"content")," of a file manually"),", you can directly reference a file in your mesh for automatic conversion. The following restrictions apply:"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},"Only ",(0,l.mdx)("inlineCode",{parentName:"li"},"JS")," and ",(0,l.mdx)("inlineCode",{parentName:"li"},"JSON")," file formats are allowed."),(0,l.mdx)("li",{parentName:"ul"},"The referenced file's path must be less than 25 characters."),(0,l.mdx)("li",{parentName:"ul"},"The referenced file must be in the same directory as the mesh file that references it."),(0,l.mdx)("li",{parentName:"ul"},"The file cannot be in the ",(0,l.mdx)("inlineCode",{parentName:"li"},"~")," or ",(0,l.mdx)("inlineCode",{parentName:"li"},"home")," directory.")),(0,l.mdx)("p",null,"The following example references the ",(0,l.mdx)("inlineCode",{parentName:"p"},"requestParams.json")," file. When this mesh is created or updated, the contents of that file are automatically minified, stringified, and added to the ",(0,l.mdx)("inlineCode",{parentName:"p"},"files")," array."),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "meshConfig": {\n    "sources": [\n      {\n        "name": "<json_source_name>",\n        "handler": {\n          "JsonSchema": {\n            "baseUrl": "<json_source__baseurl>",\n            "operations": [\n              {\n                "type": "Query",\n                "field": "<query>",\n                "path": "<query_path>",\n                "method": "POST",\n                "requestSchema": "./requestParams.json"\n              }\n            ]\n          }\n        }\n      }\n    ]\n  }\n}\n')),(0,l.mdx)("p",null,"For example, if ",(0,l.mdx)("inlineCode",{parentName:"p"},"requestParams.json")," contained the following:"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "$schema": "http://json-schema.org/draft-01/schema",\n  "type": "object"\n}\n')),(0,l.mdx)("p",null,"Then the mesh is updated to include the minified, stringified file:"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "meshConfig": {\n    "sources": [\n      {\n        "name": "<json_source_name>",\n        "handler": {\n          "JsonSchema": {\n            "baseUrl": "<json_source__baseurl>",\n            "operations": [\n              {\n                "type": "Query",\n                "field": "<query>",\n                "path": "<query_path>",\n                "method": "POST",\n                "responseSchema": "./schemaBody.json"\n              }\n            ]\n          }\n        }\n      }\n    ],\n    "files": [\n      {\n        "path": "./schemaBody.json",\n        "content": "{\\"$schema\\":\\"http://json-schema.org/draft-01/schema\\",\\"type\\":\\"object\\"}"\n      }\n    ]\n  }\n}\n')),(0,l.mdx)("p",null,"You can confirm that your file was attached successfully by running the ",(0,l.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshget"},(0,l.mdx)("inlineCode",{parentName:"a"},"aio api-mesh:get")," command"),"."),(0,l.mdx)("h2",{id:"schedule-performance-testing"},"Schedule performance testing"),(0,l.mdx)(o.A,{mdxType:"Performance"}))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-mesh-advanced-developer-tools-md-ff66083225b051bfbdb1.js.map