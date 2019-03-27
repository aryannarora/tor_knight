import React, {Component} from 'react';
import './App.css';
import Header from './components/layout/header'
import {Provider} from 'react-redux';
import UploadPage from './components/uploadPage'
import store from './store'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <div className="container">
                        <Header/>
                        <UploadPage/>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
