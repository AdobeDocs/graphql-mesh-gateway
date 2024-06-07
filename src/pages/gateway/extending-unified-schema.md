---
title: Extend the schema with custom resolvers
description: Learn how to extend the unified schema with resolvers.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

# Extend the schema with custom resolvers

The [multiple APIs](./multiple-apis.md) topic explains how `additionalResolvers` can shape and augment the unified schema with custom resolvers.

Alternatively, using the `additionalResolvers` config allows you to upload a custom resolver as a [`JavaScript` file](./handlers/index.md#reference-local-files-in-handlers) to the Mesh.

## Programmatic `additionalResolvers`

In this example, we will use `additionalResolvers` to apply a set of discounts to products in Adobe Commerce. The following example uses two handlers:

- The `Venia` handler is a publicly available Adobe Commerce GraphQL endpoint for the Venia sample storefront.

- The `DiscountsAPI` handler points to [a `.json` file](https://raw.githubusercontent.com/AdobeDocs/graphql-mesh-gateway/main/src/pages/_examples/discounts-api.json) that contains key-value pairs of sample item names and their corresponding discount percentages.

```json
{
  "meshConfig": {
    "sources": [
      {
        "name": "Venia",
        "handler": {
          "graphql": {
            "endpoint": "https://venia.magento.com/graphql",
            "useGETForQueries": true
          }
        }
      },
      {
        "name": "DiscountsAPI",
        "handler": {
          "JsonSchema": {
            "baseUrl": "https://raw.githubusercontent.com/AdobeDocs/graphql-mesh-gateway/main/src/pages/_examples",
            "operations": [
              {
                "type": "Query",
                "field": "discounts",
                "path": "/discounts-api.json",
                "method": "GET",
                "responseSample": "https://raw.githubusercontent.com/AdobeDocs/graphql-mesh-gateway/main/src/pages/_examples/discounts-api.json"
              }
            ]
          }
        }
      }
    ],
    "additionalResolvers": [
      "./additional-resolvers.js"
    ]
  }
}
```

Create a JavaScript file named `additional-resolvers.js` in the same directory as your mesh. Add the following contents to the file:

<CodeBlock slots="heading, code" repeat="1" languages="js" />

#### `additional-resolvers.js`

```js
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

                    return context.DiscountsAPI.Query.discounts({
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
                },
            },
        },
    },
};
```

This `javascript` file targets the `special_price` field on `ConfigurableProduct` that uses the `maximum_price` for a product and then applies the discount listed for that product in the [`discountsapi.json` file](https://raw.githubusercontent.com/AdobeDocs/graphql-mesh-gateway/main/src/pages/_examples/discounts-api.json). The following arguments define how the `custom resolver` interacts with your mesh:

- `special_price` - the name of the field we are adding a custom resolver to

- `selectionSet` - the information from the parent field, `ConfigurableProduct`, that the `special_price` field needs to resolve

- `root`, `context`, `args`, and `info` - are the parameters provided to the new resolver function

Running the following query results in a response that lists the original `maximum_price` value and the `special_price` that was calculated using the `DiscountsAPI` file. In this example, we are searching for "sweater", but you could modify it to search for any products.

In the following response, you can see that the "Roxana Cropped Sweater" and the "Hanna Sweater" we specified in our `discounts-api.json` file have a `special_price` that is 10% less than their `value`.

<CodeBlock slots="heading, code" repeat="2" languages="graphql, json" />

#### GraphQL Query

```graphql
{
  products(search: "sweater") {
    items {
      name
      special_price
      price_range {
        maximum_price {
          final_price {
            value
          }
        }
      }
    }
  }
}
```

#### Response

```json
{
    "data": {
        "products": {
            "items": [
                {
                    "name": "Juno Sweater",
                    "special_price": 54.4,
                    "price_range": {
                        "maximum_price": {
                            "final_price": {
                                "value": 54.4
                            }
                        }
                    }
                },
                {
                    "name": "Hanna Sweater",
                    "special_price": 70.56,
                    "price_range": {
                        "maximum_price": {
                            "final_price": {
                                "value": 78.4
                            }
                        }
                    }
                },
                {
                    "name": "Echo Sweater",
                    "special_price": 62.4,
                    "price_range": {
                        "maximum_price": {
                            "final_price": {
                                "value": 62.4
                            }
                        }
                    }
                },
                {
                    "name": "Corina Lace-Back Sweater",
                    "special_price": 86.4,
                    "price_range": {
                        "maximum_price": {
                            "final_price": {
                                "value": 86.4
                            }
                        }
                    }
                },
                {
                    "name": "Roxana Cropped Sweater",
                    "special_price": 56.16,
                    "price_range": {
                        "maximum_price": {
                            "final_price": {
                                "value": 62.4
                            }
                        }
                    }
                },
                {
                    "name": "Helena Cardigan",
                    "special_price": 78.4,
                    "price_range": {
                        "maximum_price": {
                            "final_price": {
                                "value": 78.4
                            }
                        }
                    }
                },
                {
                    "name": "Rosalina Cardigan",
                    "special_price": 78.4,
                    "price_range": {
                        "maximum_price": {
                            "final_price": {
                                "value": 78.4
                            }
                        }
                    }
                },
                {
                    "name": "Brigid Boucle Cardigan",
                    "special_price": 94.4,
                    "price_range": {
                        "maximum_price": {
                            "final_price": {
                                "value": 94.4
                            }
                        }
                    }
                }
            ]
        }
    },
    "extensions": {}
}
```
