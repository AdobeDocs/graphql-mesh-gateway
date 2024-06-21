module.exports = [
    {
        title: 'Overview',
        path: '/gateway/',
        pages: [
            {
                title: 'What is API Mesh?',
                path: '/gateway/'
            },
            {
                title: `Use cases`,
                path: `/gateway/use-cases`,
            },            
            {
                title: `Security`,
                path: `/gateway/security`,
            }
        ],
    },
    {
        title: 'API Mesh basics',
        path: '/gateway/getting-started/',
        pages: [
            {
                title: 'Getting started',
                path: '/gateway/getting-started',
            },
            {
                title: 'Create a mesh',
                path: '/gateway/create-mesh'
            },
            {
                title: 'Create a mesh from a template',
                path: '/gateway/template'
            },
            {
                title: 'Work with your mesh',
                path: '/gateway/work-with-mesh'
            },
            {
                title: 'Add sources to your mesh',
                path: '/gateway/handlers',
                pages: [
                    {
                        title: 'Overview',
                        path: '/gateway/handlers'
                    },
                    {
                        title: 'OpenAPI',
                        path: '/gateway/handlers/openapi'
                    },
                    {
                        title: 'GraphQL',
                        path: '/gateway/handlers/graphql'
                    },
                    {
                        title: 'JSON schemas',
                        path: '/gateway/handlers/json-schema'
                    },
                    {
                        title: 'SOAP',
                        path: '/gateway/handlers/soap'
                    },
                ]
            },
            {
                title: 'Transform your data',
                path: '/gateway/transforms',
                pages: [
                    {
                        title: 'Overview',
                        path: '/gateway/transforms/'
                    },
                    {
                        title: 'Bare vs wrap transforms',
                        path: '/gateway/transforms/bare-vs-wrap'
                    },
                    {
                        title: 'Encapsulate',
                        path: '/gateway/transforms/encapsulate'
                    },
                    {
                        title: 'Federation',
                        path: '/gateway/transforms/federation'
                    },
                    {
                        title: 'Filter schema',
                        path: '/gateway/transforms/filter-schema'
                    },
                    {
                        title: 'Naming convention',
                        path: '/gateway/transforms/naming-convention'
                    },
                    {
                        title: 'Prefix',
                        path: '/gateway/transforms/prefix'
                    },
                    {
                        title: 'Rename',
                        path: '/gateway/transforms/rename'
                    },
                    {
                        title: 'Replace field',
                        path: '/gateway/transforms/replace-field'
                    },
                    {
                        title: 'Type merging',
                        path: '/gateway/transforms/type-merging'
                    }      
                ]
            },
        ],
    },
    {
        title: 'Advanced Features',
        path: '/gateway/cache-control-headers',
        pages: [
            {
                title: 'Caching',
                path: '/gateway/cache-control-headers',
                pages: [
                    {
                        title: 'Cache-control headers',
                        path: '/gateway/cache-control-headers'
                    },
                    {
                        title: 'Dynamic content caching with Fastly',
                        path: '/gateway/fastly'
                    },
                ]
            },
            {
                title: 'CORS headers',
                path: '/gateway/cors'
            },
            {
                title: 'Extend your mesh',
                path: '/gateway/extending-unified-schema',
                pages: [
                    {
                        title: 'Extend the schema with custom resolvers',
                        path: '/gateway/extending-unified-schema'
                    },
                ]
            },
            {
                title: 'Request and response headers',
                path: '/gateway/headers'
            },
            {
                title: 'Hooks',
                path: '/gateway/hooks',
            },
            {
                title: 'Local development',
                path: '/gateway/developer-tools'
            },
            {
                title: 'Command reference',
                path: '/gateway/command-reference'
            },
        ]
    },
    {
        title: 'Best practices',
        path: '/gateway/batching',
        pages: [
            {
                title: 'Batching ',
                path: '/gateway/batching',
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
    path: '/gateway/release-notes',
    pages: [
        {
            title: 'Release notes',
            path: '/gateway/release-notes'
        },
        {
            title: 'Upgrade versions',
            path: '/gateway/upgrade'
        },
    ]
    },
    {
    title: 'Additional resources',
    path: '/gateway/mesh_walkthrough',
    pages: [

        {
            title: 'API Mesh tutorial',
            path: '/gateway/mesh_walkthrough'
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