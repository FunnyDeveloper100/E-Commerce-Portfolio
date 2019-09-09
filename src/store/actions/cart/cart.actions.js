export const LOAD_CART = 'LOAD_CART';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const UPDATE_CART = 'UPDATE_CART';


export const loadCart = products => ({
    type: LOAD_CART,
    payload: products
  });
  
  export const addProduct = product => ({
    type: ADD_PRODUCT,
    payload: product
  });
  
  export const removeProduct = product => ({
    type: REMOVE_PRODUCT,
    payload: product
  });
  