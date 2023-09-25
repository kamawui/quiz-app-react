import "./test.css";
import React, {Component} from "react";
import {Link} from "react-router-dom";

class Test extends Component {
    render() {
        return (
            <div className="test-wrapper">
                <p>Nothing yet!</p>
                <Link to="/home" style={{ textDecoration: 'none' }}><button>Return</button></Link>
            </div>
        );
    }
}

export default Test;