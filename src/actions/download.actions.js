import {
    ERROR,
    DOWNLOAD_COMPLETED,
    UPDATE_TORRENT_SPEED,
    UPDATE_DOWNLOAD_PROGRESS,
    UPDATE_FILE_DETAILS,
    READY,
    CONNECTING
} from '../actions/types';

import {get} from '../db/db';

const wt = require('./../wt');

const SPEED_REFRESH_TIME = 800;

const downloadBlobURL = (name, blobURL) => {
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.download = name;
    a.href = blobURL;
    a.click();
};

export const requestDownload = (token) => dispatch => {

    let magnet = null;
    if (!token) return dispatch({
        type: ERROR
    });

    console.log(token)

    dispatch({
        type: CONNECTING,
        payload: {}
    });

    return Promise.resolve(get(token))
        .then(m => !!m ? magnet = m.magnet : Promise.reject(-1))
        .then(_ => wt.createClient())
        .then(client => {
            return client.add(magnet, torrent => {
                let sent = false;
                const file = torrent.files[0];
                dispatch({
                    type: UPDATE_FILE_DETAILS,
                    payload: {
                        file: file,
                        infoHash: torrent.infoHash
                    }
                });

                const updateSpeed = () => {
                    dispatch({
                        type: UPDATE_TORRENT_SPEED,
                        payload: {
                            speedUp: torrent.uploadSpeed,
                            speedDown: torrent.downloadSpeed,
                            peers: torrent.numPeers,
                        }
                    });
                };

                const updateProgress = () => {
                    if (torrent.progress === 1) {
                        dispatch({
                            type: DOWNLOAD_COMPLETED,
                            payload: {
                                progress: 100
                            }
                        });
                        if (!sent) console.log("downloaded called")
                        if (!sent) file.getBlobURL((err, blobURL) => {
                            sent = true;
                            if (err) throw err;
                            return downloadBlobURL(file.name, blobURL)
                        })
                    } else {
                        sent = false;
                        dispatch({
                            type: UPDATE_DOWNLOAD_PROGRESS,
                            payload: {
                                progress: (torrent.progress * 100).toFixed(1) + '%'
                            }
                        });
                    }
                };

                torrent.on('upload', updateSpeed);
                torrent.on('download', updateSpeed);
                setInterval(updateSpeed, SPEED_REFRESH_TIME);
                setInterval(updateProgress, SPEED_REFRESH_TIME);
            })

        })
        .catch(e => {
            console.log("error", e);
            dispatch({
                type: ERROR
            })
        });
};

export const isValidURI = (token) => dispatch => {
    return Promise.resolve(get(token))
        .then(obj => {
            if (!!obj && !!obj.magnet) {
                dispatch({
                    type: READY,
                    payload: {
                        file: {
                            name: obj.fileName,
                            length: obj.fileSize
                        }
                    }
                })
            } else dispatch({
                type: ERROR,
            })
        })
};
