import "./spinner.css";
import React from "react";
import {Link} from "react-router-dom";

const Spinner = () => {
    return (
        <div className="spinner">
            <img src={"/loader.gif"} alt=""/>
            <Link to="/home">
                <button className="return-home">return home</button>
            </Link>
        </div>
    )
};

export default Spinner;