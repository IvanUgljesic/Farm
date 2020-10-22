const initState = {
    images: [
    ],
    progress: 0,
    currentGalleryForm: '',
}

const galleryReducer = (state = initState, action) => {

    switch(action.type){
        case 'PROGRESS_BAR':
            return {
                ...state,
                progress: action.precentage
            }
        case 'SWITCH_GALLERY_FORM':
            return {
                ...state,
                currentGalleryForm: action.current,
            }
        case 'UPLOAD_IMAGE':
            console.log('Uploading image', action.file, action.content);
            return state;
        case 'UPLOAD_IMAGE_ERROR':
            console.log('error uploading image', action.err);
            return state;
        case 'DELETE_IMAGE':
            console.log('deleted image', action.url);
            return state;
        case 'DELETE_IMAGE_ERROR':
            console.log('deleted image error', action.url);
            return state;
        default:
            return state;    
    }
}

export default galleryReducer;