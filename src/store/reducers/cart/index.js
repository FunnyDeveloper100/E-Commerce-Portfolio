import * as cartActions from '../../actions/cart';

const initialState = {
  products: [],
  total: {
    Quantity: 0,
    installments: 0,
    Price: 0,
    currency: 'USD',
    currencyFormat: '$'
  }
};

const cart = function (state = initialState, action) {
  switch (action.type) {
    case cartActions.LOAD_CART:
      return {
        ...state,
        products: action.payload
      };
    case cartActions.ADD_PRODUCT_SUCCESS: {
      let total_quantity = 0;
      let total_price = 0;
      const product = action.payload;
      let {
        products
      } = state;

      if (Object.keys(product.sizes).length > 0) {
        for (const [key, value] of Object.entries(product.sizes)) {
          if (value) {
            products.forEach(p => {
              if (p.product_id === product.product_id) {
                if (p.color === product.color || (!p.color && !product.color)) {
                  if (p.size && key === p.size) {
                    p.quantity += product.quantity;
                    product.sizes[key] = false;
                  }
                }
              }
            });
          }
        }
        for (const [key, value] of Object.entries(product.sizes)) {
          if (value) {
            let new_cart = {
              product_id: product.product_id,
              color: product.color,
              size: key,
              quantity: product.quantity,
              price: product.price,
              name: product.name,
              description: product.description,
              thumbnail: product.thumbnail,
            }
            products.push(new_cart);
          }
        }
      } else {
        let productAlreadyInCart = false;
        products.forEach(p => {
          if (p.product_id === product.product_id) {
            if (p.color === product.color) {
              p.quantity += product.quantity;
              productAlreadyInCart = true;
            }
          }
        });

        if (!productAlreadyInCart) {
          let new_cart = {
            product_id: product.product_id,
            color: product.color,
            size: null,
            quantity: product.quantity,
            price: product.price,
            name: product.name,
            description: product.description,
            thumbnail: product.thumbnail,
          }
          products.push(new_cart);
        }
      }

      products.forEach(p => {
        total_quantity += p.quantity;
        total_price += p.price * p.quantity;
      });

      return {
        ...state,
        products,
        total: {
          ...state.total,
          Quantity: total_quantity,
          Price: Math.round(total_price),
        }
      };
    }
    case cartActions.ADD_ONE_PRODUCT:
      {
        let total_quantity = 0;
        let total_price = 0;
        const product = action.payload;
        let {
          products
        } = state;
        products.forEach(p => {
          if (p.product_id === product.product_id) {
            if (p.color === product.color) {
              if (product.size && p.size === product.size)
                p.quantity++;
              if (!p.size && !product.size)
                p.quantity++;
            }
          }
        });

        products.forEach(p => {
          total_quantity += p.quantity;
          total_price += p.price * p.quantity;
        });

        return {
          ...state,
          products,
          total: {
            ...state.total,
            Quantity: total_quantity,
            Price: Math.round(total_price),
          }
        };
      }
    case cartActions.REMOVE_PRODUCT:
      {
        let total_quantity = 0;
        let total_price = 0;
        const product = action.payload;
        let {
          products
        } = state;
        let index_to_remove = -1;
        products.forEach((p, index) => {
          if (p.product_id === product.product_id) {
            if (p.color === product.color) {
              if (product.size && p.size === product.size)
                index_to_remove = index;
              if (!p.size && !product.size)
                index_to_remove = index;
            }
          }
        });

        if (index_to_remove > -1) {
          products.splice(index_to_remove, 1);
        }

        products.forEach((p, index) => {
          total_quantity += p.quantity;
          total_price += p.price * p.quantity;
        });

        return {
          ...state,
          products,
          total: {
            ...state.total,
            Quantity: total_quantity,
            Price: Math.round(total_price),
          }
        };
      }
    case cartActions.SUBSTRACT_PRODUCT:
      const product = action.payload;
      let {
        products
      } = state;
      products.forEach((p, index) => {
        if (p.product_id === product.product_id) {
          if (p.color === product.color) {
            if (p.size === product.size && p.quantity > 0) {
              p.quantity--;
            }
          }
        }
      });

      let total_quantity = 0;
      let total_price = 0;

      products.forEach(p => {
        total_quantity += p.quantity;
        total_price += p.price * p.quantity;
      });
      return {
        ...state,
        products,
        total: {
          ...state.total,
          Quantity: total_quantity,
          Price: Math.round(total_price),
        }
      }
    case cartActions.CLEAR_CART:
      {
        return {
          products: [],
          total: {
            Quantity: 0,
            installments: 0,
            Price: 0,
            currency: 'USD',
            currencyFormat: '$'
          }
        }
      }
    default:
      return state;
  }
}

export default cart;