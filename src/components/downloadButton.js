import React, {Component} from 'react';

class DownloadButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.onClick) this.props.onClick(this.props.token);
    }

    render() {
        return (
            <div>
                <button className="mt-3 btn btn-outline-danger" onClick={this.onClick}>Download File <i className="fa fa-download" aria-hidden="true"></i></button>
            </div>
        );
    }
}

export default DownloadButton;