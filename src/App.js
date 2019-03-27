import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/header'
import {Provider} from 'react-redux';
import UploadPage from './components/uploadPage';
import DownloadPage from './components/downloadPage';
import store from './store'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Header/>
                <Router>
                    <div className="App">
                        <div className="container">
                            <Route exact path="/" component={UploadPage}/>
                            <Route path="/:token" component={DownloadPage} />
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
