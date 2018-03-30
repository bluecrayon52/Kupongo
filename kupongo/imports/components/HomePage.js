import React, { Component } from 'react';

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div><h1>Welcome {this.props.userInfo.firstName}</h1></div>
        );
    }
}

export default HomePage;