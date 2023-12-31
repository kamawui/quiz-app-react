import React, {Component} from "react";
import "./header.css";
import Gear from "../svg/Gear";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            ]
        }
    }


    render() {
        const {links} = this.state;

        const linkElements = links.map((item, key) => {
            return (
                <a key={key} href={item.url} target="_blank"><div className="header-link-logo"><img src={item.logo} alt="github"/></div></a>
            )
        })

        return (
            <div className="header-wrapper">
                <div className="header-links">
                    {linkElements}
                </div>
                <div className="navigation">
                    <Gear />
                    <h1>Quiz</h1>
                </div>

            </div>
        );
    }
}

export default Header;