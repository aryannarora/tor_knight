import React, {Component} from 'react';

class Stats extends Component {
    render() {
        let sp = "";
        if (this.props.speedDown) sp =  <span>DownSpeed: {this.props.speedDown} </span>;
        return (
            <div>
                <span>UpSpeed: {this.props.speedUp} </span>
                {sp}
                <span>Peers: {this.props.peers} </span>
            </div>
        );
    }
}

export default Stats;