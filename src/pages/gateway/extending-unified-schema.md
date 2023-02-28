---
title: Extending the Unified Schema
description: Learn how to extend the unified schema with resolvers.
---

# Extending the Unified Schema

[Combining multiple Sources](../reference/combining-multiple-sources.md) explains how `additionalResolvers` can shape and augment the unified schema with custom resolvers.

Alternatively, using an `additionalResolvers` custom resolver in API Mesh for Adobe Developer App Builder allows you to [attach a `JavaScript` or `TypeScript` file](../reference/handlers/index.md#reference-local-files-in-handlers) to export the custom resolver's implementation.

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
            "endpoint": "https://venia.magento.com/graphql"
          }
        }
      },
      {
        "name": "DiscountsAPI",
        "handler": {
          "JsonSchema": {
            "baseUrl": "https://raw.githubusercontent.com/AdobeDocs/graphql-mesh-gateway/main/src/pages/_examples/discounts-api.json",
            "operations": [
              {
                "type": "Query",
                "field": "discounts",
                "path": "/",
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
        "content": "\r\nmodule.exports = {\r\n\tresolvers: {\r\n\t\tConfigurableProduct: {\r\n\t\t\tspecial_price: {\r\n\t\t\t\tselectionSet: \"{ name price_range { maximum_price { final_price { value } } } }\",\r\n\t\t\t\tresolve: (root, args, context, info) => {\r\n\t\t\t\t\tlet max = 0;\r\n\r\n\t\t\t\t\ttry {\r\n\t\t\t\t\t\tmax = root.price_range.maximum_price.final_price.value;\r\n\t\t\t\t\t} catch (e) {\r\n\t\t\t\t\t\t// ignore\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\treturn context.DiscountsAPI.Query.discounts(\r\n\t\t\t\t\t\t{ root, args, context, info, selectionSet: \"{ name discount }\" }\r\n\t\t\t\t\t)\r\n\t\t\t\t\t\t.then((response) => {\r\n\t\t\t\t\t\t\tconst discountConfig = response.find((discount) => discount.name === root.name);\r\n\r\n\t\t\t\t\t\t\tif (discountConfig) {\r\n\t\t\t\t\t\t\t\treturn max * ((100 - discountConfig.discount) / 100);\r\n\t\t\t\t\t\t\t} else {\r\n\t\t\t\t\t\t\t\treturn max\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t})\r\n\t\t\t\t\t\t.catch(() => {\r\n\t\t\t\t\t\t\treturn null;\r\n\t\t\t\t\t\t});\r\n\t\t\t\t},\r\n\t\t\t},\r\n\t\t},\r\n\t},\r\n};\r\n"
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
						// ignore
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

This `javascript` file creates a `special_price` field that uses the `maximum_price` for a product and then applies the discount listed for that product in the [`discountsapi.json` file](https://raw.githubusercontent.com/AdobeDocs/graphql-mesh-gateway/main/src/pages/_examples/discounts-api.json). The following arguments define how the `javascript` interacts with your mesh:

- `special_price` - the name of the new field we are creating

- `selectionSet` - the information selected from the source that you want to mutate

- `root`, `context`, and `info` - mandatory parameters that are forwarded from the resolvers calling the method

- `args` - arguments to pass to the mutation or query

Running the following query results in a response that lists the original `maxmum_price` value and the `special_price` that was calculated using the `DiscountsAPI` file.

<CodeBlock slots="heading, code" repeat="2" languages="graphql, json" />

#### GraphQL Query

```graphql
{
  products(search: "tops") {
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
					"name": "Vitalia Top",
					"special_price": 68.992,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 78.4
							}
						}
					}
				},
				{
					"name": "Jillian Top",
					"special_price": 39.44,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 46.4
							}
						}
					}
				},
				{
					"name": "Anna Draped Top",
					"special_price": 52.800000000000004,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 70.4
							}
						}
					}
				},
				{
					"name": "Emilia Cropped Lace Top",
					"special_price": 31.2,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 62.4
							}
						}
					}
				},
				{
					"name": "Silver Cirque Earrings",
					"special_price": null,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 54.4
							}
						}
					}
				},
				{
					"name": "Veronica Maxi Dress",
					"special_price": 63.36000000000001,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 70.4
							}
						}
					}
				},
				{
					"name": "Karena Halter Dress",
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
					"name": "Gold Cirque Earrings",
					"special_price": null,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 54.4
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
					"name": "Cora Open-Back Tank",
					"special_price": 77.76,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 86.4
							}
						}
					}
				},
				{
					"name": "Claudia Crochet Dress",
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
					"name": "Davina Skirt",
					"special_price": 77.76,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 86.4
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
					"name": "Susanna Draped Tank",
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
					"name": "Chloe Silk Shell",
					"special_price": 48.96,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 54.4
							}
						}
					}
				},
				{
					"name": "Aurora Sleeveless Blouse",
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
					"name": "Bella Eyelet Capris",
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
					"name": "Night Out Collection",
					"special_price": null,
					"price_range": {
						"maximum_price": {
							"final_price": {
								"value": 492
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
