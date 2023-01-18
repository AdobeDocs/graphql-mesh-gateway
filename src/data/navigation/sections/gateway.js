module.exports = [
    {
        title: 'Overview',
        path: '/gateway',
        header: true,
        pages: [
            {
                title: 'Getting started',
                path: '/gateway/getting-started',
            },
            {
                title: 'What is API Mesh?',
                path: '/gateway/overview'
            },
        ],
    },
    {
        title: 'Working with your mesh',
        path: '/gateway/create-mesh/',
        header: true,
        pages: [
            {
                title: 'Create a mesh',
                path: '/gateway/create-mesh'
            },
            {
                title: 'Source handlers',
                path: '/gateway/source-handlers',
            },
            {
                title: 'Transforms',
                path: '/gateway/transforms',
                pages: [
                    {
                        title: 'Hooks transform',
                        path: '/gateway/hooks',
                    },
                ],
            },
            {
                title: 'Headers',
                path: '/gateway/headers'
            },
            {
                title: 'Edge caching and cache control',
                path: '/gateway/cache-control-headers'
            },
        ],
    },
    {
        title: 'Resources',
        path: '/gateway/command-reference',
        header: true,
        pages: [
            {
                title: 'Command reference',
                path: '/gateway/command-reference'
            },
            {
                title: 'Release notes',
                path: '/gateway/release-notes'
            },
            {
                title: 'Upgrade versions',
                path: '/gateway/upgrade'
            },
        ]
    }
    ]