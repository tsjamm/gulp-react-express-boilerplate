
/** Header */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

var HeaderViewModel = {
    navInfo: { 
        sampleItem: { id:"sample", class:"sample-nav-item nav-list-item", text:"Sample", viewId:"sample" }
    }
}

export class HeaderView extends Component {
    constructor(props) {
        super(props);
        this.state = HeaderViewModel;
    }
    render() {
        var navItemList = Object.keys(this.state.navInfo).map((infoKey) => {
            var navItem = this.state.navInfo[infoKey];

            return (
                <li key={navItem.id} id={navItem.id} className={navItem.class}>
                    <NavLink className="nav-link" activeClassName="selected" to={"/"+navItem.viewId+".html"} >{navItem.text}</NavLink>
                </li>
            )
        });
        return (
        <header id="header" className="header">
            <div id="headerContainer" className="header-container">
                <div id="logoWrapper" className="logo-wrapper">
                    <NavLink className="nav-link" activeClassName="selected" to={"/"} >
                        <img src="./assets/img/sample-logo.png" />
                    </NavLink>
                </div>
                <div id="navWrapper" className="nav-wrapper">
                    <nav id="nav" className="nav">
                        <div id="navContainer" className="nav-container">
                            <ul id="navList" className="nav-list">
                                {navItemList}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
        )
    }
}
