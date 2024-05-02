module.exports = [
    {
        title: 'Overview',
        path: '/gateway/overview',
        pages: [
            {
                title: 'What is API Mesh?',
                path: '/gateway/overview'
            },
        ],
    },
    {
        title: 'Working with your mesh',
        path: '/gateway/create-mesh/',
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
                title: 'Work with your mesh',
                path: '/gateway/work-with-mesh'
            },
            {
                title: 'Add sources to your mesh',
                path: '/gateway/source-handlers',
                pages: [
                    {
                        title: 'Overview',
                        path: '/reference/handlers/index'
                    },
                    {
                        title: 'OpenAPI',
                        path: '/reference/handlers/openapi'
                    },
                    {
                        title: 'GraphQL',
                        path: '/reference/handlers/graphql'
                    },
                    {
                        title: 'JSON schemas',
                        path: '/reference/handlers/json-schema'
                    },
                    {
                        title: 'SOAP',
                        path: '/reference/handlers/soap'
                    },
                ]
            },
            {
                title: 'Transform your data',
                path: '/gateway/transforms',
                pages: [
                    {
                        title: 'Overview',
                        path: '/reference/transforms/index'
                    },
                    {
                        title: 'Encapsulate',
                        path: '/reference/transforms/encapsulate'
                    },
                    {
                        title: 'Federation',
                        path: '/reference/transforms/federation'
                    },
                    {
                        title: 'Filter schema',
                        path: '/reference/transforms/filter-schema'
                    },
                    {
                        title: 'Naming convention',
                        path: '/reference/transforms/naming-convention'
                    },
                    {
                        title: 'Prefix',
                        path: '/reference/transforms/prefix'
                    },
                    {
                        title: 'Rename',
                        path: '/reference/transforms/rename'
                    },
                    {
                        title: 'Replace field',
                        path: '/reference/transforms/replace-field'
                    },
                    {
                        title: 'Type merging',
                        path: '/reference/transforms/type-merging'
                    }      
                ]
            },
        ],
    },
    {
        title: 'Advanced Features',
        path: '/gateway/command-reference',
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
                title: 'Extend your mesh',
                path: '/gateway/cors',
                pages: [
                    {
                        title: 'CORS headers',
                        path: '/gateway/cors'
                    },
                    {
                        title: 'Extend the schema with custom resolvers',
                        path: '/gateway/extending-unified-schema'
                    },
                ]
            },
            {
                title: 'Headers',
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
        path: '/gateway/command-reference',
        pages: [

            {
                title: 'API Mesh walkthrough',
                path: '/gateway/mesh_walkthrough'
            },

            {
                title: 'Batching ',
                path: '/gateway/batching',
            },
            {
                title: 'Release notes',
                path: '/gateway/release-notes'
            },
            {
                title: 'Upgrade versions',
                path: '/gateway/upgrade'
            },
            {
                title: `Videos`,
                path: `https://experienceleague.adobe.com/docs/commerce-learn/api-mesh/getting-started-api-mesh.html`,
                EventTarget: `_blank`
            },
            {
                title: `Understanding Extensibility`,
                path: `https://developer.adobe.com/commerce/extensibility/app-development/examples/`,
                EventTarget: `_blank`
            },
        ]
    },
    {
        title: 'Best practices',
        path: '/gateway/command-reference',
        pages: [
            {
                title: 'Batching ',
                path: '/gateway/batching',
            },
            {
                title: 'Multiple APIs',
                path: '/reference/multiple-apis.md'
            },
            {
                title: 'Combining multiple sources',
                path: '/reference/combining-multiple-sources.md'
            },
        ]
    },
{
    title: 'Release information',
    path: '/gateway/command-reference',
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
    path: '/gateway/command-reference',
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