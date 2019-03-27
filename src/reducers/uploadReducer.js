import {UPLOAD_FILES, UPDATE_TORRENT_SPEED, UPDATE_FILE_DETAILS} from '../actions/types';

const initialState = {
    filesToUpload: [],
    speedUp: 0,
    peers: 0,
    file: null,
    infoHash: null,
    status: "ready",
    token: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_FILES:
            return {
                ...state,
                filesToUpload: action.payload.files,
                status: 'processing'
            };
        case UPDATE_TORRENT_SPEED:
            return {
                ...state,
                speedUp: action.payload.speedUp,
                peers: action.payload.peers,
                status: 'uploading'
            };
        case UPDATE_FILE_DETAILS:
            return {
                ...state,
                file: action.payload.file,
                token: action.payload.token,
                infoHash: action.payload.infoHash,
                status: 'uploading'
            };
        default:
            return state;
    }
}