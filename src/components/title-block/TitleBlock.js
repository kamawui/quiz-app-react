import "./titleBlock.css";
import React, {Component} from "react";
import {Link} from "react-router-dom";

class TitleBlock extends Component{
    render() {
        const {topic} = this.props;

        return (
            <div className="title-block-wrapper">
                <div className="title-info">
                    <Link className="link-to-home" to="/home">
                        <h2 className="title-header">Quiz React App</h2>
                    </Link>
                    <p className="title-paragraph">
                        Quiz on the topic of {topic}
                    </p>
                </div>
            </div>
        )
    }
}

export default TitleBlock;