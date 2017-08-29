
import React from 'react';
import { Router, Route } from 'react-router';
import { SampleView } from '../sample/SampleView.jsx';

exports.RoutesView = (
    <div>
        <Route exact path="/" render={props => <SampleView heading="Home" {...props} />} />
        <Route exact path="/sample.html" render={props => <SampleView heading="Sample" {...props} />} />
    </div>
);