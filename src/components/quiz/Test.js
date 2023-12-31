import "./test.css";
import React, {Component} from "react";
import Spinner from "../spinner/Spinner";
import TitleBlock from "../title-block/TitleBlock";
import LeftArrow from "../svg/LeftArrow";
import RightArrow from "../svg/RightArrow";
import {Link} from "react-router-dom";
import QuizInfo from "../quiz-info/QuizInfo";
import Timer from "../timer/Timer";

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCardKey: 0,
            answersLog: {},
            selectedVariants: {},
        }
    }

    moveActiveCardKey = (amount, activeCardKey) => {
        if (activeCardKey !== amount && activeCardKey !== -1) {
            this.setState({activeCardKey});
        }
    }

    setSelectedVariant = (quiz, index, answer) => {
        if (quiz) {
            this.setState(prevState => ({
                selectedVariants: {
                    ...prevState.selectedVariants,
                    [index]: answer
                }
            }));
        }

        this.setAnswer(index);
    }

    setAnswer = (index) => {
        this.setState(({answersLog, selectedVariants}) => {
            answersLog[index] = selectedVariants[index];

            return (
                {
                    answersLog: answersLog
                }
            )
        })
    }

    getResult = (quiz, answersLog) => {
        let correctAnswers = 0;

        for (let i = 0; i < quiz.questions.length; i++) {
            if (quiz.questions[i].correctAnswer === answersLog[i]) {
                correctAnswers += 1;
            }
        }

        this.props.setResult(correctAnswers);
    }

    ifExpired = () => {
        this.getResult(this.props.quiz, this.state.answersLog);
    }

    render() {
        const {quiz, loading} = this.props;

        const {activeCardKey, selectedVariants, answersLog} = this.state;

        const view = loading ?
            <Spinner /> :
            <View quiz={quiz}
                  activeCardKey={activeCardKey}
                  setSelectedVariant={this.setSelectedVariant}
                  selectedVariants={selectedVariants}
                  answersLog={answersLog}
                  setAnswer={this.setAnswer}
                  getResult={this.getResult}
                  moveActiveCardKey={this.moveActiveCardKey}
                  ifExpired={this.ifExpired}/>

        return (
            <div className="test-wrapper">
                {view}
            </div>
        );
    }
}

function View({quiz, activeCardKey, moveActiveCardKey,
                  setSelectedVariant, selectedVariants,
                  answersLog, getResult, ifExpired}) {

    const cards = quiz.questions.map((question, key) => {
        const cardClasses = key === activeCardKey ? "card active" : "card";

        const variants = question.answers.map((item, index) => {
            const variantClasses = selectedVariants[key] === item ? "variant selected-variant" : "variant"

            return (
                <div key={index} onClick={() => setSelectedVariant(quiz, activeCardKey, item)}
                     className={variantClasses}>
                    {decode(item)}
                </div>
            )
        });

        return (
            <div key={key} className={cardClasses}>
                <p className="card-question">{decode(question.question)}</p>
                <div className="variants">
                    {variants}
                </div>
            </div>
        )
    })

    const actionBtn = (activeCardKey + 1) === quiz.questions.length ?
        <Link to="/result">
            <button onClick={() => getResult(quiz, answersLog)} className="complete-quiz-btn card-button">Complete quiz</button>
        </Link> :
        <>
            <button onClick={() => {
                moveActiveCardKey(quiz.questions.length, activeCardKey + 1);
            }} className="complete-btn card-button">Complete
            </button>
            <Link to="/result" >
                <button onClick={() => getResult(quiz, answersLog)} className="end-quiz-btn card-button">End quiz</button>
            </Link>
        </>

    return (
        <>
            <TitleBlock topic={quiz.title.toLowerCase()}/>
            <div className="test-content">
                <QuizInfo quiz={quiz}/>
                <div className="quiz-container">
                    <div className="quiz-parameters">
                        <div className="timer-wrapper">
                            <Timer time={quiz.time} ifExpired={ifExpired}/>
                        </div>
                        <div className="quiz-counter">
                            Question {activeCardKey + 1} from {quiz.amountOfQuestions}
                        </div>
                    </div>

                    <div className="quiz-cards">
                        <button onClick={() => moveActiveCardKey(quiz.questions.length, activeCardKey - 1)}
                                className="slider-btn">
                            <LeftArrow/>
                        </button>
                        <div className="cards">
                            {cards}
                            <div className="card-buttons">
                                {actionBtn}
                            </div>
                        </div>
                        <button onClick={() => moveActiveCardKey(quiz.questions.length, activeCardKey + 1)}
                                className="slider-btn">
                            <RightArrow/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

function decode(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");

    return txt.documentElement.textContent;
}

export default Test;