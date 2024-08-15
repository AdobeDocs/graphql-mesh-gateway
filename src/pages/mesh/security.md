---
title: Security
description: Learn about the security used in API Mesh.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Security

The data plane used by API Mesh is public but requires a MeshID and an Adobe I/O account to access.

API Mesh honors any downstream authorization headers provided by your [sources](./basic/handlers/index.md).

If you require additional authentication or authorization, you can use [custom resolvers](./advanced/extend/resolvers/index.md).

## DDoS and rate limiting

Distributed denial-of-service (DDoS) attack protection, rate limiting, and throttling are provided at a global level by Adobe I/O Runtime. For more individualized protection, we recommend adding a Content Delivery Network (CDN), such as [Fastly](./advanced/caching/fastly.md), through [edge caching](./advanced/caching/).

Rate limiting mitigates DDoS threats by preventing a traffic source from sending too many requests. API Mesh controls the incoming traffic to our servers by limiting the number of requests that the API can receive within a given period. If the limit is reached before the time expires, the policy rejects all requests, which avoids any additional load on the API Mesh service and the backend source APIs within your mesh configurations. This is a global policy, covering the entire service. In the event you are rate limited, your mesh will produce an `HTTP 429 Too Many Requests` response status code.

If you encounter repeated `429` response codes, or for any other security issues, contact API Mesh support through Zendesk.
