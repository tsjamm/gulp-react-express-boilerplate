
/** The Base View */
/** This view wraps the Header and the Main Views */

import React, { Component } from 'react';

import { HeaderView } from './HeaderView.jsx';
import { MainView } from './MainView.jsx';

export class BaseView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="bodyContainer" className="body-container">

                <div id="headerWrapper" className="header-wrapper">
                    {/* Header Section Begins */ }
                    <HeaderView />
                    {/* Header Section Ends */ }
                </div>

                <div id="mainWrapper" className="main-wrapper">
                    {/* Main Section Begins */ }
                    <MainView />
                    {/* Main Section Ends */ }
                </div>
            </div>
        );
    }
}
