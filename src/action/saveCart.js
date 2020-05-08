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
} from './types';

export const fetchCart = (cart_content) => dispatch => {
    dispatch({
        type: GET_CART,
        payload: cart_content
    })
};

export const createCart = (cart_item) => dispatch => {
    dispatch({
        type: SAVE_CART,
        payload: cart_item
    })
};

export const getCartValue = (cart_value) => dispatch => {
    dispatch({
        type: GET_CART_VALUE,
        payload: cart_value
    })
};

export const removeCartItem = (index) => dispatch => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: index
    })
};

export const updateCartValue = (index) => dispatch => {
    dispatch({
        type: UPDATE_CART_VALUE,
        payload: index
    })
};

export const updateItemQuantity = (index, quantity) => dispatch => {
    dispatch({
        type: UPDATE_ITEM_QUANTITY,
        payload: [index, quantity]
    })
};

export const setCity = (city) => dispatch => {
    dispatch({
        type: SET_CITY,
        payload: city
    })
};

export const setCityId = (city_id) => dispatch => {
    dispatch({
        type: SET_CITY_ID,
        payload: city_id
    })
};

export const setCollectionId = (collection_id) => dispatch => {
    dispatch({
        type: SET_COLLECTION_ID,
        payload: collection_id
    })
};

export const setRestaurantId = (restaurant_id) => dispatch => {
    dispatch({
        type: SET_RESTAURANT_ID,
        payload: restaurant_id
    })
};

export const setRestaurantName = (restaurant_name) => dispatch => {
    dispatch({
        type: SET_RESTAURANT_NAME,
        payload: restaurant_name
    })
};

export const setShowSuggestion = (show_suggestion) => dispatch => {
    dispatch({
        type: SET_SHOW_SUGGESTION,
        payload: show_suggestion
    })
};

export const setErrorUrl = (url) => dispatch => {
    dispatch({
        type: ERROR_URL,
        payload: url
    })
};