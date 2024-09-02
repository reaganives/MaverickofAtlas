const axios = require('axios');
const User = require('../models/User');

// Helper function to convert the variant ID to the global ID format
  const encodeVariantId = (variantId) => {
    const globalId = `gid://shopify/ProductVariant/${variantId}`;
    return Buffer.from(globalId).toString('base64');
};

// Fetch New Arrivals
exports.getNewArrivals = async (req, res) => {
  try {
    const shopifyResponse = await axios.get(
      `https://maverick-of-atlas.myshopify.com/admin/api/2023-07/products.json`,
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
      }
    );
    const products = shopifyResponse.data.products;

    // Filter and transform the data as needed
    const newArrivals = products.map(product => ({
      _id: product.id,
      name: product.title,
      description: product.body_html,
      price: product.variants[0].price,
      imageUrl: product.image.src,
      size: product.variants[0].option1,
      color: product.variants[0].option2,
      style: product.product_type,
    }));

    res.json(newArrivals);
  } catch (error) {
    console.error('Error fetching new arrivals from Shopify:', error);
    res.status(500).json({ error: 'Failed to fetch new arrivals' });
  }
};

// Get Product Details by ID
exports.getProductDetails = async (req, res) => {
  const { productId } = req.params;

  try {
    const shopifyResponse = await axios.get(
      `https://maverick-of-atlas.myshopify.com/admin/api/2023-07/products/${productId}.json`,
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    const product = shopifyResponse.data.product;

    // Transform product data
    const transformedProduct = {
      _id: product.id,
      name: product.title,
      description: product.body_html,
      images: product.images.map(image => ({
        id: image.id,
        src: image.src,
      })),
      variants: product.variants.map(variant => ({
        id: variant.id,
        size: variant.option2,
        color: variant.option1,
        price: variant.price,
        available: variant.inventory_quantity > 0,
        imageUrl: product.images.find(img => img.variant_ids.includes(variant.id))?.src || product.images[0]?.src,
      })),
    };

    res.json(transformedProduct);
  } catch (error) {
    console.error('Error fetching product details from Shopify:', error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};

// Add Item to Cart
exports.addItemToCart = async (req, res) => {
  try {
    const { variantId, quantity } = req.body;

    const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    const shopifyUrl = `https://maverick-of-atlas.myshopify.com/api/2023-07/graphql.json`;

    const encodedVariantId = encodeVariantId(variantId);

    // Determine if the user is logged in or not
    const user = req.user ? await User.findById(req.user._id) : null;
    let cartId = user ? user.shopifyCartToken : req.cookies.shopifyCartToken;

    // If no cart exists, create a new cart
    if (!cartId) {
      const createCartQuery = `
        mutation {
          cartCreate(input: {
            lines: [
              {
                quantity: ${quantity},
                merchandiseId: "${encodedVariantId}"
              }
            ]
          }) {
            cart {
              id
            }
          }
        }
      `;
      
      const createCartResponse = await axios.post(
        shopifyUrl,
        { query: createCartQuery },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': accessToken,
          },
        }
      );

      if (createCartResponse.data.errors) {
        console.error('GraphQL errors:', createCartResponse.data.errors);
        return res.status(500).json({ message: 'Failed to create cart', errors: createCartResponse.data.errors });
      }

      cartId = createCartResponse.data.data.cartCreate.cart.id;

      // Save the cart token for logged-in users
      if (user) {
        user.shopifyCartToken = cartId;
        await user.save();
      } else {
        // Or save it in cookies for guests
        res.cookie('shopifyCartToken', cartId, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          domain: '.reaganives.io', 
        });
      }
    }

    // Add item to the cart
    const addItemQuery = `
      mutation {
        cartLinesAdd(
          cartId: "${cartId}",
          lines: [
            {
              quantity: ${quantity},
              merchandiseId: "${encodedVariantId}"
            }
          ]
        ) {
          cart {
            id
            lines(first: 5) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        title
                        images(first: 1) {
                          edges {
                            node {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const shopifyResponse = await axios.post(
      shopifyUrl,
      { query: addItemQuery },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': accessToken,
        },
      }
    );

    if (shopifyResponse.data.errors) {
      console.error('GraphQL errors:', shopifyResponse.data.errors);
      return res.status(500).json({ message: 'Failed to add item to cart', errors: shopifyResponse.data.errors });
    }

    const cartData = shopifyResponse.data.data.cartLinesAdd.cart;
    res.status(200).json({ message: 'Item added to cart successfully', cart: cartData });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
};

// Fetch Cart
exports.fetchCart = async (req, res) => {
  try {
    const user = req.user ? await User.findById(req.user._id) : null;
    const cartToken = user ? user.shopifyCartToken : req.cookies.shopifyCartToken;

    if (!cartToken) {
      return res.status(400).json({ message: 'No cart found.' });
    }

    const query = `
      query {
        cart(id: "${cartToken}") {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const shopifyResponse = await axios.post(
      `https://maverick-of-atlas.myshopify.com/api/2023-07/graphql.json`,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
      }
    );

    if (shopifyResponse.data.errors) {
      console.error('GraphQL errors:', shopifyResponse.data.errors);
      return res.status(500).json({ message: 'Failed to fetch cart', errors: shopifyResponse.data.errors });
    }

    const cartData = shopifyResponse.data.data?.cart; // Optional chaining to prevent errors

    if (!cartData) {
      return res.status(500).json({ message: 'No cart data found in response' });
    }

    res.status(200).json(cartData);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to load cart' });
  }
};


// Remove Item from Cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const { lineItemId } = req.body;

    // Check if user is logged in and retrieve cartToken accordingly
    const user = req.user ? await User.findById(req.user._id) : null;
    const cartToken = user ? user.shopifyCartToken : req.cookies.shopifyCartToken;

    if (!cartToken) {
      return res.status(400).json({ message: 'No cart found.' });
    }

    const mutation = `
      mutation {
        cartLinesRemove(cartId: "${cartToken}", lineIds: ["${lineItemId}"]) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                        images(first: 1) {
                          edges {
                            node {
                              src
                            }
                          }
                        }
                      }
                      price {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const shopifyResponse = await axios.post(
      'https://maverick-of-atlas.myshopify.com/api/2023-07/graphql.json',
      { query: mutation },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
      }
    );

    const updatedCart = shopifyResponse.data.data.cartLinesRemove.cart;

    res.status(200).json(updatedCart); // Send back the updated cart data
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
};


// Create Checkout Session
// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const cartToken = req.cookies.shopifyCartToken;

//     if (!cartToken) {
//       return res.status(400).json({ message: 'No cart found.' });
//     }

//     // Fetch the cart details using the cartToken
//     const cartQuery = `
//       query {
//         cart(id: "${cartToken}") {
//           id
//           lines(first: 10) {
//             edges {
//               node {
//                 quantity
//                 merchandise {
//                   ... on ProductVariant {
//                     id
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `;

//     const cartResponse = await axios.post(
//       `https://maverick-of-atlas.myshopify.com/api/2023-07/graphql.json`,
//       { query: cartQuery },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
//         },
//       }
//     );

//     const cartData = cartResponse.data.data.cart;

//     if (!cartData) {
//       return res.status(400).json({ message: 'Cart not found or empty.' });
//     }

//     // Build lineItems from the cart data
//     const lineItems = cartData.lines.edges.map(edge => ({
//       variantId: edge.node.merchandise.id,  // This is the correct variantId
//       quantity: edge.node.quantity,
//     }));

//     const query = `
//       mutation checkoutCreate($input: CheckoutCreateInput!) {
//         checkoutCreate(input: $input) {
//           checkout {
//             id
//             webUrl
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;

//     const variables = {
//       input: {
//         lineItems,
//       },
//     };

//     const shopifyResponse = await axios.post(
//       `https://maverick-of-atlas.myshopify.com/api/2023-07/graphql.json`,
//       { query, variables },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
//         },
//       }
//     );

//     // Log the response for debugging
//     console.log('Shopify API Response:', JSON.stringify(shopifyResponse.data, null, 2));

//     const responseData = shopifyResponse.data.data;

//     if (!responseData || !responseData.checkoutCreate) {
//       return res.status(500).json({ message: 'Failed to create checkout session. Invalid response from Shopify.' });
//     }

//     if (responseData.checkoutCreate.userErrors && responseData.checkoutCreate.userErrors.length > 0) {
//       return res.status(400).json({ message: responseData.checkoutCreate.userErrors[0].message });
//     }

//     const checkoutUrl = responseData.checkoutCreate.checkout.webUrl;
//     res.status(200).json({ checkoutUrl });

//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).json({ message: 'Failed to create checkout session' });
//   }
// };

// exports.processOrderWebhook = (req, res) => {
//   const { order } = req.body;
  
//   // Process the order, e.g., store order data in your database
//   console.log('Order received:', order);

//   // Clear the user's cart token or replace it with a new one
//   if (order.customer) {
//     // Clear cart token logic here
//   }

//   res.status(200).send('Webhook received');
// };

// Update Quantity of Item in Cart
exports.updateItemQuantity = async (req, res) => {
  try {
    const { lineItemId, quantity } = req.body;

    // Check if user is logged in and retrieve cartToken accordingly
    const user = req.user ? await User.findById(req.user._id) : null;
    const cartToken = user ? user.shopifyCartToken : req.cookies.shopifyCartToken;

    if (!cartToken) {
      return res.status(400).json({ message: 'No cart found.' });
    }

    const mutation = `
      mutation {
        cartLinesUpdate(cartId: "${cartToken}", lines: [{ id: "${lineItemId}", quantity: ${quantity} }]) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        title
                        images(first: 1) {
                          edges {
                            node {
                              src
                            }
                          }
                        }
                      }
                      price {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const shopifyResponse = await axios.post(
      'https://maverick-of-atlas.myshopify.com/api/2023-07/graphql.json',
      { query: mutation },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
      }
    );

    const updatedCart = shopifyResponse.data.data.cartLinesUpdate.cart;
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ message: 'Failed to update item quantity' });
  }
};


// Fetch all products within a specific collection
exports.getProductsByCollection = async (req, res) => {
  const { collectionHandle } = req.params;

  const query = `
    query {
      collectionByHandle(handle: "${collectionHandle}") {
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              description
              images(first: 1) {
                edges {
                  node {
                    src
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      'https://maverick-of-atlas.myshopify.com/api/2023-07/graphql.json',
      { query },
      {
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN, // Ensure this token is correct
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      return res.status(500).json({ message: 'Failed to fetch products by collection' });
    }

    const products = response.data.data.collectionByHandle.products.edges.map(product => ({
      id: product.node.id,
      title: product.node.title,
      description: product.node.description,
      imageUrl: product.node.images.edges[0]?.node.src || '',
      variants: product.node.variants.edges.map(variant => ({
        id: variant.node.id,
        title: variant.node.title,
        price: variant.node.price.amount,
        options: variant.node.selectedOptions,
      })),
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by collection:', error);
    res.status(500).json({ message: 'Failed to fetch products by collection' });
  }
};