"use strict";(self.webpackChunkgraphql_mesh_gateway=self.webpackChunkgraphql_mesh_gateway||[]).push([[8153],{16799:function(e,a,n){n.r(a),n.d(a,{_frontmatter:function(){return p},default:function(){return s}});var t=n(58168),r=n(80045),m=(n(88763),n(15680)),o=n(83407);const i=["components"],p={},d={_frontmatter:p},l=o.A;function s(e){let{components:a}=e,n=(0,r.A)(e,i);return(0,m.mdx)(l,(0,t.A)({},d,n,{components:a,mdxType:"MDXLayout"}),(0,m.mdx)("h1",{id:"api-mesh-tutorial"},"API Mesh tutorial"),(0,m.mdx)("p",null,"This tutorial covers the basic actions you can perform in a mesh using API Mesh for Adobe Developer App Builder."),(0,m.mdx)("h2",{id:"prerequisites"},"Prerequisites"),(0,m.mdx)("ul",null,(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},"An Adobe IO account to access the ",(0,m.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/console"},"Adobe Developer Console"))),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},"Install ",(0,m.mdx)("a",{parentName:"p",href:"https://nodejs.org/en/download/package-manager"},(0,m.mdx)("inlineCode",{parentName:"a"},"Node.js"))),(0,m.mdx)("ul",{parentName:"li"},(0,m.mdx)("li",{parentName:"ul"},"You can run ",(0,m.mdx)("inlineCode",{parentName:"li"},"node -v")," and ",(0,m.mdx)("inlineCode",{parentName:"li"},"npm -v")," to determine if ",(0,m.mdx)("inlineCode",{parentName:"li"},"node.js")," is successfully installed.")),(0,m.mdx)("p",{parentName:"li"},"NOTE: Restart your IDE after installing ",(0,m.mdx)("inlineCode",{parentName:"p"},"node"),".")),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},"Install a Node Version Manager (",(0,m.mdx)("inlineCode",{parentName:"p"},"nvm"),")"),(0,m.mdx)("ul",{parentName:"li"},(0,m.mdx)("li",{parentName:"ul"},"(macOS and Linux) - ",(0,m.mdx)("a",{parentName:"li",href:"https://github.com/nvm-sh/nvm"},"Node Version Manager")),(0,m.mdx)("li",{parentName:"ul"},"(Windows) - ",(0,m.mdx)("a",{parentName:"li",href:"https://github.com/coreybutler/nvm-windows"},"nvm-windows")))),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},"Install the ",(0,m.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/runtime/docs/guides/tools/cli_install/"},"Adobe ",(0,m.mdx)("inlineCode",{parentName:"a"},"aio")," CLI")," with the following command:"),(0,m.mdx)("pre",{parentName:"li"},(0,m.mdx)("code",{parentName:"pre",className:"language-bash"},"npm install -g @adobe/aio-cli\n")))),(0,m.mdx)("h2",{id:"create-a-project-and-workspace"},"Create a project and workspace"),(0,m.mdx)("ol",null,(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"In the ",(0,m.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/console"},"Adobe Developer Console"),", select the desired organization from the dropdown in the top-right corner.")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Then click ",(0,m.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/developer-console/docs/guides/projects/projects-template/"},(0,m.mdx)("strong",{parentName:"a"},"Create project from template")),".")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Select ",(0,m.mdx)("strong",{parentName:"p"},"App Builder"),".")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Change the ",(0,m.mdx)("strong",{parentName:"p"},"Project title"),' to "my_test_workspace".')),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},'Click Save. You now have a project named "my_test_workspace" with workspaces named "Production" and "Stage".'))),(0,m.mdx)("h2",{id:"install-the-api-mesh-plugin"},"Install the API Mesh plugin"),(0,m.mdx)("p",null,"Install the ",(0,m.mdx)("a",{parentName:"p",href:"https://www.npmjs.com/package/@adobe/aio-cli-plugin-api-mesh"},"API Mesh plugin")," with the following command:"),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-bash"},"npm install -g @adobe/aio-cli-plugin-api-mesh\n")),(0,m.mdx)("h2",{id:"create-a-local-directory"},"Create a local directory"),(0,m.mdx)("p",null,'Create a local directory named "mesh_example". Then navigate to that directory in your CLI by using a command similar to:'),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-bash"},"cd my_path/mesh_example\n")),(0,m.mdx)("p",null,"This directory will contain your ",(0,m.mdx)("inlineCode",{parentName:"p"},"mesh.json")," file, the configuration file for your mesh."),(0,m.mdx)("h2",{id:"create-a-mesh"},"Create a mesh"),(0,m.mdx)("ol",null,(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Run the following command to log into Adobe IO:"),(0,m.mdx)("pre",{parentName:"li"},(0,m.mdx)("code",{parentName:"pre",className:"language-bash"},"aio login\n"))),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Create a file named ",(0,m.mdx)("inlineCode",{parentName:"p"},"mesh.json")," with the following contents:"),(0,m.mdx)("pre",{parentName:"li"},(0,m.mdx)("code",{parentName:"pre",className:"language-json"},'  {\n    "meshConfig": {\n      "sources": [\n        {\n          "name": "REST",\n          "handler": {\n            "openapi": {\n              "source": "https://venia.magento.com/rest/all/schema?services=all"\n            }\n          }\n        },\n        {\n          "name": "GraphQL",\n          "handler": {\n            "graphql": {\n              "endpoint": "https://venia.magento.com/graphql"\n            }\n          }\n        }\n      ]\n    }\n  }\n')),(0,m.mdx)("p",{parentName:"li"},"This mesh configuration file specifies the ",(0,m.mdx)("inlineCode",{parentName:"p"},"sources")," where you get data from and the ",(0,m.mdx)("inlineCode",{parentName:"p"},"transforms")," that manipulate that data. Here we are using ",(0,m.mdx)("inlineCode",{parentName:"p"},"venia.magento.com"),", which is a publicly available Adobe Commerce sample storefront.")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Run the following command:"),(0,m.mdx)("pre",{parentName:"li"},(0,m.mdx)("code",{parentName:"pre",className:"language-bash"},"aio api-mesh:create mesh.json\n"))),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Use the arrow keys to select the ",(0,m.mdx)("inlineCode",{parentName:"p"},"my_test_workspace")," Project and click ",(0,m.mdx)("strong",{parentName:"p"},"Enter"),". Type ",(0,m.mdx)("inlineCode",{parentName:"p"},"y")," to indicate you want to use this project for future operations. Then press the ",(0,m.mdx)("strong",{parentName:"p"},"Enter")," key.")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Use the arrow keys to select the ",(0,m.mdx)("inlineCode",{parentName:"p"},"stage")," Workspace and click ",(0,m.mdx)("strong",{parentName:"p"},"Enter"),". Type ",(0,m.mdx)("inlineCode",{parentName:"p"},"y")," and press the ",(0,m.mdx)("strong",{parentName:"p"},"Enter")," key to automatically select this Workspace in the future. You can ",(0,m.mdx)("a",{parentName:"p",href:"../basic/work-with-mesh.md#select-a-project-or-workspace"},"select another workspace")," at any time.")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Type ",(0,m.mdx)("inlineCode",{parentName:"p"},"y")," and click the ",(0,m.mdx)("strong",{parentName:"p"},"Enter")," key to confirm the creation of the mesh. The mesh configuration and corresponding details will display."),(0,m.mdx)("p",{parentName:"li"},"It can take a few minutes for new meshes to propagate. If you want to check the build progress, run the ",(0,m.mdx)("inlineCode",{parentName:"p"},"aio api-mesh:status")," command. After your mesh is successfully built, proceed to the next section."))),(0,m.mdx)("h2",{id:"access-the-mesh"},"Access the Mesh"),(0,m.mdx)("ol",null,(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Run the ",(0,m.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshdescribe"},(0,m.mdx)("inlineCode",{parentName:"a"},"aio api-mesh:describe"))," command and copy the URL for your mesh.")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Paste the URL into a GraphQL client, such as ",(0,m.mdx)("a",{parentName:"p",href:"https://altairgraphql.dev"},"Altair"),", ",(0,m.mdx)("a",{parentName:"p",href:"https://github.com/graphql/graphiql"},"GraphiQL"),", or ",(0,m.mdx)("a",{parentName:"p",href:"https://insomnia.rest/download"},"Insomnia"),".")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Determine if you can view the schema in the ",(0,m.mdx)("strong",{parentName:"p"},"Docs")," section of your GraphQL client. Refer to your GraphQL client's documentation to learn how to access the schema."),(0,m.mdx)("p",{parentName:"li"},"If you can view the schema, proceed to the next section. If you cannot view the schema, try the following:"),(0,m.mdx)("ul",{parentName:"li"},(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},"Check your mesh's sources. If you need to modify your mesh, use the ",(0,m.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshupdate"},(0,m.mdx)("inlineCode",{parentName:"a"},"aio api-mesh:update"))," command to update your mesh with the correct information.")),(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},"Open a web browser and determine if you have access to the Adobe Commerce sample storefront: ",(0,m.mdx)("a",{parentName:"p",href:"https://venia.magento.com"},"https://venia.magento.com"),"."))))),(0,m.mdx)("h2",{id:"run-a-query"},"Run a query"),(0,m.mdx)("p",null,"In your GraphQL client, run the following GraphQL queries:"),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-graphql"},"{\n  storeConfig {\n    store_code\n    store_name\n    base_currency_code\n  }\n  GetV1DirectoryCountries {\n    ... on directory_data_country_information_interface {\n      id\n      two_letter_abbreviation\n  }\n }\n}\n")),(0,m.mdx)("p",null,"These queries demonstrate how you can return data from multiple sources within your mesh with a single request."),(0,m.mdx)("p",null,"The ",(0,m.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/commerce/webapi/graphql/schema/store/queries/store-config/"},(0,m.mdx)("inlineCode",{parentName:"a"},"storeConfig"))," query returns information from the ",(0,m.mdx)("inlineCode",{parentName:"p"},"GraphQL")," handler, while the ",(0,m.mdx)("a",{parentName:"p",href:"https://adobe-commerce.redoc.ly/2.4.6-admin/tag/directorycountries#operation/GetV1DirectoryCountries"},"GetV1DirectoryCountries")," query returns information from the ",(0,m.mdx)("inlineCode",{parentName:"p"},"REST"),"  handler."),(0,m.mdx)("h2",{id:"add-a-transform"},"Add a transform"),(0,m.mdx)("p",null,"Now we will apply the ",(0,m.mdx)("inlineCode",{parentName:"p"},"prefix")," transform to prevent conflicting field names between sources. In the following example, we will add ",(0,m.mdx)("inlineCode",{parentName:"p"},"REST_")," and ",(0,m.mdx)("inlineCode",{parentName:"p"},"GraphQL_")," prefixes to help us distinguish between our two handlers."),(0,m.mdx)("ol",null,(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Modify your ",(0,m.mdx)("inlineCode",{parentName:"p"},"mesh.json")," file to match the following:"),(0,m.mdx)("pre",{parentName:"li"},(0,m.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "meshConfig": {\n    "sources": [\n      {\n        "name": "CommerceREST",\n        "handler": {\n          "openapi": {\n            "source": "https://venia.magento.com/rest/all/schema?services=all"\n          }\n        },\n        "transforms": [\n          {\n            "prefix": {\n              "value": "REST_"\n            }\n          }\n        ]\n      },\n      {\n        "name": "CommerceCoreGraph",\n        "handler": {\n          "graphql": {\n            "endpoint": "https://venia.magento.com/graphql"\n          }\n        },\n        "transforms": [\n          {\n            "prefix": {\n              "value": "GraphQL_"\n            }\n          }\n        ]\n      }\n    ]\n  }\n}\n')),(0,m.mdx)("p",{parentName:"li"},"These ",(0,m.mdx)("inlineCode",{parentName:"p"},"transforms")," apply a ",(0,m.mdx)("inlineCode",{parentName:"p"},"prefix")," to both sources, which will modify field names in the schema to begin with either ",(0,m.mdx)("inlineCode",{parentName:"p"},"REST_")," or ",(0,m.mdx)("inlineCode",{parentName:"p"},"GraphQL_"),", depending on which source they are from.")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Update your mesh by using the following command:"),(0,m.mdx)("pre",{parentName:"li"},(0,m.mdx)("code",{parentName:"pre",className:"language-bash"},"aio api-mesh:update mesh.json\n"))),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},'After you have successfully updated, return to your GraphQL client and open the schema. Search for "GraphQL" or "REST" to see if the ',(0,m.mdx)("inlineCode",{parentName:"p"},"prefix")," transform was successful. It can take a few minutes for updated meshes to propagate. You can check the status of your mesh by running the ",(0,m.mdx)("inlineCode",{parentName:"p"},"aio api-mesh:status")," command.")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Run the following query, which adds both the ",(0,m.mdx)("inlineCode",{parentName:"p"},"REST_")," and the ",(0,m.mdx)("inlineCode",{parentName:"p"},"GraphQL_")," prefixes."),(0,m.mdx)("pre",{parentName:"li"},(0,m.mdx)("code",{parentName:"pre",className:"language-graphql"},"{\n  storeConfig {\n    ... on GraphQL_StoreConfig {\n      store_code\n      store_name\n      base_currency_code\n    }\n  }\n  GetV1DirectoryCountries {\n    ... on REST_directory_data_country_information_interface {\n      id\n      two_letter_abbreviation\n    }\n  }\n}\n")))),(0,m.mdx)("h2",{id:"add-a-source"},"Add a source"),(0,m.mdx)("p",null,"You can use the ",(0,m.mdx)("a",{parentName:"p",href:"../advanced/index.md#aio-api-meshsourceinstall"},"source commands")," to install preconfigured first and third-party sources. You can find available sources by running the ",(0,m.mdx)("inlineCode",{parentName:"p"},"aio api-mesh:source:discover")," command or visiting the Adobe ",(0,m.mdx)("a",{parentName:"p",href:"https://github.com/adobe/api-mesh-sources"},"api-mesh-sources")," repository."),(0,m.mdx)("ol",null,(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"Run the following source command. The response might ask you to reselect your Workspace and Project."),(0,m.mdx)("pre",{parentName:"li"},(0,m.mdx)("code",{parentName:"pre",className:"language-bash"},"aio api-mesh:source:install CommerceCatalogServiceGraph\n"))),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"When you are prompted to enter an API Key, enter a placeholder value like ",(0,m.mdx)("inlineCode",{parentName:"p"},"1234567890")," and press the ",(0,m.mdx)("strong",{parentName:"p"},"Enter")," key.")),(0,m.mdx)("li",{parentName:"ol"},(0,m.mdx)("p",{parentName:"li"},"After you have successfully added the source, run the following command to view your updated mesh configuration."))),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-bash"},"aio api-mesh:get\n")))}s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-mesh-resources-index-md-95a1e15d168eb4c5850b.js.map