
/** Requests */

import React, { Component } from 'react';

import { BaseView } from '../common/BaseView.jsx';

var SampleViewModel = {
    content: "Sample View Content"
}

export class SampleView extends Component {
    constructor(props) {
        super(props);
        this.state = SampleViewModel;
    }
    render() {
        return (
            <div>
                <h1>{this.props.heading}</h1>
                <p>{this.state.content}</p>
            </div>
        )
    }
}