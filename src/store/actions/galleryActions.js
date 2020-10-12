import { projectStorage, projectFirestore, timestamp } from '../../firebase/config';

export const uploadImage = (file, content) => {
    return (dispatch, getState, {getFirebase, getFirestore }) => {
        const storageRef = projectStorage.ref('gallery/'+file.name);
        const collectionRef = projectFirestore.collection('gallery');
        
        storageRef.put(file).on('state_changed', (snap) => {
            let precentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            dispatch({type: 'PROGRESS_BAR', precentage})
        }, (err) => {
            dispatch({type: 'UPLOAD_IMAGE_ERROR', err})
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ ...content, url, createdAt })
            .then(() => {
                let precentage = 0;
                let newValue = false;
                dispatch({type: 'UPLOAD_IMAGE', file, content})
                dispatch({type: 'PROGRESS_BAR', precentage});
                dispatch({type: 'SWITCH_SHOW_ADD_FORM_GALLERY', newValue});
            })
            .catch((err) => {
                dispatch({type: 'UPLOAD_IMAGE_ERROR', err})
            })
        })

    }
};

export const deleteImage = (pic) => {  
    return (dispatch, getState) => {
        const storageRef = projectStorage.refFromURL(pic.url);
        const collectionRef = projectFirestore.collection('gallery');


        storageRef.delete()
        .then(() => {
            collectionRef.doc(pic.id).delete();
            dispatch({type: 'DELETE_IMAGE', url:pic.url});
          }).catch((err) => {
            dispatch({type: 'DELETE_IMAGE_ERROR', url:pic.url});
          });

    }  
}

export const switchShowAddForm = (current) => {
    const newValue = !current;
    return (dispatch, getState) => {
        dispatch({type: 'SWITCH_SHOW_ADD_FORM_GALLERY', newValue});

    }

}

export const switchShowDeleteForm = (current) => {
    const newValue = !current;
    return (dispatch, getState) => {
        dispatch({type: 'SWITCH_SHOW_DELETE_FORM_GALLERY', newValue});

    }

}