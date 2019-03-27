import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropzone from "./dropZone";
import {seedFiles} from './../actions/upload.actions';

class UploadPage extends Component {

    // componentWillMount() {
    //     this.props;
    // }

    // componentDidMount() {
    //     this.props.seedFiles([]);
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filesToUpload) {
            nextProps.filesToUpload.map(file => (
                this.props.filesToUpload.unshift(file)
            ));
        }
    }

    render() {
        const files = this.props.filesToUpload.map(file => (
            <div key={file.lastModified}>
                <h3>{file.name}</h3>
                <p>{file.size}</p>
            </div>
        ));

        return (

            <div>
                <h3>Drop a file here to upload</h3>
                {files}
                <Dropzone onFilesAdded={this.props.seedFiles}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filesToUpload: state.uploadReducer.filesToUpload,
    fileToUpload: state.uploadReducer.fileToUpload,
});

export default connect(mapStateToProps, {seedFiles: seedFiles})(UploadPage);