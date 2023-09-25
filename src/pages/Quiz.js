import React, {Component} from "react";
import {Link} from "react-router-dom";
import Header from "../components/header/Header";
import Test from "../components/quiz/Test";

class Quiz extends Component {
    render() {
        return (
            <div className="quiz-wrapper">
                <Header />
                <Test />
            </div>
        )
    }
}

export default Quiz;