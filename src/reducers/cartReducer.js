import { ADD_TO_CART, DELETE_CART } from '../actions/cartActions'

const initialState = {
    cart: [],
}

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                // cart: [...state.cart, action.payload],
                cart: action.payload,
            }

        case DELETE_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload),
            }

        default:
            return state
    }
}