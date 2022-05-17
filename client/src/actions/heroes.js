import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    FETCH_ONE,
    SET_NUMBER_OF_PAGES,
    SET_PAGE,
    IS_LOADING
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const setPage = (page) => (dispatch) => {
    dispatch({type: SET_PAGE, payload: page});
};

export const fetchFilteredHeroes = (page = 1) => async (dispatch) => {
    try {
        dispatch({type: IS_LOADING, payload: true});

        const {data} = await api.fetchFilteredHeroes(page);

        dispatch({
            type: SET_NUMBER_OF_PAGES,
            payload: Math.ceil(data.all / data.limit),
        });
        dispatch({type: FETCH_ALL, payload: data.data});
        dispatch({type: IS_LOADING, payload: false});

    } catch (error) {
        console.log(error.message);
    }
};

export const uploadImages = (images) => async (dispatch) => {
    try {
        dispatch({type: IS_LOADING, payload: true});

        const {data} = await api.postImages(images);

        dispatch({type: IS_LOADING, payload: false});
        return data;
    } catch (err) {
        console.error(err.message);
    }
};

export const deleteImage = (imageUrl) => async (dispatch) => {
    try {
        dispatch({type: IS_LOADING, payload: true});

        await api.deleteImage(imageUrl);

        dispatch({type: IS_LOADING, payload: false});

    } catch (err) {
        console.error(err.message);
    }
};

export const getHero = (id) => async (dispatch) => {
    try {
        dispatch({type: IS_LOADING, payload: true});

        const {data} = await api.fetchHero(id);

        dispatch({type: FETCH_ONE, payload: data});
        dispatch({type: IS_LOADING, payload: false});

    } catch (err) {
        console.error(err.message);
    }
};

export const createHero = (hero) => async (dispatch) => {
    try {
        dispatch({type: IS_LOADING, payload: true});
        const {data} = await api.createHero(hero);

        dispatch({type: CREATE, payload: data});
        dispatch({type: IS_LOADING, payload: false});

    } catch (error) {
        console.log(error.message);
    }
};

export const updateHero = (id, hero) => async (dispatch) => {
    try {
        dispatch({type: IS_LOADING, payload: true});
        const {data} = await api.updateHero(id, hero);

        dispatch({type: UPDATE, payload: data});
        dispatch({type: IS_LOADING, payload: false});

    } catch (error) {
        console.log(error.message);
    }
};

export const deleteHero = (id) => async (dispatch) => {
    try {
        dispatch({type: IS_LOADING, payload: true});
        await api.deleteHero(id);

        dispatch({type: DELETE, payload: id});
        dispatch({type: IS_LOADING, payload: false});
    } catch (error) {
        console.log(error.message);
    }
};
