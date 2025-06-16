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

API Mesh offers a unified GraphQL endpoint for serving requests. Developers must prioritize the security of this endpoint to prevent potential attacks. If the endpoint is not properly protected, attackers could crawl the GraphQL endpoint and exploit the GraphiQL interface console.

API Mesh implements several global security controls that are enabled by default and cannot be changed. These controls include automatic DDoS prevention, a Web Application Firewall (WAF), and a 60-second timeout applied to all requests.

## Authentication

Adobe recommends enforcing authentication across any APIs connected to API Mesh. API Mesh does not provide native authentication, but it will propagate the corresponding source level authorization header to your backend API.

Other authentication considerations:

* The data plane used by API Mesh is public but requires a MeshID to access.
* API Mesh honors any downstream authorization headers provided by your [sources](./basic/handlers/index.md).
* If you require additional authentication or authorization, you can use [custom resolvers](./advanced/extend/resolvers/index.md).

## DDoS and rate limiting

API Mesh provides distributed denial-of-service (DDoS) attack protection at a global level. API mesh also provides a Web Application Firewall (WAF) that protects your mesh endpoints.

Rate limiting mitigates DDoS threats by preventing a traffic source from sending too many requests. API Mesh controls the incoming traffic to our servers by limiting the number of requests that the API can receive within a given period. If the limit is reached before the time expires, the policy rejects all requests, which avoids any additional load on the API Mesh service and the backend source APIs within your mesh configurations. This is a global policy, covering the entire service. In the event you are rate limited, your mesh will produce the following response status code: `HTTP 429 Too Many Requests`.

If you encounter repeated `429` response codes, or for any other security issues, contact [API Mesh support](https://experienceleague.adobe.com/home?support-tab=home#support).

## GraphQL introspection

While introspection is useful for developers using your APIs, if you are using APIs that are intended for your applications only, introspection is likely not needed.

As a general API security strategy, Adobe recommends [disabling introspection](./basic/work-with-mesh.md#disable-introspection) in production environments to reduce your attack surface.

## Restrict CORS domains

API Mesh provides [cross-origin resource sharing (CORS)](./advanced/cors.md), which allows you to pass resources that are usually restricted to an outside domain.

## Response caching

[Caching GraphQL queries](./advanced/caching/index.md) or [query batching](./advanced/extend/batching.md) can help reduce the number of calls made to your backend API. Query batching can also preserve the data consistency of responses and reduce the load on your backend APIs.

## Secrets management

API Mesh allows you to use [secrets](./advanced/secrets.md) in your mesh configuration file to securely manage sensitive information. API Mesh encrypts secrets using AES-256 encryption.

## Tenant isolation

API Mesh provides tenant isolation by default. The combination of Enterprise Organization, Project, and Workspace namespace defines a granular tenant, which is isolated for each mesh.

## Security responsibilities summary

API Mesh relies on a shared responsibility security and operational model. These responsibilities are shared between Adobe and customers. Each party bears distinct responsibility for securing and operating API Mesh.

The following summary tables use the RACI model to show the security responsibilities shared between Adobe and customers.

R — Responsible
A — Accountable
C — Consulted
I — Informed

| Task | Adobe | Customers | CDN Provider[^1] |
|------|-------|-----------|--------------|
| DDoS Protection | R | I | R |
| Defining API Mesh WAF rules | R | | |
| Deploying API Mesh WAF rules | R | | |
| Deploying infrastructure updates into production | R | | A |
| Deploying infrastructure updates into staging | R | | A |
| Creating, updating, or deleting mesh configurations | | R | |
| Deploying mesh configurations into production | A | R | |
| Deploying mesh configurations into staging | A | R | |
| Integrating external applications and extensions | | R | |
| Configuring logging | | R | |
| Accessing Experience League support portal | R | C | |
| Following API Mesh security best practices | | R | |
| Resolving API Mesh customer security issues | C | R | C |
| Resolving API Mesh security issues | R | | |
| Resolving CDN security issues | A | | R |
| Assisting Adobe with security research (software) | R | C | |
| Assisting Adobe with security research (scans/audits) | R | C | |
| Performing PCI ASV scans on API Mesh | R | | |
| Remediating API Mesh PCI scans | R | | |
| Performing PCI ASV scans on origin APIs | | R | |
| Remediating origin API PCI scans | | R | |
| Monitoring security logs | R | I | |

[^1] The CDN provider column refers to a CDN managed and provided by API Mesh.
