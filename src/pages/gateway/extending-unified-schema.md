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

[Combining multiple Sources](../reference/combining-multiple-sources.md) explains how `additionalResolvers` can shape and augment the unified schema with custom resolvers.

Alternatively, using the `additionalResolvers` config allows you to upload a custom resolver as a [`JavaScript` file](../reference/handlers/index.md#reference-local-files-in-handlers) to the Mesh.

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
    ],
    "files": [
      {
        "path": "./additional-resolvers.js",
        "content": "\r\nmodule.exports = {\r\n\tresolvers: {\r\n\t\tConfigurableProduct: {\r\n\t\t\tspecial_price: {\r\n\t\t\t\tselectionSet: \"{ name price_range { maximum_price { final_price { value } } } }\",\r\n\t\t\t\tresolve: (root, args, context, info) => {\r\n\t\t\t\t\tlet max = 0;\r\n\r\n\t\t\t\t\ttry {\r\n\t\t\t\t\t\tmax = root.price_range.maximum_price.final_price.value;\r\n\t\t\t\t\t} catch (e) {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\treturn context.DiscountsAPI.Query.discounts(\r\n\t\t\t\t\t\t{ root, args, context, info, selectionSet: \"{ name discount }\" }\r\n\t\t\t\t\t)\r\n\t\t\t\t\t\t.then((response) => {\r\n\t\t\t\t\t\t\tconst discountConfig = response.find((discount) => discount.name === root.name);\r\n\r\n\t\t\t\t\t\t\tif (discountConfig) {\r\n\t\t\t\t\t\t\t\treturn max * ((100 - discountConfig.discount) / 100);\r\n\t\t\t\t\t\t\t} else {\r\n\t\t\t\t\t\t\t\treturn max\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t})\r\n\t\t\t\t\t\t.catch(() => {\r\n\t\t\t\t\t\t\treturn null;\r\n\t\t\t\t\t\t});\r\n\t\t\t\t},\r\n\t\t\t},\r\n\t\t},\r\n\t},\r\n};\r\n"
      }
    ]
  }
}
```

The previous example contains a `files` object that contains the following `javascript`:

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
