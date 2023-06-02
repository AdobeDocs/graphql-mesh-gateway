module.exports = [
    {
        title: 'GraphQL Mesh',
        path: '/reference/index.md'
    },
    {
        title: 'Handlers',
        path: '/reference/handlers/index.md',
        header: true,
        pages: [
            {
                title: 'Overview',
                path: '/reference/handlers/index.md'
            },
            {
                title: 'OpenAPI',
                path: '/reference/handlers/openapi.md'
            },
            {
                title: 'GraphQL',
                path: '/reference/handlers/graphql.md'
            },
            {
                title: 'JSON schemas',
                path: '/reference/handlers/json-schema.md'
            },
        ]
    },
    {
        title: 'Transforms',
        path: '/reference/transforms/index.md',
        header: true,
        pages: [
            {
                title: 'Overview',
                path: '/reference/transforms/index.md'
            },
            {
                title: 'Encapsulate',
                path: '/reference/transforms/encapsulate.md'
            },
            {
                title: 'Federation',
                path: '/reference/transforms/federation.md'
            },
            {
                title: 'Filter schema',
                path: '/reference/transforms/filter-schema.md'
            },
            {
                title: 'Naming convention',
                path: '/reference/transforms/naming-convention.md'
            },
            {
                title: 'Prefix',
                path: '/reference/transforms/prefix.md'
            },
            {
                title: 'Rename',
                path: '/reference/transforms/rename.md'
            },
            {
                title: 'Replace field',
                path: '/reference/transforms/replace-field.md'
            },
            {
                title: 'Type merging',
                path: '/reference/transforms/type-merging.md'
            }
            // {
            //     title: 'Hooks',
            //     path: '/gateway/hooks.md'
            // }
        ]
    },
    {
    title: 'Other',
    path: '/reference/multiple-apis.md',
    header: true,
    pages: [
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
];
