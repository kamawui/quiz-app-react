import "./quizInfo.css";
import React, {Component} from "react";

class QuizInfo extends Component {

    render() {
        const {quiz} = this.props;

        return (
            <div className="quiz-info">
                <p><span>Category: </span>{quiz.title}</p>
                <p><span>Difficulty: </span>{quiz.difficulty[0].toUpperCase() + quiz.difficulty.substring(1)}</p>
                <p><span>Amount of questions: </span>{quiz.amountOfQuestions}</p>
            </div>
        );
    }
}

export default QuizInfo;