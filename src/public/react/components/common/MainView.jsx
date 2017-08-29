
/** Main Wrapper View */

import React, { Component } from 'react';

import { Router, Route } from 'react-router';

import { RoutesView } from './RoutesView.jsx';

export class MainView extends Component {
    render() {
        return (
        <main id="main" className="main">
            <div id="mainContainer" className="main-container">
                {RoutesView}
            </div>
        </main>
        )
    }
}