const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const defaultStorage = admin.storage();

exports.ramEdited = functions.firestore
    .document('ram/{ram.id}')
    .onUpdate((change, context) => {

    // Get an object representing the document
    const updatedPost = change.after.data();

    // ...or the previous value before this update
    const oldPost = change.before.data();

    const oldUrls = [...oldPost.urls];
    const newUrls = [...updatedPost.urls];

    const imagesToDelete = oldUrls.filter(url => newUrls.includes(url));

    const bucket = firebase.storage().bucket('rams');

    const imagesToDeletePromises = imagesToDelete.map(url => {
        return bucket.refFromURL(url).delete();
    })

    return Promise.all(imagesToDeletePromises);

    });
