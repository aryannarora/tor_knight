import React, {Component} from 'react';

class DownloadButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        console.log("button is getting clicked")
        if (this.props.onClick) this.props.onClick(this.props.token);
    }

    // componentDidMount() {
    //     this.props.token = window.location.pathname;
    // }

    render() {
        return (
            <div>
                <button onClick={this.onClick}>Download File</button>
            </div>
        );
    }
}

export default DownloadButton;