---
title: Dynamic cache control with Fastly
description: Learn how to configure a dynamic cache control with API Mesh using Fastly and Adobe Commerce.
keywords:
  - API Mesh
  - Extensibility
  - Cache
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Dynamic cache control with Fastly

Adding a content delivery network (CDN) for caching dynamic content with API Mesh for Adobe Developer App Builder provides additional security and improved performance. Follow these instructions to integrate API Mesh, Adobe Commerce, and [Fastly](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/cdn/fastly.html?lang=en) (provided with Adobe Commerce Pro accounts).

## Configure headers in API Mesh

<InlineAlert variant="info" slots="text"/>

After adding VCL snippets in the [Fastly Setup](#configure-fastly-in-adobe-commerce), your Commerce GraphQL URL is now in the following format: `<Commerce-URL>/api/<meshId>/graphql`

To distinguish between requests from users and requests from API Mesh, use the following source operation header to prevent Fastly from caching headers that come directly from API Mesh:

```json
"x-commerce-bypass-fastly-cache": "true" 
```

When bypassing the cache, you must also specify which headers should be preserved in the `responseConfig`:

```json
"responseConfig": {
  "headers": [
    "x-magento-cache-id",
    "x-magento-tags",
    "set-cookie",
    "pragma",
    "cache-control",
    "expires",
    "x-content-type-options",
    "x-xss-protection",
    "x-platform-server"
  ]
}
```

Using Fastly also requires all queries to be `GET` queries. `POST` queries are not cached. To enforce this in your mesh, add the following configuration option:

`"useGETForQueries": true`

<InlineAlert variant="info" slots="text"/>

Use the [`fastly-debug:1`](https://developer.fastly.com/reference/http/http-headers/Fastly-Debug/) request header to get more information from Fastly on each request. Adobe does not recommend using debug headers in production environments.

### Fastly example mesh

The following example mesh specifies the headers to cache, enables the cache bypass, and sets all queries to pass as `GET` queries.

```json
{
  "meshConfig": {
    "responseConfig": {
      "includeHTTPDetails": true
    },
    "sources": [
      {
        "name": "Core",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql",
            "operationHeaders": {
              "x-magento-cache-id": "{context.headers['x-magento-cache-id']}",
              "Store": "{context.headers['store']}" ,
              "Authorization": "{context.headers['authorization']}",
              "Content-Type": "application/json",
              "x-commerce-bypass-fastly-cache": "true"
            },
            "useGETForQueries": true
          }
        },
        "responseConfig": {
          "headers": [
            "x-magento-cache-id",
            "x-cache",
            "x-magento-tags",
            "set-cookie",
            "pragma",
            "cache-control",
            "expires",
            "x-content-type-options",
            "x-xss-protection",
            "x-platform-server"
          ]
        }
      }
    ]
  }
}
```

### Cache header prefixing

API Mesh prefixes any Fastly source headers with their source name. For example, a source named "commerce" with an `x-magento-cache-id` header is converted to `x-commerce-magento-cache-id`. However, if your endpoint URL contains "magento", API Mesh assumes you are connecting to an Adobe Commerce instance and does not prefix your headers with a source name. Using the previous example, your header would remain `x-magento-cache-id`.

### Test your mesh

After you [create](../../basic/create-mesh.md#create-a-mesh) or [update](../../basic/create-mesh.md#update-an-existing-mesh) your mesh, run an [`aio api-mesh:describe`](../../advanced/index.md#aio-api-meshdescribe) command to view your mesh URL. Run a query against this URL to confirm that your mesh is working correctly.

## Configure Fastly in Adobe Commerce

The following sections describe how to configure Fastly in Adobe Commerce.

### Add VCL snippets

After setting up your API Mesh, open your Adobe Commerce Admin and use the following steps to configure dynamic content caching with the provided Fastly CDN. You will need access to the following prerequisites:

- Adobe Commerce
  - Admin access
- API Mesh
  - The ability to create or update a mesh

1. [Get the following Fastly credentials](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/cdn/setup-fastly/fastly-configuration.html?lang=en#get-fastly-credentials):

   - Fastly Service ID
   - Fastly API Token

1. In the Adobe Commerce Admin, select **Store** > Settings > **Configuration** > **Advanced** > **System** > **Full Page Cache** and set the **Caching Application** field to **Fastly CDN**.

1. Enter the Fastly credentials you retrieved previously into the **Fastly Service ID** and **Fastly API Token** fields. Then click the **Test Credentials** button to verify that your credentials are correct.

  ![fastly-credentials](../../../_images/fastly-credentials.png)

1. Under **Fastly Configuration** > **Custom VCL Snippets** click **Create** and add the following [snippets](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/cdn/custom-vcl-snippets/fastly-vcl-custom-snippets.html). For more information on VCL subroutines, see [Custom Subroutines](https://developer.fastly.com/reference/vcl/subroutines/).

  **NOTE**: The `Priority` of each VCL snippet determines the order in which VCL subroutines are executed. The following `Priority` fields only apply to the default configuration of Adobe Commerce. If you have other custom snippets, you will need to adjust the priorities accordingly.

   - Allows API Mesh to function as a [Fastly backend](https://developer.fastly.com/reference/vcl/declarations/backend/).
     - **Name** - api_mesh_backend
     - **Type** - **init**
     - **Priority** - **1**
     - **Content**:
  
        ```csharp
        # Backend declaration
        backend F_edge_graph_adobe_io {
            .always_use_host_header = true;
            .between_bytes_timeout = 30s;
            .connect_timeout = 30s;
            .dynamic = true;
            .first_byte_timeout = 15s;
            .host = "edge-graph.adobe.io";
            .host_header = "edge-graph.adobe.io";
            .keepalive_time = 25s;
            .max_connections = 200;
            .port = "443";
            .share_key = "XXXXXXXXXXXXXXXX";
            .ssl = true;
            .ssl_cert_hostname = "edge-graph.adobe.io";
            .ssl_check_cert = always;
            .ssl_sni_hostname = "edge-graph.adobe.io";
            .max_tls_version = "1.3";
            .min_tls_version = "1.3";
            .probe = {
                .dummy = true;
                .initial = 5;
                .request = "HEAD / HTTP/1.1" "Host: edge-graph.adobe.io" "Connection: close";
                .threshold = 1;
                .timeout = 2s;
                .window = 5;
            }
        }
        ```

   - Enables the bypass header in API Mesh:
     - **Name** - api_mesh_recv
     - **Type** - **recv**
     - **Priority** - **10**
     - **Content**:

        ```csharp
        # set mesh backend for /api/ requests
        if (req.url ~ "^/api/") {
          set req.backend = F_edge_graph_adobe_io;
        }
        
        if (req.http.x-commerce-bypass-fastly-cache == "true") {
          return (pass);
        }

        # Determines what GraphQL can be cached
        if ((req.request == "GET" || req.request == "HEAD") && (req.url.path ~ "/graphql" || req.url ~ "^/api/(.*)") && req.url.qs ~ "query=") {
          set req.http.graphql = "1";
        } else {
          unset req.http.graphql;
        }
        
        if (req.url.path !~ "/graphql" && req.url !~ "^/api/(.*)") {
          set req.http.Magento-Original-URL = req.url;
          set req.url = querystring.regfilter(req.url, "^(utm_.*|gclid|gdftrk|_ga|mc_.*|trk_.*|dm_i|_ke|sc_.*|fbclid)$");
        }
        ```

   - Cache fetch:
     - **Name** - api_mesh_fetch
     - **Type** - **fetch**
     - **Priority** - **10**
     - **Content**:

        ```csharp
        if (req.http.x-commerce-bypass-fastly-cache == "true") {
          return (pass);
        }
        ```

   - Cache deliver:
     - **Name** - api_mesh_deliver
     - **Type** - **deliver**
     - **Priority** - **10**
     - **Content**:

        ```csharp
        if (req.http.x-commerce-bypass-fastly-cache == "true") {
          return (deliver);
        }
        ```

     - **Name** - keep-alive-vcl-miss
       - **Type** - **miss**
       - **Priority** - **100**
       - **Content**:

        ```csharp
        set bereq.http.Connection = "keep-alive";
        ```

     - **Name** - keep-alive-vcl-pass
       - **Type** - **pass**
       - **Priority** - **100**
       - **Content**:

        ```csharp
        set bereq.http.Connection = "keep-alive";
        ```

In **Fastly Configuration** click **Upload VCL to Fastly**. Click **Save Config**.

#### Configure Fastly Next-Gen WAF

If you are using Adobe Commerce with Fastly Next-Gen WAF enabled, you must add the following VCL snippet, which prevents the WAF from inspecting the request twice. Not adding this snippet causes the Next-Gen WAF to strip headers from the request, which can cause errors.

- **Name** - api_mesh_inspection
- **Type** - **recv**
- **Priority** - **1**
- **Content**:

  ```csharp
  if (table.lookup(eds_domains, req.http.Host)  &&  req.url ~ "/graphql"){
    set req.http.x-sigsci-no-inspection = "disabled";
  }
  ```

### Configure default backend

The default backend does not handle "/api/" requests. To allow API requests, add a condition to the existing backend:

1. In **Fastly Configuration > Backend Settings**, click on the gear icon next to **<project_id>.magento.cloud**.

1. Click **Create a new request condition** and add a condition like the following example:

     - **Name** - default_backend
     - **Apply if...**:

        ```csharp
        req.url !~ "^/api/"
        ```

1. Click **Create** on the condition.
1. Click **Create** on the backend.

## Test your configuration

Run the following cURL command, replacing `<Commerce-URL>` and `<Magento-Cache-Id>` with your Adobe Commerce storefront values.

```bash
curl --globoff --include '<Commerce-URL>/api/<meshId>/graphql?query={products(search%3A%20%22c%22){items{sku}}}' --header 'x-magento-cache-id: <Magento-Cache-Id>' --header 'Fastly-Debug: 1' -w "\n\ntime_starttransfer: %{time_starttransfer}\n"
```

Review the values of the `x-cache` and `x-cache-hits` headers to determine if the cache is being used. The first time you run this query, the headers should return:

```yaml
x-cache: MISS, MISS, MISS
x-cache-hits: 0
```

Two `MISS` values and `0` hits indicate that the cache was not used in this query. Run the cURL command again and you should see the values change to the following:

```yaml
x-cache: MISS, HIT, MISS
x-cache-hits: 1 
```

A value of `MISS, HIT` and `1` or more hits indicates that the cache is in use. You can also verify cache usage by comparing cached and uncached response times.
