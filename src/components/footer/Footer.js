import "./footer.css";
import React, {Component} from "react";

class Footer extends Component {
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

        const footerLinks = links.map((item, key) => {
            return (
                <a key={key} href={item.url} className="footer-link-item" target="_blank">
                    Me on {item.title}
                </a>
            )
        })

        return (
            <div className={"footer-wrapper"}>
                <div className="footer-content">
                    <span>2023 «Quiz»</span>
                    <span>Created using <a href="https://opentdb.com/" target="_blank">Trivia Database</a></span>
                    <span className="footer-links-span">Links: </span>
                    <div className="footer-links">
                        {footerLinks}
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;