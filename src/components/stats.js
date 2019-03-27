import React, {Component} from 'react';

class Stats extends Component {
    render() {
        return (
            <div>
                <span>UpSpeed: {this.props.speedUp} </span>
                <span>Peers: {this.props.peers} </span>
            </div>
        );
    }
}

export default Stats;