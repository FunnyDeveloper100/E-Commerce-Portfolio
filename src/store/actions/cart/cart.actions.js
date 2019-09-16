export const LOAD_CART = 'LOAD_CART';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';

export const ADD_ONE_PRODUCT = 'ADD_ONE_PRODUCT';

export const SUBSTRACT_PRODUCT = 'SUBSTRACT_PRODUCT';
export const SUBSTRACT_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';

export const CLEAR_CART = 'CLEAR_CART';


export const loadCart = products => ({
  type: LOAD_CART,
  payload: products
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
});

export const addOneProduct = product => ({
  type: ADD_ONE_PRODUCT,
  payload: product
});

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  payload: product
});

export const substractProduct = product => ({
  type: SUBSTRACT_PRODUCT,
  payload: product,
})

export const clearCart = () => ({
  type: CLEAR_CART,
})