module.exports = [
{
          pages: [
            {
              title: 'Adobe Graph',
              path: '/guides/gateway/index.md'
            },
          ],
          subPages: [
            {
            title: 'Overview',
            path: '/guides/gateway/index.md',
            header: true,
            pages: [      
            {
              title: 'Adobe Graph overview',
              path: '/guides/gateway/index.md',
            },
            {
              title: 'Getting started',
              path: '/guides/gateway/getting-started.md',
            }
            ],
          },
            {
              title: 'Working with your mesh',
              path: '/guides/gateway/create-tenant.md',
              header: true,
              pages: [
                {
                  title: 'Create a tenant',
                  path: '/guides/gateway/create-tenant.md'
                },
                {
                  title: 'Source handlers',
                  path: '/guides/gateway/source-handlers.md',
                },
                {
                  title: 'Transforms',
                  path: '/guides/gateway/transforms.md'
                },
                {
                  title: 'Headers',
                  path: '/guides/gateway/headers.md'
                }
              ]
            },
            {
            title: 'Utilities',
            path: '/guides/gateway/create-tenant.md',
            header: true,
            pages: [
            {
              title: 'Command reference',
              path: '/guides/gateway/command-reference.md'
            },
          ]
        },
        ]
    }
]
