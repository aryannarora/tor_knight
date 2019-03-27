import {UPLOAD_FILES, UPDATE_TORRENT_SPEED} from '../actions/types';



const initialState = {
    filesToUpload: [],
    speedUp: 0,
    peers: 0,
    fileName: "",
    fileSize: 0,
    fileType: "",
    infoHash: null,
    status: "ready",
    token: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_FILES:
            return {
                ...state,
                filesToUpload: action.payload,
                status: 'processing'
            };
        case UPDATE_TORRENT_SPEED:
            return {
                ...state,
                speedUp: action.payload.speedUp,
                peers: action.payload.peers,
                status: 'running'
            };
        default:
            return state;
    }
}