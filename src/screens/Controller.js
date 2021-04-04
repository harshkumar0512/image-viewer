import React, { Component } from 'react';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = "http://3.227.145.17:8085/api/v1/";
    }
    render() {
        return (
            <Router>
                <div className="main-container">
                    <Route exact path='/home' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;
