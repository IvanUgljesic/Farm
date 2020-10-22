import { projectStorage, projectFirestore, timestamp } from '../../firebase/config';

export const createRam = (files, content) => {
    return (dispatch) => {

        let promises = [];
        let urls = [];       
        let createdAt = timestamp();
        let randId = 'ram' + (''+ Math.random()).substring(2, 12);
        let collectionRef = projectFirestore.collection('rams').doc(randId);
        dispatch({type: 'WORKING', working:true})

        
        files.forEach((file) => {
            let storageRef = projectStorage.ref(`rams/${randId}/${file.name}`);
            promises.push(
                storageRef.put(file).then((snap) => {
                    return snap.ref.getDownloadURL();
                })
            )

            Promise.all(promises).then((res) => {
                urls = [...Object.values(res)];
                collectionRef.set({...content, urls, createdAt}).then(() => {
                    dispatch({type: 'CREATE_RAM', content});
                    dispatch({type: 'WORKING', working:false});
                }).catch((err) => {
                    dispatch({type: 'CREATE_RAM_ERROR', err});
                })
            }).catch((err) => {
                dispatch({type: 'CREATE_RAM_ERROR', err});
            })

        })
    };
}

export const editRam = (files, ram) => {
    return (dispatch) => {
        let promises = [];
        let newUrls = [];
        let editedRam = ram;
        let ramRef = projectFirestore.collection('rams').doc(ram.id);

        files.forEach((file) => {
            let storageRef = projectStorage.ref(`rams/${ram.id}/${file.name}`);
            promises.push(
                storageRef.put(file).then((snap) => {
                    return snap.ref.getDownloadURL();
                })
            )
        })


        Promise.all(promises).then((res) => {
            newUrls = [...ram.urls, ...Object.values(res)];
            editedRam.urls = newUrls;
            ramRef.update(editedRam).then(() => {
                dispatch({type: 'EDIT_RAM', id:editedRam.id});
                dispatch({type: 'SWITCH_RAM_FORM', current:''});
            }).catch((err) => {
                dispatch({type: 'EDIT_RAM_ERROR', err});
            })
        }).catch((err) => {
            dispatch({type: 'EDIT_RAM_ERROR', err});
        });
    }
}

export const deleteRam = (ram) => {  
    return (dispatch) => {
        const collectionRef = projectFirestore.collection('rams');
        const storageRef = projectStorage.ref('rams');

        let deleteAllImages = [];
        ram.urls.forEach(url => deleteAllImages.push(() => projectStorage.refFromURL(url).delete()));

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

export const switchRamForm = (current) => {
    return (dispatch) => {
        dispatch({type: 'SWITCH_RAM_FORM', current});
    }
}

