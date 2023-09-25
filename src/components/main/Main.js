import React, {Component} from "react";
import "./main.css";
import Skeleton from "../skeleton/Skeleton";
import {Link} from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [
                {
                    title: "Mathematics",
                    tag: "math",
                    category: 19,
                    difficulty: "easy",
                },
                {
                    title: "Literature",
                    tag: "literature",
                    category: 10,
                    difficulty: "easy",
                },
                {
                    title: "Art",
                    tag: "art",
                    category: 25,
                    difficulty: "easy",
                },
                {
                    title: "Video games",
                    tag: "games",
                    category: 15,
                    difficulty: "easy",
                },
                {
                    title: "Science & Nature",
                    tag: "nature",
                    category: 17,
                    difficulty: "easy",
                }
            ],
            activeOption: null,
        }
    }

    changeActiveSubject = (activeOption) => {
        this.setState({activeOption});
    }

    changeDifficulty = (diff) => {
        const {quizzes, activeOption} = this.state;

        const obj = quizzes.find(item => item.tag === activeOption.tag);

        this.setState(({quizzes}) => {
            let newQuizzes = quizzes.map(item => {
                if (item.tag === obj.tag) {
                    obj.difficulty = diff;
                    return obj;
                }

                return item;
            });

            return (
                quizzes: newQuizzes
            )
        })
    }



    render() {
        const {quizzes, activeOption} = this.state;

        const availableQuizzes = quizzes.map(item => {

            let active = activeOption ? activeOption : {tag: "none"}

            return (
                <div className={active.tag === item.tag ? "quiz-link active-option" : "quiz-link"}
                     onClick={() => this.changeActiveSubject(item)}>
                    <span>{item.title}</span>
                </div>
            )
        });

        const options = activeOption ? <ActiveOption onChangeDiff={this.changeDifficulty} activeOption={activeOption}/> : <Skeleton />

        return (
            <div className="main-wrapper">
                <div className="main-info">
                    <h2 className="main-header">Quiz React App</h2>
                    <p className="main-paragraph">
                        Different topic quizzes from <a className="link-text" href="https://opentdb.com/">Trivia Database</a>
                    </p>
                </div>
                <div className="main-quizzes">
                    <div className="quizzes-wrapper">
                        <div className="available-quizzes-header">available quizzes</div>
                        <div className="available-quizzes">
                            {availableQuizzes}
                        </div>
                    </div>
                    {options}
                </div>
            </div>
        );
    }
}

const ActiveOption = ({activeOption, onChangeDiff}) => {
    return (
        <div className="option-wrapper">
            <div className="option-info">Set up a quiz</div>
            <div className="option-title">{activeOption.title}</div>
            <div className="options">
                <button onClick={() => onChangeDiff("easy")}
                        className={activeOption.difficulty === "easy" ? "difficulty active-option" : "difficulty"}>
                    Easy
                </button>
                <button onClick={() => onChangeDiff("medium")}
                    className={activeOption.difficulty === "medium" ? "difficulty active-option" : "difficulty"}>
                    Medium
                </button>
                <button onClick={() => onChangeDiff("hard")}
                    className={activeOption.difficulty === "hard" ? "difficulty active-option" : "difficulty"}>
                    Hard
                </button>
            </div>
            <Link to="/quiz" style={{ textDecoration: 'none' }}><button className="start-quiz">Start</button></Link>
        </div>
    )
}

export default Main;

