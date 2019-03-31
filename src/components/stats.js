import React, {Component} from 'react';

class Stats extends Component {
    render() {
        let sp = "", sp2="";
        if (this.props.speedDown) sp =  <span>DownSpeed: {this.props.speedDown} </span>;
        if (this.props.progress) sp2 =  <span>Progress: {this.props.progress} </span>;
        return (
            <div>
                <span>UpSpeed: {this.props.speedUp || 0} </span>
                {sp}
                {sp2}
                <span>Peers: {this.props.peers} </span>
            </div>
        );
    }
}

export default Stats;