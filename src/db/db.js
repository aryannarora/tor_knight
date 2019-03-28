import {database} from './firebase';

export const create = (url, token, file) => {
    database.ref(`tokens/${token}`).set({
        magnet: url,
        createdAt: Date.now(),
        lastUpdatedAt: Date.now(),
        accessibleTo: [],
        fileName: file.name || "Unknown",
        fileSize: file.size || "unknown"
    })
};

export const get = token => database.ref(`/tokens/${token}`).once('value').then(snapshot => !!snapshot.val() ? snapshot.val() : null);

export const remove = token => database.ref(`tokens/${token}`).remove();