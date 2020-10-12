import authReducer from './authReducer';
import newsReducer from './newsReducer';
import galleryReducer from './galleryReducer';
import ramsReducer from './ramsReducer';

import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer,
    gallery: galleryReducer,
    rams: ramsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})


export default rootReducer;