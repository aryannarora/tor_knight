import {
    ERROR,
    PROCESSING,
    DOWNLOAD_COMPLETED,
    UPDATE_TORRENT_SPEED,
    UPDATE_DOWNLOAD_PROGRESS,
    UPDATE_FILE_DETAILS
} from '../actions/types';

import {get} from './../db';

const wt = require('./../wt');

const SPEED_REFRESH_TIME = 20000;

const downloadBlobURL = (name, blobURL) => {
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.download = name;
    a.href = blobURL;
    a.click();
};

export const requestDownload = (token) => dispatch => {

    // const magnet = token;
    var magnet = "magnet:?xt=urn:btih:0c3b16fb89eb256ece02d6902d938092be200a92&dn=nfo.gif&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.btorrent.xyz";
    // console.log("magnet");
    // if (!magnet) return dispatch({
    //     type: ERROR
    // });

    dispatch({
        type: PROCESSING,
        payload: {}
    });

    return wt.createClient()
        .then(client => {
            console.log("client created", magnet);
            client.add(magnet, torrent => {

                const file = torrent.files[0];
                dispatch({
                    type: UPDATE_FILE_DETAILS,
                    payload: {
                        file: file,
                        infoHash: torrent.infoHash
                    }
                });

                const updateSpeed = () => {
                    console.log(torrent.downloadSpeed)
                    dispatch({
                        type: UPDATE_TORRENT_SPEED,
                        payload: {
                            speedUp: torrent.uploadSpeed,
                            speedDown: torrent.downloadSpeed,
                            peers: torrent.numPeers
                        }
                    });
                };

                torrent.on('upload', updateSpeed);
                torrent.on('download', updateSpeed);
                setInterval(updateSpeed, SPEED_REFRESH_TIME);

                const stream = file.createReadStream();
                stream.on('data', _ => {
                    if (torrent.progress === 1) {
                        dispatch({
                            type: DOWNLOAD_COMPLETED,
                            payload: {
                                progress: 100
                            }
                        });
                        file.getBlobURL((err, blobURL) => {
                            if (err) throw err;
                            downloadBlobURL(file.name, blobURL)
                        })
                    } else {
                        dispatch({
                            type: UPDATE_DOWNLOAD_PROGRESS,
                            payload: {
                                progress: torrent.progress
                            }
                        });
                    }

                })
            })

        });
};
