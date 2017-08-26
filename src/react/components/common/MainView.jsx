
/** Main Wrapper View */

import React, { Component } from 'react';

import { Router, Route } from 'react-router';

import { SampleView } from '../sample/SampleView.jsx';

export class MainView extends Component {
    render() {
        return (
        <main id="main" className="main">
            <div id="mainContainer" className="main-container">
                <Route exact path="/" render={props => <SampleView heading="Home" {...props} />} />
                <Route exact path="/sample.html" render={props => <SampleView heading="Sample" {...props} />} />
            </div>
        </main>
        )
    }
}