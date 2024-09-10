module.exports = [
    {
        title: "Overview",
        path: "/mesh/index.md",
        pages: [
            {
                title: "What is API Mesh?",
                path: "/mesh/index.md"
            },
            {
                title: "Use cases",
                path: "/mesh/use-cases.md",
            },            
            {
                title: "Security",
                path: "/mesh/security.md",
            }
        ],
    },
    {
        title: "API Mesh basics",
        path: "/mesh/basic/",
        pages: [
            {
                title: "Getting started",
                path: "/mesh/basic/",
            },
            {
                title: "Create a mesh",
                path: "/mesh/basic/create-mesh.md"
            },
            {
                title: "Work with your mesh",
                path: "/mesh/basic/work-with-mesh.md"
            },
            {
                title: "Local development",
                path: "/mesh/advanced/developer-tools.md"
            },
            {
                title: "Add sources to your mesh",
                path: "/mesh/basic/handlers/",
                pages: [
                    {
                        title: "Handlers",
                        path: "/mesh/basic/handlers/"
                    },
                    {
                        title: "OpenAPI",
                        path: "/mesh/basic/handlers/openapi.md"
                    },
                    {
                        title: "GraphQL",
                        path: "/mesh/basic/handlers/graphql.md"
                    },
                    {
                        title: "JSON schemas",
                        path: "/mesh/basic/handlers/json-schema.md"
                    },
                    {
                        title: "SOAP",
                        path: "/mesh/basic/handlers/soap.md"
                    },
                ]
            },
            {
                title: "Transform your data",
                path: "/mesh/basic/transforms/",
                pages: [
                    {
                        title: "Transforms",
                        path: "/mesh/basic/transforms/"
                    },
                    {
                        title: "Bare vs wrap transforms",
                        path: "/mesh/basic/transforms/bare-vs-wrap.md"
                    },
                    {
                        title: "Encapsulate",
                        path: "/mesh/basic/transforms/encapsulate.md"
                    },
                    {
                        title: "Federation",
                        path: "/mesh/basic/transforms/federation.md"
                    },
                    {
                        title: "Filter schema",
                        path: "/mesh/basic/transforms/filter-schema.md"
                    },
                    {
                        title: "Naming convention",
                        path: "/mesh/basic/transforms/naming-convention.md"
                    },
                    {
                        title: "Prefix",
                        path: "/mesh/basic/transforms/prefix.md"
                    },
                    {
                        title: "Rename",
                        path: "/mesh/basic/transforms/rename.md"
                    },
                    {
                        title: "Replace field",
                        path: "/mesh/basic/transforms/replace-field.md"
                    },
                    {
                        title: "Type merging",
                        path: "/mesh/basic/transforms/type-merging.md"
                    }      
                ]
            },
        ],
    },
    {
        title: "Advanced Features",
        path: "/mesh/advanced/",
        pages: [
            {
                title: "Command reference",
                path: "/mesh/advanced/"
            },
            {
                title: "Local development",
                path: "/mesh/advanced/developer-tools.md"
            },
            {
                title: "Caching",
                path: "/mesh/advanced/caching/",
                pages: [
                    {
                        title: "Cache-control headers",
                        path: "/mesh/advanced/caching/"
                    },
                    {
                        title: "Dynamic content caching with Fastly",
                        path: "/mesh/advanced/caching/fastly.md"
                    },
                ]
            },
            {
                title: "CORS headers",
                path: "/mesh/advanced/cors.md"
            },
            {
                title: "Extend your mesh",
                path: "/mesh/advanced/extend/",
                pages: [
                    {
                        title: "Extend your schema",
                        path: "/mesh/advanced/extend/"
                    },
                    {
                        title: "Customize resolved values",
                        path: "/mesh/advanced/extend/resolvers",
                        pages: [
                            {
                                title: "Declarative resolvers",
                                path: "/mesh/advanced/extend/resolvers"
                            },
                            {
                                title: "Programmatic resolvers",
                                path: "/mesh/advanced/extend/resolvers/programmatic-resolvers.md"
                            }
                        ]
                    },
                    {
                        title: "Batching ",
                        path: "/mesh/advanced/extend/batching.md"
                    },
                ]
            },
            {
                title: "Hooks",
                path: "/mesh/advanced/hooks.md",
            },
            {
                title: "Logging",
                path: "/mesh/advanced/logging.md",
            },
            {
                title: "Request and response headers",
                path: "/mesh/advanced/headers.md"
            },
            {
                title: "Secrets management",
                path: "/mesh/advanced/secrets.md"
            }
        ]
    },
    {
        title: "Best practices",
        path: "/mesh/best-practices/",
        pages: [
            {
                title: "Batching ",
                path: "/mesh/advanced/extend/batching.md"
            },
            {
                title: "Performance testing ",
                path: "/mesh/best-practices/performance.md",
            },
            {
                title: "CI/CD implementation",
                path: "/mesh/best-practices/cicd.md"
            },
            {
                title: "Custom resolvers",
                path: "/mesh/advanced/extend/index.md"
            },
            {
                title: "Local development",
                path: "/mesh/advanced/developer-tools.md"
            },           
            {
                title: "Secrets management",
                path: "/mesh/advanced/secrets.md"
            },
        ]
    },
    {
        title: "Release information",
        path: "/mesh/release/",
        pages: [
            {
                title: "Release notes",
                path: "/mesh/release/"
            },
            {
                title: "Update notice",
                path: "/mesh/release/update.md"
            }, 
            {
                title: "Upgrade versions",
                path: "/mesh/release/upgrade.md"
            },
        ]
    },
    {
        title: "Additional resources",
        path: "/mesh/resources/",
        pages: [

            {
                title: "API Mesh tutorial",
                path: "/mesh/resources/"
            },
            {
                title: "Video tutorials",
                path: "https://experienceleague.adobe.com/docs/commerce-learn/api-mesh/getting-started-api-mesh.html",
                EventTarget: "_blank"
            },
            {
                title: "Understanding Extensibility",
                path: "https://developer.adobe.com/commerce/extensibility/app-development/examples/",
                EventTarget: "_blank"
            }
        ]
    }
]