import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropzone from "./dropZone";
import Tempalink from "./tempalink";
import FileDescriptor from "./fileDescriptor";
import Stats from "./stats";
import {seedFiles} from './../actions/upload.actions';
import Error from "./error";
import Loading from "./loading";
import Uploading from "./uploading";

class UploadPage extends Component {

    componentWillReceiveProps(nextProps) {
        // TODO
    }

    render() {
        switch (this.props.status) {
            case 'ready' :
                return (
                    <div>
                        <h4 className="mt-3">Drop a file here to upload</h4>
                        <Dropzone onFilesAdded={this.props.seedFiles}/>
                    </div>
                );

            case 'processing' :
                return (
                    <div>
                        <Loading/>
                        <h3>Processing...</h3>
                        <p>Please hold your horses.</p>
                    </div>
                );

            case 'uploading':
                return (
                    <div>
                        <h3>Uploading file!</h3>
                        <Uploading/>
                        <FileDescriptor file={this.props.file}/>
                        <Stats peers={this.props.peers} speedUp={this.props.speedUp}/>
                        <Tempalink token={this.props.token}/>
                    </div>
                );

            default:
                return (
                    <Error/>
                );
        }
    }
}

const mapStateToProps = state => ({
    filesToUpload: state.uploadReducer.filesToUpload,
    status: state.uploadReducer.status,
    file: state.uploadReducer.file,
    token: state.uploadReducer.token,
    peers: state.uploadReducer.peers,
    speedUp: state.uploadReducer.speedUp
});

export default connect(mapStateToProps, {seedFiles: seedFiles})(UploadPage);