import "./spinner.css";
import React from "react";

const Spinner = () => {
    return (
        <div className="spinner">
            <img src={"/loader.gif"} alt=""/>
        </div>
    )
};

export default Spinner;