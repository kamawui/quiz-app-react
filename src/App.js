import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {Component} from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import NoPage from "./pages/NoPage";
import "./app.css";
import Certificate from "./pages/Certificate";

class App extends Component {
    constructor() {
        super();

        this.state = {
            quiz: null,
            loadingQuiz: true,
            loadingResult: true,
            result: null,
        }
    }

    setQuiz = (newQuiz) => {
        this.setState(({quiz, loadingQuiz, loadingResult}) => {
            return {
                quiz: newQuiz,
                loadingQuiz: false,
                loadingResult: true,
            }
        });
    }

    makeLoading = (loadingQuiz) => {
        this.setState({loadingQuiz});
    }

    setResult = (amountOfCorrectAnswers) => {
        this.setState(({loadingResult, result}) => {
            return {
                loadingResult: false,
                result: amountOfCorrectAnswers
            }
        })
    }

    render() {
        const {quiz, loadingQuiz, result, loadingResult} = this.state;


        return (
            <div className="app-wrapper">
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home setQuiz={this.setQuiz} makeLoading={this.makeLoading}/>}/>
                        <Route path="/home" element={ <Home setQuiz={this.setQuiz} makeLoading={this.makeLoading}/> }/>
                        <Route path="/quiz" element={ <Quiz quiz={quiz} loading={loadingQuiz} setResult={this.setResult}/> }/>
                        <Route path="/result" element={ <Certificate quiz={quiz} result={result} loading={loadingResult}/> }/>
                        <Route path="/*" element={<NoPage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;

// git push -u origin main