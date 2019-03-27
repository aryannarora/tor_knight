import React, {Component} from 'react';

class Tempalink extends Component {
    render() {
        const url = window.location.origin + '/' + this.props.token;
        return (
            <div>
                <a href={url}>{url}</a>
            </div>
        );
    }
}

export default Tempalink;