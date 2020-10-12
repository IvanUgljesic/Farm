const initState = {
    images: [
    ],
    progress: 0,
    showAddFormGallery: false,
    showDeleteFormGallery: false
}

const galleryReducer = (state = initState, action) => {

    switch(action.type){
        case 'PROGRESS_BAR':
            return {
                ...state,
                progress: action.precentage
            }
        case 'SWITCH_SHOW_ADD_FORM_GALLERY':
            return {
                ...state,
                showAddFormGallery: action.newValue,
                showDeleteFormGallery: false
            }
        case 'SWITCH_SHOW_DELETE_FORM_GALLERY':
            return {
                ...state,
                showDeleteFormGallery: action.newValue,
                showAddFormGallery: false
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