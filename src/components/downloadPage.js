import React, {Component} from 'react';
import {connect} from 'react-redux';
import FileDescriptor from "./fileDescriptor";
import DownloadButton from "./downloadButton";
import Stats from "./stats";
import {requestDownload} from './../actions/download.actions';
import {get} from "../db/db";


class DownloadPage extends Component {

    render() {
        const valid = !!get(this.props.match.params.token);
        let btn = <div></div>
        if (true) btn = <DownloadButton onClick={this.props.requestDownload} token={this.props.match.params.token}/>
        switch (this.props.status) {
            case 'ready' :
                return (
                    <div>
                        <h3>Download Page</h3>
                        {btn}
                    </div>
                );

            case 'processing' :
                return (
                    <div>
                        <h3>Processing...</h3>
                    </div>
                );

            case 'initialising':
                return (
                    <div>
                        <h3>Initialising file!</h3>
                        <FileDescriptor file={this.props.file}/>
                        <Stats peers={this.props.peers}/>
                    </div>
                );
            case 'downloading':
                return (
                    <div>
                        <h3>Downloading file!</h3>
                        <FileDescriptor file={this.props.file}/>
                        <Stats peers={this.props.peers} speedUp={this.props.speedUp} speedDown={this.props.speedDown} progress={this.props.progress}/>
                    </div>
                );
            case 'downloaded':
                return (
                    <div>
                        <h3>Downloaded!</h3>
                        <FileDescriptor file={this.props.file}/>
                        <Stats peers={this.props.peers} speedUp={this.props.speedUp}/>
                    </div>
                );

            default:
                return (
                    <div>
                        <h3>Boom shakalaka Boom Boom</h3>
                    </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    status: state.downloadReducer.status,
    file: state.downloadReducer.file,
    // token: state.downloadReducer.token,
    peers: state.downloadReducer.peers,
    speedUp: state.downloadReducer.speedUp,
    speedDown: state.downloadReducer.speedDown,
    progress: state.downloadReducer.progress
});

export default connect(mapStateToProps, {requestDownload: requestDownload})(DownloadPage);