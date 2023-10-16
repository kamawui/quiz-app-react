import React, {Component} from "react";
import "./main.css";
import Skeleton from "../skeleton/Skeleton";
import {Link} from "react-router-dom";
import Service from "../../services/QuizService";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [
                {
                    title: "Mathematics",
                    tag: "math",
                    category: 19,
                    difficulty: "default",
                },
                {
                    title: "Literature",
                    tag: "literature",
                    category: 10,
                    difficulty: "default",
                },
                {
                    title: "Art",
                    tag: "art",
                    category: 25,
                    difficulty: "default",
                },
                {
                    title: "Video games",
                    tag: "games",
                    category: 15,
                    difficulty: "default",
                },
                {
                    title: "Science & Nature",
                    tag: "nature",
                    category: 17,
                    difficulty: "default",
                }
            ],
            activeOption: null,
            difficultyOptions: {
                default: {
                    amountOfQuestions: 12,
                    time: 20,
                },
                easy: {
                    amountOfQuestions: 9,
                    time: 30,
                },
                medium: {
                    amountOfQuestions: 12,
                    time: 20,
                },
                hard: {
                    amountOfQuestions: 20,
                    time: 10,
                },
            },
            links: [
                {
                    url: "https://github.com/kamawui?tab=repositories",
                    logo: "/github-mark-white.png",
                    title: "GitHub"
                },
                {
                    url: "https://discord.com/users/686630494682742861",
                    logo: "/discord-mark-white.png",
                    title: "Discord"
                },
            ],
        }
    }

    quizService = new Service();

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

    convertDifficulties = (difficulty) => {
        if (!difficulty) {
            return "";
        }

        return difficulty;
    }

    getQuiz = () => {
        const {activeOption, difficultyOptions} = this.state;

        this.props.makeLoading(true);

        this.quizService.getMultipleQuiz(
            this.convertDifficulties(activeOption.difficulty),
            activeOption.category,
            difficultyOptions[activeOption.difficulty].amountOfQuestions
        )
            .then(res => this.sendQuiz(
                res,
                activeOption.title,
                activeOption.difficulty,
                difficultyOptions[activeOption.difficulty].amountOfQuestions,
                difficultyOptions[activeOption.difficulty].time
            ))
            .catch((e) => console.log(e))
    }

    sendQuiz = (questions, title, difficulty, amountOfQuestions, time) => {
        let quiz = {
            title: title,
            difficulty: difficulty,
            amountOfQuestions: amountOfQuestions,
            questions: this.shuffle(questions),
            time: time
        };

        this.props.setQuiz(quiz);
    }

    shuffle = (questions) => {
        let currentIndex = questions.length,  randomIndex;

        while (currentIndex > 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [questions[currentIndex], questions[randomIndex]] = [
                questions[randomIndex], questions[currentIndex]];
        }

        return questions;
    }

    componentDidMount() {
        this.props.makeLoading(true);
    }

    render() {
        const {quizzes, activeOption, difficultyOptions, links} = this.state;

        const availableQuizzes = quizzes.map((item, key) => {

            let active = activeOption ? activeOption : {tag: "none"}

            return (
                <div key={key} className={active.tag === item.tag ? "quiz-link active-option" : "quiz-link"}
                     onClick={() => this.changeActiveSubject(item)}>
                    <span>{item.title}</span>
                </div>
            )
        });

        const options = activeOption ?
            <ActiveOption onStart={this.getQuiz} onChangeDiff={this.changeDifficulty}
                          activeOption={activeOption} quizParameters={difficultyOptions[activeOption.difficulty]}/> :
            <Skeleton />

        const mainLinks = links.map((item, key) => {
            return (
                <a key={key} href={item.url} target="_blank">
                    <div className="main-link">
                        <img src={item.logo} alt=""/>
                        <p>{item.title}</p>
                    </div>
                </a>
            )
        })

        return (
            <div className="main-wrapper">
                <div className="main-info">
                    <Link className="link-to-home" to="/home">
                        <h2 className="title-header">Quiz React App</h2>
                    </Link>
                    <p className="main-paragraph">
                        Different topic quizzes from
                        <a className="link-text" href="https://opentdb.com/" target="_blank">
                            {" Trivia Database"}
                        </a>
                    </p>
                </div>
                <div className="main-quizzes">
                    <div className="quizzes-wrapper">
                        <div className="available-quizzes-header">available quizzes</div>
                        <div className="available-quizzes">
                            {availableQuizzes}
                        </div>
                    </div>
                    <div className="option-wrapper">
                        {options}
                    </div>
                </div>
                <div className="main-links">
                    {mainLinks}
                </div>
            </div>
        );
    }
}

const ActiveOption = ({activeOption, onChangeDiff, onStart, quizParameters}) => {
    return (
        <>
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
            <div className="default-options">
                <button onClick={() => onChangeDiff("default")}
                        className={activeOption.difficulty === "default" ? "difficulty-default active-option " : "difficulty-default"}>
                    Default
                </button>
            </div>
            <div className="additional-info">{quizParameters.amountOfQuestions} questions, {quizParameters.time} minutes</div>
            <Link to="/quiz" style={{ textDecoration: 'none' }}><button onClick={onStart} className="start-quiz">Start</button></Link>
        </>
    )
}

export default Main;

