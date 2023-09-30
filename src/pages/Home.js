import React, {Component} from "react";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Footer from "../components/footer/Footer";

class Home extends Component {
    render() {
        return (
            <div className="home-wrapper">
                <Header />
                <Main setQuiz={this.props.setQuiz} makeLoading={this.props.makeLoading}/>
                <Footer />
            </div>
        )
    }
}

export default Home;
