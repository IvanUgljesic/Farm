import { projectStorage, projectFirestore, timestamp } from '../../firebase/config';

export const createRam = (files, content) => {
    return (dispatch) => {

        
        const collectionRef = projectFirestore.collection('rams');
        const urls = [];       
        const createdAt = timestamp();

        
        files.forEach((file,index) => {

        const storageRef = projectStorage.ref(`rams/${content.name}/${file.name}`);

        storageRef.put(file).on('state_changed', (snap) => {
            let precentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            dispatch({type: 'PROGRESS_BAR', precentage})
        }, (err) => {
            dispatch({type: 'CREATE_RAM_ERROR', err})
        }, async () => {
            let url = await storageRef.getDownloadURL();
            urls.push(url);
            if(urls.length === files.length){
                collectionRef.add({ ...content, urls, createdAt })
                .then(() => {
                    let precentage = 0;
                    let newValue = false;
                    dispatch({type: 'CREATE_RAM', files, content})
                    dispatch({type: 'PROGRESS_BAR', precentage})
                    dispatch({type: 'SWITCH_SHOW_ADD_FORM', newValue})
                })
                .catch((err) => {
                    dispatch({type: 'CREATE_RAM_ERROR', err})
                })

            }
        })

        })
    };
}

export const deleteRam = (ram) => {  
    return (dispatch) => {
        const collectionRef = projectFirestore.collection('rams');
        const storageRef = projectStorage.ref('rams');

        let deleteAllImages = [];
        ram.urls.forEach(url => deleteAllImages.push(projectStorage.refFromURL(url).delete()));

        dispatch({type: 'WORKING', working:true});

        Promise.all(deleteAllImages).then(() => {

            collectionRef.doc(ram.id).delete().then(() => {
                dispatch({type: 'WORKING', working:false});
                dispatch({type: 'DELETE_RAM', id:ram.id});
            }).catch((err) => {
                dispatch({type: 'DELETE_RAM_ERROR', err});
            });

        }).catch(err => {
            dispatch({type: 'DELETE_RAM_ERROR', err});
        })

    }  
}

export const switchShowAddForm = (current) => {
    const newValue = !current;
    return (dispatch, getState) => {
        dispatch({type: 'SWITCH_SHOW_ADD_FORM', newValue});

    }


}
export const switchShowDeleteForm = (current) => {
    const newValue = !current;
    return (dispatch, getState) => {
        dispatch({type: 'SWITCH_SHOW_DELETE_FORM', newValue});

    }

}