import React, {Component} from 'react';

class FileDescriptor extends Component {
    render() {
        return (
            <div>
                <span>{this.props.file.name} - {this.props.file.length}</span>
            </div>
        );
    }
}

export default FileDescriptor;