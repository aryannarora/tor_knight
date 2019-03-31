import React, {Component} from 'react';
import {connect} from 'react-redux';
import FileDescriptor from "./fileDescriptor";
import DownloadButton from "./downloadButton";
import Stats from "./stats";
import {requestDownload, isValidURI} from './../actions/download.actions';
import Error from "./error";
import Loading from "./loading";
import Connecting from "./connecting";
import {ProgressBar} from 'react-bootstrap';


class DownloadPage extends Component {

    componentDidMount() {
        this.props.isValidURI(this.props.match.params.token);
    }

    render() {
        switch (this.props.status) {
            case 'ready' :
                return (
                    <div>
                        <h3 className="mt-3">Download Page</h3>
                        <FileDescriptor file={this.props.file}/>
                        <DownloadButton onClick={this.props.requestDownload} token={this.props.match.params.token}/>
                    </div>
                );

            case 'connecting' :
                return (
                    <div>
                        <Connecting/>
                        <h3 className="mt-3">Connecting to peers</h3>
                    </div>
                );
            case 'verifying' :
                return (
                    <div>
                        <h3 className="mt-3">Verifying the token</h3>
                        <Loading/>
                    </div>
                );

            case 'initialising':
                return (
                    <div>
                        <h3>Initialising file!</h3>
                        <Loading/>
                        <FileDescriptor file={this.props.file}/>
                        <Stats peers={this.props.peers}/>
                    </div>
                );
            case 'downloading':
                return (
                    <div>
                        <h3>Downloading file <i className="fa fa-angle-double-down"></i></h3>
                        <FileDescriptor file={this.props.file}/>
                        <ProgressBar striped variant="info" now={this.props.progress} className="my-3"/>
                        <Stats peers={this.props.peers} speedUp={this.props.speedUp} speedDown={this.props.speedDown}/>
                    </div>
                );
            case 'downloaded':
                return (
                    <div>
                        <h3>Downloaded!<i className="fa fa-check" aria-hidden="true"></i></h3>
                        <FileDescriptor file={this.props.file}/>
                        <ProgressBar striped variant="info" now={this.props.progress} className="my-3"/>
                        <Stats peers={this.props.peers} speedUp={this.props.speedUp}/>
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
    status: state.downloadReducer.status,
    file: state.downloadReducer.file,
    // token: state.downloadReducer.token,
    peers: state.downloadReducer.peers,
    speedUp: state.downloadReducer.speedUp,
    speedDown: state.downloadReducer.speedDown,
    progress: state.downloadReducer.progress
});

export default connect(mapStateToProps, {requestDownload: requestDownload, isValidURI: isValidURI})(DownloadPage);