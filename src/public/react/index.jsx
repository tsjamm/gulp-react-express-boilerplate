
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { BaseView } from './components/common/BaseView.jsx';


render(
    <BrowserRouter >
        <BaseView />
    </BrowserRouter>,
    document.getElementById('bodyWrapper')
);