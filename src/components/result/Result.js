import "./result.css";
import React, {Component} from "react";
import Spinner from "../spinner/Spinner";
import TitleBlock from "../title-block/TitleBlock";
import {Link} from "react-router-dom";
import QuizInfo from "../quiz-info/QuizInfo";

class Result extends Component {

    render() {
        const {quiz, loading, result} = this.props;

        const view = loading ?
            <Spinner /> :
            <View quiz={quiz} result={result}/>

        return (
            <div className="result-wrapper">
                {view}
            </div>
        );
    }
}

function View({quiz, result}) {


    function getPercentOfCorrectAnswers(result, maximum) {
        return result / maximum * 100;
    }

    return (
        <>
            <TitleBlock topic={quiz.title.toLowerCase()}/>
            <div className="result-container">
                <QuizInfo quiz={quiz}/>
                <div className="result-content">
                    <div className="result-item">
                        Maximum number of points: {quiz.questions.length}
                    </div>
                    <div className="result-item">
                        Your score: {result}
                    </div>
                    <div className="result-item">
                        Percentage of correct answers: {getPercentOfCorrectAnswers(result, quiz.questions.length)}%
                    </div>
                </div>
                <div className="result-buttons">
                    <Link to="/quiz">
                        <button className="result-btn restart-quiz">Restart quiz</button>
                    </Link>
                    <Link to="/home">
                        <button className="result-btn go-home">To home page</button>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default Result;

