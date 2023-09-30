import React, {Component} from "react";
import Header from "../components/header/Header";
import Result from "../components/result/Result";
import Footer from "../components/footer/Footer";

class Certificate extends Component {
    render() {
        return (
            <div className="result-wrapper">
                <Header />
                <Result quiz={this.props.quiz} result={this.props.result} loading={this.props.loading}/>
                <Footer />
            </div>
        );
    }
}

export default Certificate;