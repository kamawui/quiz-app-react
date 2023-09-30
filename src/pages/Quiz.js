import React, {Component} from "react";
import Header from "../components/header/Header";
import Test from "../components/quiz/Test";
import Footer from "../components/footer/Footer";

class Quiz extends Component {
    render() {
        return (
            <div className="quiz-wrapper">
                <Header />
                <Test quiz={this.props.quiz} loading={this.props.loading} setResult={this.props.setResult}/>
                <Footer />
            </div>
        )
    }
}

export default Quiz;