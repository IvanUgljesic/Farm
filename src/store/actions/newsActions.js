import { projectStorage, projectFirestore, timestamp } from '../../firebase/config';

export const createAPieceOfNews = (file, content) => {
    return (dispatch, getState, {getFirebase, getFirestore }) => {
        const storageRef = projectStorage.ref('news/'+file.name);
        const collectionRef = projectFirestore.collection('news');
        
        storageRef.put(file).on('state_changed', (snap) => {
            let precentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            dispatch({type: 'PROGRESS_BAR', precentage})
        }, (err) => {
            dispatch({type: 'CREATE_A_PIECE_OF_NEWS_ERROR', err})
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ ...content, url, createdAt })
            .then(() => {
                let precentage = 0;
                dispatch({type: 'CREATE_A_PIECE_OF_NEWS', file, content})
                dispatch({type: 'PROGRESS_BAR', precentage})
                dispatch({type: 'SWITCH_NEWS_FORM', current:''})
            })
            .catch((err) => {
                dispatch({type: 'CREATE_A_PIECE_OF_NEWS_ERROR', err})
            })
        })

    }
};

export const deleteAPieceOfNews = (aPieceOfNews) => {  
    return (dispatch, getState) => {
        const collectionRef = projectFirestore.collection('news');
        const storageRef = projectStorage.refFromURL(aPieceOfNews.url);

        storageRef.delete()
        .then(() => {
            collectionRef.doc(aPieceOfNews.id).delete().then(() => {
                dispatch({type: 'DELETE_A_PIECE_OF_NEWS', id:aPieceOfNews.id});
            }).catch((err) => {
                dispatch({type: 'DELETE_A_PIECE_OF_NEWS_ERROR', err});
            });
          }).catch((err) => {
            dispatch({type: 'DELETE_IMAGE_ERROR', url:aPieceOfNews.url});
          });

    }  
}

export const switchNewsForm = (current) => {
    return (dispatch) => {
        dispatch({type: 'SWITCH_NEWS_FORM', current});

    }


}