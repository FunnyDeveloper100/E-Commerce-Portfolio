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
        case cartActions.ADD_PRODUCT:
          return {
            ...state,
            productToAdd: Object.assign({}, action.payload)
          };
        case cartActions.REMOVE_PRODUCT:
          return {
            ...state,
            productToRemove: Object.assign({}, action.payload)
          };
        default:
          return state;
      }
}

export default cart;
