---
title: API Mesh prompting guide
description: Learn how to use AI prompting techniques to generate API Mesh configurations.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# API Mesh prompting guide

One of the fastest ways to build an API Mesh configuration file is by using AI to assist with writing the boilerplate code. When building, iterating on, or debugging meshes using AI tools and Large Language Models (LLMs), a well-structured and extensive prompt helps provide the model with clearer guidelines and examples that can dramatically improve output.

The [API Mesh starter kit repository](https://github.com/adobe-commerce/api-mesh-starter-kit/) also contains resources and examples for generating Adobe API Mesh configurations using AI prompting techniques.

These resources can help developers quickly build, test, and deploy meshes by leveraging Cursor's AI capabilities and structured prompting rules.

**Relevant files:**

The following files are used when prompting your agent to create a mesh. You can review the contents of these files for a better understanding the context provided to the agent. You can also customize these files to address your specific mesh generation needs.

- [`llm.txt`](https://github.com/adobe-commerce/api-mesh-starter-kit/blob/main/llm.txt) - Source context and knowledge base for API Mesh
- [`.cursor/rules/api-mesh.mdc`](https://github.com/adobe-commerce/api-mesh-starter-kit/blob/main/.cursor/rules/api-mesh.mdc) - Active Cursor AI rules for this project

<InlineAlert variant="help" slots="text"/>

The API Mesh starter kit also allows you to [create a mesh from a template](./template.md).

## Prerequisites

The following prerequisites are required to use mesh prompting:

<InlineAlert variant="info" slots="text"/>

While you can use alternative coding agents, this guide focuses on creating meshes using Cursor.

- A coding agent - [Cursor](https://cursor.com/download) is recommended.
- Node.js 18+
- The Adobe I/O CLI: 

  ```bash
  npm install -g @adobe/aio-cli
  ```

- The API Mesh plugin:

  ```bash
  aio plugins:install @adobe/aio-cli-plugin-api-mesh
  ```

Clone the repo and open the project in Cursor.

## Create a mesh with a prompt

Select the desired model, and instruct your agent to create a mesh that fits your needs. For example:

```text
Create a mesh configuration that connects my Adobe Commerce GraphQL and a custom REST API. The mesh should include an authentication hook.
```

Review the responses of the AI, which should instruct you on manual steps, like adding your API URLs to the environment variables file.

### Troubleshooting

If you encounter an error, ask the agent for assistance. For example:

```text
My mesh is returning a 401 error. How do I debug this locally?
```

## Contributing

Adobe welcomes contributions of new patterns, prompts, and examples. As you discover them, please submit a pull request to the [API Mesh starter kit repository](https://github.com/adobe-commerce/api-mesh-starter-kit/) with your changes.
