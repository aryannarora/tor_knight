import {UPLOAD_FILES, UPDATE_TORRENT_SPEED} from '../actions/types';
import openSocket from 'socket.io-client';
import {create as mapInfoHashToToken} from './../db';

const socket = openSocket('http://localhost:8000');
const wt = require('./../wt');
const uuidv1 = require('uuid/v1');

const TRACKERS = [
    ["ws://tracker.btorrent.xyz"],
    ["ws://tracker.openwebtorrent.com"],
    // ["ws://tracker.fastcast.nz"]
];

const generateToken = _ => uuidv1();
const SPEED_REFRESH_TIME = 20000;


export const seedFiles = (files = []) => dispatch => {

    return wt.createClient()
        .then(client => {
            dispatch({
                type: UPLOAD_FILES,
                payload: files
            });

            return client.seed(files, {announce: TRACKERS}, torrent => {
                const updateSpeed = () => {
                    console.log("updating speed");

                    return dispatch({
                        type: UPDATE_TORRENT_SPEED,
                        payload: {
                            speedUp: torrent.uploadSpeed,
                            peers: torrent.numPeers
                        }
                    });
                };

                setInterval(updateSpeed, SPEED_REFRESH_TIME);
                torrent.on("upload", updateSpeed);
                torrent.on("download", updateSpeed);
                const token = generateToken();
                mapInfoHashToToken(torrent.magnetURI, token);

                socket.emit(
                    "upload",
                    {
                        // fileName: file.name,
                        // fileSize: file.size,
                        // fileType: file.type,
                        token: token,
                        magnetURI: torrent.magnetURI
                    });

                console.log("got the torrent", torrent);
            });
        });
};
