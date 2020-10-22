import { projectStorage, projectFirestore, timestamp } from '../../firebase/config';

export const uploadImage = (file, content) => {
    return (dispatch) => {
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
                dispatch({type: 'UPLOAD_IMAGE', file, content})
                dispatch({type: 'PROGRESS_BAR', precentage});
                dispatch({type: 'SWITCH_GALLERY_FORM', current:''});
            })
            .catch((err) => {
                dispatch({type: 'UPLOAD_IMAGE_ERROR', err})
            })
        })

    }
};

export const deleteImage = (pic) => {  
    return (dispatch) => {
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

export const switchGalleryForm = (current) => {
    return (dispatch) => {
        dispatch({type: 'SWITCH_GALLERY_FORM', current});

    }

}