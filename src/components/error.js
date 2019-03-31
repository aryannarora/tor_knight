import React, {Component} from 'react';
import './css/general.css';

class Error extends Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="container">
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="container">
                            <div className="jumbotron bg-gw">
                                <h1 className="display-1"><i className="fa  fa-spin fa-cog fa-3x"></i></h1>
                                <h1 className="display-3">ERROR</h1>
                                <p className="lower-case">Nothing is wrong. Everything's under control from our side.</p>
                                <p className="lower-case">Maybe you're just not supposed to be here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;