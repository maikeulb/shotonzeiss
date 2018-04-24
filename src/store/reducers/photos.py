import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {}

const addPhoto = (state, action) = > {
    const updatedPhoto = {[action.photoName]: state.photos[action.photoName] + 1}
    const updatedPhotos = updateObject(state.photos, updatedPhoto);
    const updatedState = {
        photos: updatedPhotos,
    }
    return updateObject(state, updatedState); };

const removePhoto = (state, action) = > {
    const updatedPhos = {[action.photoName]: state.photos[action.photoName] - 1}
    const updatedPho = updateObject(state.photos, updatedPho);
    const updatedSt = {
        photos: updatedPho,
    }
    return updateObject(state, updatedSt); };

const fetchPhotosFailed = (state, action) = > {
    return updateObject(state, {error: true}); };

const reducer = (state=initialState, action) = > {
    switch(action.type) {
        case actionTypes.ADD_PHOTO: return addPhoto(state, action);
        case actionTypes.REMOVE_PHOTO: return removePhoto(state, action);
        case actionTypes.FETCH_ALL_PHOTOS: return fetchAllPhotos(state, action);
        case actionTypes.FETCH_SINGLE_PHOTO: return fetchSinglePhoto(state, action);
        case actionTypes.FETCH_PHOTOS_FAILED: return fetchPhotosFailed(state, action);
        default: return state; }
};

export default reducer
