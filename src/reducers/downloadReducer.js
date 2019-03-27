import {
    UPDATE_TORRENT_SPEED,
    UPDATE_FILE_DETAILS,
    ERROR,
    UPDATE_DOWNLOAD_PROGRESS,
    PROCESSING,
    DOWNLOAD_COMPLETED
} from '../actions/types';

const initialState = {
    speedUp: 0,
    speedDown: 0,
    progress: 0,
    peers: 0,
    file: null,
    infoHash: null,
    status: "ready"
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROCESSING:
            return {
                ...state,
                status: 'processing'
            };
        case UPDATE_TORRENT_SPEED:
            return {
                ...state,
                speedUp: action.payload.speedUp,
                speedDown: action.payload.speedDown,
                peers: action.payload.peers,
                status: 'downloading'
            };
        case UPDATE_FILE_DETAILS:
            return {
                ...state,
                file: action.payload.file,
                infoHash: action.payload.infoHash,
                status: 'initialising'
            };
        case UPDATE_DOWNLOAD_PROGRESS:
            return {
                ...state,
                progress: action.payload.progress,
                status: 'downloading'
            };
        case DOWNLOAD_COMPLETED:
            return {
                ...state,
                progress: action.payload.progress,
                status: 'downloaded'
            };
        case ERROR:
            return {
                ...state,
                status: 'error'
            };
        default:
            return {
                ...state
            };
    }
}