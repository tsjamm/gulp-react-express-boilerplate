
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { BaseView } from './components/common/BaseView.jsx';


render(
    <BrowserRouter >
        <BaseView />
    </BrowserRouter>,
    document.getElementById('bodyWrapper')
);