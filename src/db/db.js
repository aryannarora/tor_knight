import {database} from './firebase';

export const create = (url, token) => {
    database.ref(`tokens/${token}`).set({
        magnet: url,
        createdAt: Date.now(),
        lastUpdatedAt: Date.now(),
        accessibleTo: []
    })
};

export const get = token => database.ref(`/tokens/${token}`).once('value').then(snapshot => !!snapshot.val() ? snapshot.val().magnet : null);

export const remove = token => database.ref(`tokens/${token}`).remove();