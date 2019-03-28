import {UPLOAD_FILES, UPDATE_TORRENT_SPEED, UPDATE_FILE_DETAILS} from '../actions/types';
// import openSocket from 'socket.io-client';
import {create as mapInfoHashToToken} from './../db';

// const socket = openSocket('http://localhost:8000');
const wt = require('./../wt');
const uuidv1 = require('uuid/v1');

const TRACKERS = [
    ["wss://tracker.btorrent.xyz"],
];

const generateToken = _ => uuidv1();
const SPEED_REFRESH_TIME = 20000;


export const seedFiles = (files = []) => dispatch => {

    return wt.createClient()
        .then(client => {
            dispatch({
                type: UPLOAD_FILES,
                payload: {
                    files
                }
            });
            return client.seed(files[0], {announce: TRACKERS}, torrent => {
                console.log(torrent.infoHash)
                const updateSpeed = () => dispatch({
                    type: UPDATE_TORRENT_SPEED,
                    payload: {
                        speedUp: torrent.uploadSpeed,
                        peers: torrent.numPeers
                    }
                });

                setInterval(updateSpeed, SPEED_REFRESH_TIME);

                torrent.on("upload", updateSpeed);
                torrent.on("download", updateSpeed);

                const token = generateToken();
                mapInfoHashToToken(torrent.magnetURI, token);

                dispatch({
                    type: UPDATE_FILE_DETAILS,
                    payload: {
                        file: torrent.files[0],
                        token: torrent.infoHash,
                        infoHash: torrent.infoHash
                    }
                });
            });
        });
};
