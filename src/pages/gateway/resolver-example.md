---
title: Custom resolver example
description: Learn how to extend the unified schema with resolvers.
keywords:
  - API Mesh
  - Extensibility
  - GraphQL
  - Integration
  - REST
  - Tools
---

[Custom resolvers](extending-unified-schema.md) allow you to customize the schemas you work with in API Mesh for Adobe Developer App Builder.

Custom resolvers allow you to chain multiple mutations together to perform complex operations. For example, to create a chain of mutations to add a product to a cart and set a shipping method in Adobe Commerce, use the following steps:

1. [Create a mesh](create-mesh.md) with the following configuration:

    ```JSON
    {
        "meshConfig": {
            "sources": [
            {
                "name": "Commerce",
                "handler": {
                "graphql": {
                    "endpoint": "https://venia.magento.com/graphql"
                }
                }
            }
            ],
            "additionalTypeDefs": "type AddProductsToCartAndSetShippingMethodOutput {\n  addProductsToCart: AddProductsToCartOutput\n  setShippingMethodsOnCart: SetShippingMethodsOnCartOutput\n}\n\nextend type Mutation {\n  addProductsToCartAndSetShippingMethod(\n    cartId: String!\n    product: CartItemInput!\n    shippingMethod: ShippingMethodInput!\n  ): AddProductsToCartAndSetShippingMethodOutput\n}\n",
            "additionalResolvers": [
            "./chainMutationResolver.js"
            ]
        }
    }
    ```

    This creates a mesh with a single Commerce source with the following additional type definitions:

    ```javascript
    type AddProductsToCartAndSetShippingMethodOutput {
        addProductsToCart: AddProductsToCartOutput
        setShippingMethodsOnCart: SetShippingMethodsOnCartOutput
    }

    extend type Mutation {
        addProductsToCartAndSetShippingMethod(
            cartId: String!
            product: CartItemInput!
            shippingMethod: ShippingMethodInput!
        ): AddProductsToCartAndSetShippingMethodOutput
    }
    ```

1. Create a [Custom resolver](extending-unified-schema.md) named `chainMutationResolver.js` with the following contents:

    ```javascript
    const { print } = require('graphql/language/printer');

    const getSubSelectionSet = (ast, subSelectionName) => {
        try {
            const selections = ast[0].selectionSet.selections;
            const { selectionSet } = selections.find(
                selection => selection.name.value === subSelectionName,
            );

            return print(selectionSet);
        } catch (err) {
            return null;
        }
    };

    module.exports = {
        resolvers: {
            Mutation: {
                addProductsToCartAndSetShippingMethod: {
                    resolve: (root, args, context, info) => {
                        const { cartId, product, shippingMethod } = args;
                        const addProductsToCartSelectionSet = getSubSelectionSet(
                            info.fieldNodes,
                            'addProductsToCart',
                        );
                        const setShippingMethodsOnCartSelectionSet = getSubSelectionSet(
                            info.fieldNodes,
                            'setShippingMethodsOnCart',
                        );

                        return context.Commerce.Mutation.addProductsToCart({
                            root,
                            args: { cartId, cartItems: [product] },
                            context,
                            info,
                            selectionSet: addProductsToCartSelectionSet,
                        })
                            .then(addProductsToCartResult => {
                                if (addProductsToCartResult.name && addProductsToCartResult.name === 'GraphQLError')
                                    return {
                                        addProductsToCart: addProductsToCartResult,
                                        setShippingMethodsOnCart: null,
                                    };
                                return context.Commerce.Mutation.setShippingMethodsOnCart({
                                    root,
                                    args: {
                                        input: {
                                            cart_id: cartId,
                                            shipping_methods: [shippingMethod],
                                        },
                                    },
                                    context,
                                    info,
                                    selectionSet: setShippingMethodsOnCartSelectionSet,
                                })
                                    .then(setShippingMethodsOnCartResult => {
                                        return {
                                            addProductsToCart: addProductsToCartResult,
                                            setShippingMethodsOnCart: setShippingMethodsOnCartResult,
                                        };
                                    })
                                    .catch(err => {
                                        throw err;
                                    });
                            })
                            .catch(err => {
                                throw err;
                            });
                    },
                },
            },
        },
    };
    ```

1. Add the following `JSON` to the variables section of your GraphQL client. You need to replace the values for these variables with values that correspond to your implementation of Adobe Commerce:

    ```json
    {
        "cartId": "123abcgN9dd8W6v77EPZjWf028PEDFgIpe",
        "shippingMethod": {
            "carrier_code": "flatrate",
            "method_code": "flatrate"
        },
        "product": {
            "sku": "VT02",
            "quantity": 1,
            "selected_options": [
            "Y29uZmlndXJhYmxlLzU0MC8xMDI=",
            "Y29uZmlndXJhYmxlLzU3My8xMzI="
            ]
        }
    }
    ```

1. Run the following test query against your mesh endpoint:

    ```graphql
     mutation testChainMutation(
            $cartId: String!
            $product: CartItemInput!
            $shippingMethod: ShippingMethodInput!
        ) {
            addProductsToCartAndSetShippingMethod(
                cartId: $cartId product: $product shippingMethod: $shippingMethod
            ) {
                addProductsToCart {
                    cart {
                        id
                        items {
                            quantity
                            product {
                                name
                                sku
                                price_range {
                                    maximum_price {
                                        final_price {
                                            currency
                                            value
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                setShippingMethodsOnCart {
                    cart {
                        shipping_addresses {
                            available_shipping_methods {
                                method_title
                                method_code
                                amount {
                                    currency
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }
    ```
