/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  siteMetadata: {
    home: {
      hidden: true
    },
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
      path: '/guides/gateway/command-reference.md',
      header: true,
      pages: [
      {
        title: 'Command reference',
        path: '/guides/gateway/command-reference.md'
      },
    ]
  },
  ]
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || '/dev-site-documentation-template/'
};
