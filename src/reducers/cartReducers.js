import {
    SAVE_CART,
    GET_CART,
    GET_CART_VALUE,
    REMOVE_CART_ITEM,
    UPDATE_CART_VALUE,
    UPDATE_ITEM_QUANTITY,
    SET_CITY,
    SET_CITY_ID,
    SET_COLLECTION_ID,
    SET_RESTAURANT_ID,
    SET_RESTAURANT_NAME,
    SET_SHOW_SUGGESTION,
    ERROR_URL
} from '../action/types';

const initialState = {
    items: [],
    cart_amount: 0,
    city: 'Ahmedabad',
    city_id: '11',
    collection_id: 0,
    restaurant_id: 0,
    restaurant_name: '',
    show_suggestion: false,
    error_url: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state
            };
        case SAVE_CART:
            return {
                ...state,
                items: [action.payload]
            };
        case GET_CART_VALUE:
            return {
                ...state,
                cart_amount: action.payload
            };
        case REMOVE_CART_ITEM:
            state.items[0].splice(action.payload, 1)
            return {
                ...state,
            };
        case UPDATE_CART_VALUE:
            return {
                ...state,
                cart_amount: state.cart_amount - (state.items[0][action.payload].item_quantity * state.items[0][action.payload].item_price)
            };
        case UPDATE_ITEM_QUANTITY:
            if (state.items[0][action.payload[0]].item_quantity > action.payload[1]) {
                let decreased = state.items[0][action.payload[0]].item_quantity - action.payload[1]
                let amt = state.items[0][action.payload[0]].item_price * decreased
                state.cart_amount = state.cart_amount - amt
            }
            else {
                let increased = action.payload[1] - state.items[0][action.payload[0]].item_quantity
                let amt = state.items[0][action.payload[0]].item_price * increased
                state.cart_amount = state.cart_amount + amt
            }
            state.items[0][action.payload[0]].item_quantity = action.payload[1]
            return {
                ...state
            };

        case SET_CITY:
            state.city = action.payload
            return {
                ...state
            };
        case SET_CITY_ID:
            state.city_id = action.payload
            return {
                ...state
            };
        case SET_COLLECTION_ID:
            state.collection_id = action.payload
            return {
                ...state
            };
        case SET_RESTAURANT_ID:
            state.restaurant_id = action.payload
            return {
                ...state
            };
        case SET_RESTAURANT_NAME:
            state.restaurant_name = action.payload
            return {
                ...state
            };
        case SET_SHOW_SUGGESTION:
            state.show_suggestion = action.payload
            return {
                ...state
            };
        case ERROR_URL:
            state.error_url = action.payload
            return {
                ...state
            };
        default:
            return state;
    }
}