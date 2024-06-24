module.exports = [
    {
        title: 'Overview',
        path: '/gateway/index.md',
        pages: [
            {
                title: 'What is API Mesh?',
                path: '/gateway/index.md'
            },
            {
                title: `Use cases`,
                path: `/gateway/use-cases.md`,
            },            
            {
                title: `Security`,
                path: `/gateway/security.md`,
            }
        ],
    },
    {
        title: 'API Mesh basics',
        path: '/gateway/getting-started.md',
        pages: [
            {
                title: 'Getting started',
                path: '/gateway/getting-started.md',
            },
            {
                title: 'Create a mesh',
                path: '/gateway/create-mesh.md'
            },
            {
                title: 'Work with your mesh',
                path: '/gateway/work-with-mesh.md'
            },
            {
                title: 'Add sources to your mesh',
                path: '/gateway/handlers.md',
                pages: [
                    {
                        title: 'Overview',
                        path: '/gateway/handlers.md'
                    },
                    {
                        title: 'OpenAPI',
                        path: '/gateway/handlers/openapi.md'
                    },
                    {
                        title: 'GraphQL',
                        path: '/gateway/handlers/graphql.md'
                    },
                    {
                        title: 'JSON schemas',
                        path: '/gateway/handlers/json-schema.md'
                    },
                    {
                        title: 'SOAP',
                        path: '/gateway/handlers/soap.md'
                    },
                ]
            },
            {
                title: 'Transform your data',
                path: '/gateway/transforms/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: '/gateway/transforms/index.md'
                    },
                    {
                        title: 'Bare vs wrap transforms',
                        path: '/gateway/transforms/bare-vs-wrap.md'
                    },
                    {
                        title: 'Encapsulate',
                        path: '/gateway/transforms/encapsulate.md'
                    },
                    {
                        title: 'Federation',
                        path: '/gateway/transforms/federation.md'
                    },
                    {
                        title: 'Filter schema',
                        path: '/gateway/transforms/filter-schema.md'
                    },
                    {
                        title: 'Naming convention',
                        path: '/gateway/transforms/naming-convention.md'
                    },
                    {
                        title: 'Prefix',
                        path: '/gateway/transforms/prefix.md'
                    },
                    {
                        title: 'Rename',
                        path: '/gateway/transforms/rename.md'
                    },
                    {
                        title: 'Replace field',
                        path: '/gateway/transforms/replace-field.md'
                    },
                    {
                        title: 'Type merging',
                        path: '/gateway/transforms/type-merging.md'
                    }      
                ]
            },
        ],
    },
    {
        title: 'Advanced Features',
        path: '/gateway/cache-control-headers.md',
        pages: [
            {
                title: 'Caching',
                path: '/gateway/cache-control-headers.md',
                pages: [
                    {
                        title: 'Cache-control headers',
                        path: '/gateway/cache-control-headers.md'
                    },
                    {
                        title: 'Dynamic content caching with Fastly',
                        path: '/gateway/fastly.md'
                    },
                ]
            },
            {
                title: 'CORS headers',
                path: '/gateway/cors.md'
            },
            {
                title: 'Extend your mesh',
                path: '/gateway/extending-unified-schema.md',
            },
            {
                title: 'Request and response headers',
                path: '/gateway/headers.md'
            },
            {
                title: 'Hooks',
                path: '/gateway/hooks.md',
            },
            {
                title: 'Local development',
                path: '/gateway/developer-tools.md'
            },
            {
                title: 'Command reference',
                path: '/gateway/command-reference.md'
            },
        ]
    },
    {
        title: 'Best practices',
        path: '/gateway/batching.md',
        pages: [
            {
                title: 'Batching ',
                path: '/gateway/batching.md',
            },
            {
                title: 'CI/CD implementation',
                path: '/gateway/cicd.md'
            },
            {
                title: 'Multiple APIs',
                path: '/gateway/multiple-apis.md'
            },
        ]
    },
    {
        title: 'Release information',
        path: '/gateway/release-notes.md',
        pages: [
            {
                title: 'Release notes',
                path: '/gateway/release-notes.md'
            },
            {
                title: 'Upgrade versions',
                path: '/gateway/upgrade.md'
            },
        ]
    },
    {
        title: 'Additional resources',
        path: '/gateway/mesh_walkthrough.md',
        pages: [

            {
                title: 'API Mesh tutorial',
                path: '/gateway/mesh_walkthrough.md'
            },
            {
                title: `Video tutorials`,
                path: `https://experienceleague.adobe.com/docs/commerce-learn/api-mesh/getting-started-api-mesh.html`,
                EventTarget: `_blank`
            },
            {
                title: `Understanding Extensibility`,
                path: `https://developer.adobe.com/commerce/extensibility/app-development/examples/`,
                EventTarget: `_blank`
            }
        ]
    }
]