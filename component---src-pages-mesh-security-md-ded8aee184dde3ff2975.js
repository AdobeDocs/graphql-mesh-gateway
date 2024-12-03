"use strict";(self.webpackChunkgraphql_mesh_gateway=self.webpackChunkgraphql_mesh_gateway||[]).push([[2401],{22507:function(e,t,n){n.r(t),n.d(t,{_frontmatter:function(){return d},default:function(){return h}});var a=n(58168),i=n(80045),r=(n(88763),n(15680)),o=n(83407);const s=["components"],d={},c={_frontmatter:d},u=o.A;function h(e){let{components:t}=e,n=(0,i.A)(e,s);return(0,r.mdx)(u,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"security"},"Security"),(0,r.mdx)("p",null,"The data plane used by API Mesh is public but requires a MeshID and an Adobe I/O account to access."),(0,r.mdx)("p",null,"API Mesh honors any downstream authorization headers provided by your ",(0,r.mdx)("a",{parentName:"p",href:"./basic/handlers/index.md"},"sources"),"."),(0,r.mdx)("p",null,"If you require additional authentication or authorization, you can use ",(0,r.mdx)("a",{parentName:"p",href:"./advanced/extend/resolvers/index.md"},"custom resolvers"),"."),(0,r.mdx)("h2",{id:"ddos-and-rate-limiting"},"DDoS and rate limiting"),(0,r.mdx)("p",null,"Distributed denial-of-service (DDoS) attack protection, rate limiting, and throttling are provided at a global level by Adobe I/O Runtime. For more individualized protection, we recommend adding a Content Delivery Network (CDN), such as ",(0,r.mdx)("a",{parentName:"p",href:"./advanced/caching/fastly.md"},"Fastly"),", through ",(0,r.mdx)("a",{parentName:"p",href:"./advanced/caching/"},"edge caching"),"."),(0,r.mdx)("p",null,"Rate limiting mitigates DDoS threats by preventing a traffic source from sending too many requests. API Mesh controls the incoming traffic to our servers by limiting the number of requests that the API can receive within a given period. If the limit is reached before the time expires, the policy rejects all requests, which avoids any additional load on the API Mesh service and the backend source APIs within your mesh configurations. This is a global policy, covering the entire service. In the event you are rate limited, your mesh will produce an ",(0,r.mdx)("inlineCode",{parentName:"p"},"HTTP 429 Too Many Requests")," response status code."),(0,r.mdx)("p",null,"If you encounter repeated ",(0,r.mdx)("inlineCode",{parentName:"p"},"429")," response codes, or for any other security issues, contact API Mesh support through Zendesk."))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-mesh-security-md-ded8aee184dde3ff2975.js.map