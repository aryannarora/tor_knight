import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropzone from "./dropZone";
import Tempalink from "./tempalink";
import FileDescriptor from "./fileDescriptor";
import Stats from "./stats";
import {seedFiles} from './../actions/upload.actions';

class UploadPage extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.filesToUpload) {
            nextProps.filesToUpload.map(file => (
                this.props.filesToUpload.unshift(file)
            ));
        }
    }

    render() {
        // const files = this.props.filesToUpload.map(file => (
        //     <div key={file.lastModified}>
        //         <h3>{file.name}</h3>
        //         <p>{file.size}</p>
        //     </div>
        // ));

        switch (this.props.status) {
            case 'ready' :
                return (
                    <div>
                        <h3>Drop a file here to upload</h3>
                        <Dropzone onFilesAdded={this.props.seedFiles}/>
                    </div>
                );

            case 'processing' :
                return (
                    <div>
                        <h3>Processing...</h3>
                    </div>
                );

            case 'uploading':
                return (
                    <div>
                        <h3>Uploading file!</h3>
                        <FileDescriptor file={this.props.file}/>
                        <Stats peers={this.props.peers} speedUp={this.props.speedUp}/>
                        <Tempalink token={this.props.token}/>
                    </div>
                );

            default:
                return (
                    <div>
                        <h3>Boom shakalaka</h3>
                    </div>
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