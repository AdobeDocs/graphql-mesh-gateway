---
title: Context state
description: Use context state to persist values across requests.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Context state

API Mesh uses context state to provide a concise interface allowing developers to persist reusable values.

You can interact with state keys by using the `get`, `put`, and `delete` commands. These values are globally distributed, making them available at the edge.

This state is available to all [hooks](./hooks.md) and [resolvers](./extend/index.md).

## Use cases

While you could use these key-value pairs to store any value, they are often used to store tokens for authentication.

Consider a scenario where, due to rate limits, you cannot generate a token on every request, and instead you generate a token and store it in state, so other workers can reuse the token.

For more specific examples, see [hooks](./hooks.md) and [resolvers](./extend/index.md).

## Security

As stated in the [security responsibility matrix](../security.md#security-responsibilities-summary), users are responsible for managing their state data.

## Mesh configuration

To enable context state in your mesh, add `"enabled": true` to `state` in your mesh configuration:

```json
{
    "meshConfig": {
        "state": {
            "enabled": true
        },
        ...
    }
}
```

## Interact with state

To interact with state, you can use the `get`, `put`, and `delete` commands.

<InlineAlert variant="info" slots="text"/>

Context state is intended for ephemeral entries and not long-term persistence.

```typescript
interface StateApi {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, config?: { ttl?: number, blocking?: boolean }): Promise<void>;
    delete(key: string, config?: { blocking?: boolean }): Promise<void>
} 
```

### Put a key-value pair

The `put` command allows you to assign or update a value for a given key. A put is replicated to a globally available and fault-tolerant store. When an edge mesh attempts to get an entry, it will check a cache local to the edge serving the request. If the entry is not found, it will fetch the entry from the closest global replica of the entry. The entry is then cached on the edge for future reuse.

Context state is eventually consistent. Generally, entries are available instantly within the edge they are created in. It may take 60 seconds or more for changes to propagate globally.

You can also provide the following:

- Time-to-live (TTL) - (Optional) provide a TTL in seconds for the entry. The TTL defaults to `604800` seconds (7 days). TTL values must be between `60`  and `604800` seconds.

- Blocking - (Optional) provide a blocking flag for the operation. Defaults to `false`, allowing the mesh to proceed with code execution without waiting for a response. If blocking is `true`, the mesh will wait for a response, which allows you to ensure the operation was successful.

<InlineAlert variant="info" slots="text"/>

Setting the blocking flag to `true` can add latency to the overall query responses.

- Put a simple entry:

    ```typescript
    context.state.put('example_key', 'example_value');
    ```

- Put a complex entry containing multiple serialized JSON values

    ```typescript
    context.state.put('example_key', '{"example_key_1": "example_value_1", "example_key_2": "example_value_2"}');
    ```

- Put a simple entry with 10 minute TTL. This means the entry will no longer be available after 10 minutes:

    ```typescript
    context.state.put('example_key', 'example_value', { ttl: 600 });
    ```

- Put a simple entry in a blocking manor when verification of the put is required:

    ```typescript
    context.state.put('example_key', 'example_value', { blocking: true });
    ```

#### Limitations

When adding a key-value pair, you have the following limitations:

- Key and value type must be `string` or `binary`
- Maximum key size of `512 bytes`
- Maximum value size of `1 MB`

### Get a value

Get allows users to fetch a value for a given key.

- Get a value:

    ```typescript
    context.state.get('example_key');
    ```

### Delete a key

Delete allows users to delete a key and its associated value. A delete propagates to all edge locations.

You can also provide the following:

- Blocking - (Optional) a blocking flag for the operation. Defaults to `false` allowing mesh to proceed with code execution without waiting for a response. If blocking is `true`, the mesh will wait for a response, which allows you to ensure the delete was successful.

<InlineAlert variant="info" slots="text"/>

Setting the blocking flag to `true` can add latency to the overall query responses.

- Delete a key:

    ```typescript
    context.state.delete('example_key');
    ```

- Delete a key in a blocking manor when verification of the delete is required:

    ```typescript
    context.state.delete('example_key', 'example_value', { blocking: true });
    ```

## Adobe Commerce as a Cloud Service (SaaS) REST example

&#8203;<Edition name="saas" />

**Prerequisites**

- Add the **Adobe Commerce as a Cloud Service** API to your Developer Console workspace.
- Create an **OAuth Server-to-Server** credential for `client id`, `client secret`, and `scope`.

1. Create a secrets file for your mesh that contains the OAuth `client id`, `client secret`, and `scopes`.

    ```yaml secrets.yaml
    IMS_CLIENT_ID: <clientId>
    IMS_CLIENT_SECRET: <clientSecret>
    IMS_SCOPE: openid,AdobeID,additional_info.projectedProductContext,org.read,email,additional_info.roles,commerce.accs,profile
    ```

1. Create a hook that will authorize and cache the service-to-service token. In this example, we check for the presence of a valid token using context state shared across mesh edge locations. If a token is found, we validate the token to ensure it is still valid, then populate the token as a header.

    ```typescript hooks.js
    /**
     * Key name for storing the IMS auth token response in shared state.
     * @type {string}
     */
    const STATE_IMS_AUTH_TOKEN_KEY = "ims-service-token-response";

    /**
     * IMS endpoint for authorization.
     * @type {string}
     */
    const IMS_ENDPOINT = "https://ims-na1.adobelogin.com/ims/token/v3";

    /**
     * Generates an IMS auth token using the provided secrets.
     * @param secrets {{ IMS_CLIENT_ID: string, IMS_CLIENT_SECRET: string, IMS_SCOPE: string }} Mesh secrets.
     * @returns {Promise<{ access_token: string, expires_in: number, type: string }>} IMS auth token response.
     */
    async function generateToken(secrets) {
     const authResponse = await fetch(IMS_ENDPOINT, {
        method: "POST",
        header: {
        "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: secrets.IMS_CLIENT_ID,
            client_secret: secrets.IMS_CLIENT_SECRET,
            scope: secrets.IMS_SCOPE,
        }),
     });
      if (!authResponse.ok) {
        throw new Error(
            "IMS auth token generation failed: " + authResponse.statusText,
        );
      }
      return authResponse.json();
    }

    /**
     * Whether the IMS auth token is valid.
     * @param accessToken {string} Access token from IMS auth response.
     * @param expiresIn {number} Expiration time in seconds from IMS auth response.
     * @returns {boolean}
     */
    function isTokenValid({ accessToken, expiresIn }) {
	const now = Date.now();
	const expires = now + (expiresIn * 1000);
	return accessToken && now < expires;
    }

    module.exports = {
        accsRestAuth: async ({ context }) => {
            const { secrets } = context;
            let imsAuthTokenResponse;

            // Attempt to retrieve the IMS auth token response from shared state.
            try {
                imsAuthTokenResponse = JSON.parse(
                   context.state.get(STATE_IMS_AUTH_TOKEN_KEY),
                );
            } catch (err) {
            // Failed to parse the IMS auth token response from shared state.
        }

        // Validate the IMS auth token.
        let accessToken = imsAuthTokenResponse?.access_token;
        let expiresIn = imsAuthTokenResponse?.expires_in;
        if (!isTokenValid({ accessToken, expiresIn })) {
            // Token is invalid or expired, generate a new one.
            try {
                imsAuthTokenResponse = await generateToken(secrets);
            } catch (err) {
                // Failed to generate a new token. Return hook error state.
                return {
                    status: "ERROR",
                    message: "Service-to-service authentication failed.",
                };
            }

            // Store the new token in shared state for future use with a ttl of 24 hours.
            context.state.put(STATE_IMS_AUTH_TOKEN_KEY, imsAuthTokenResponse, {
                ttl: 86399,
            });
            accessToken = imsAuthTokenResponse?.access_token;
            }

            // Return hook success state with the access token in headers.
            return {
                status: "SUCCESS",
                message: "Authorized",
                data: {
                    headers: {
                        "x-ims-auth-token": accessToken,
                    },
                },
            };
        }
    };
    ```

1. Create a mesh referencing the hook. The following example defines a `beforeAll` hook that attempts to get the service-to-service header from context state and if the token is not valid or not present, the hook makes a request for a new token. It also defines a JSON schema source with an operational header matching the service-to-service token header name established in the hook.

    ```json
    {
      "meshConfig": {
        "sources": [
          {
            "name": "carts",
            "handler": {
              "JsonSchema": {
                "baseUrl": "https://na1-qa.api.commerce.adobe.com/{{ACCS_TENANT_ID}}",
                "operationHeaders": {
                  "authorization": "Bearer {context.headers['x-ims-auth-token']}"
                },
                "operations": [
                  {
                    "type": "Query",
                    "field": "data",
                    "path": "/v1/products/{args.sku}",
                    "method": "GET",
                    "responseTypeName": "Response",
                    "argTypeMap": {
                      "sku": {
                        "type": "string"
                      }
                    }
                  }
                ]
              }
            }
          }
        ],
        "plugins": [
          {
            "hooks": {
              "beforeAll": {
                "composer": "./hooks.js#accsRestAuth",
                "blocking": true
              }
            }
          }
        ]
      }
    } 
    ```

1. Then use product queries to ensure the authorization header is set in requests to the Commerce REST source. Refer to the [server-to-server authentication](https://developer.adobe.com/commerce/webapi/rest/authentication/server-to-server/) for examples.

## Hooks example

The following example shows how context state can be used in a [hook](./hooks.md) to cache a service-to-service token.

```javascript
module.exports = {
  isAuth: async ({ context }) => {
    const { secrets } = context;
    let authToken = context.state.get('authToken');
    
    if (!authToken) {
      const authResponse = await fetch('https://example.adobe.com/getServiceToken', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          Authorization: secrets.TOKEN,
        }
      });
      
      if (!authResponse.ok) {
        return {
          status: 'ERROR',
          message: 'Unauthorized',
        };
      }
      
      authToken = await authResponse.json();
      context.state.set('auth', authToken);
    }
    
    return {
      status: 'SUCCESS',
      message: 'Authorized',
      data: {
        headers: {
          'x-auth-token': authToken,
        },
      },
    };
  }
};
```

## Custom resolvers example

The following example shows how context state can be used in a [custom resolver](./extend/index.md) to cache a discount.

```javascript
module.exports = {
  resolvers: {
    ConfigurableProduct: {
      special_price: {
        selectionSet: '{ name price_range { maximum_price { final_price { value } } } }',
        resolve: (root, args, context, info) => {
          let max = 0;

          try {
            max = root.price_range.maximum_price.final_price.value;
          } catch (e) {
            // set a default value
            max = 0;
          }

          let discount = context.state.get(`${root.name}_discount`);

          if (!discount) {
            discount = context.DiscountsAPI.Query.discounts({
              root,
              args,
              context,
              info,
              selectionSet: '{ name discount }',
            })
              .then(response => {
                let discount = 0;
                const discountConfig = response.find(discount => discount.name === root.name);

                if (discountConfig) {
                  discount = discountConfig.discount;
                }

                return max * ((100 - discount) / 100);
              })
              .catch(() => {
                return null;
              });

            context.state.put(`${root.name}_discount`, newDiscount, { ttl: 3600 }); // cache for 1 hour
          }

          return discount;
        },
      },
    },
  },
};
```
