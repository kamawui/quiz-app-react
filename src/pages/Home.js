import React, {Component} from "react";
import Header from "../components/header/Header";
import Main from "../components/main/Main";

class Home extends Component {
    render() {
        return (
            <div className="home-wrapper">
                <Header />
                <Main />
            </div>
        )
    }
}

export default Home;
