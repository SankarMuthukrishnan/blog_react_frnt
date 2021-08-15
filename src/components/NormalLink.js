import React from 'react';
import { Link } from "react-router-dom";
import style from '../assets/css/style.module.css';

class NormalLink extends React.Component {
    render() {
        const { children = "", link = "", className = "", onClick = "", disabled = false, download = false, target = '_self', scrollOffseTop = 0 } = this.props;
        let mailtoCondt = (link.indexOf("mailto:") !== -1);
        let telCondt = (link.indexOf("tel:") !== -1);
        let httpCondt = (link.indexOf("http") !== -1);

        if (disabled) {
            return (
                <div className={`${className} ${style.disabledLink}`}>
                    {children}
                </div>
            );
        }

        if (onClick) {
            return (
                <a className={`${className}`} onClick={onClick}>
                    {children}
                </a>
            );
        }

        if (link == "") {
            return (
                <div className={`${className}`}>
                    {children}
                </div>
            );
        }

        if (httpCondt || mailtoCondt || telCondt) {
            return (
                <a className={`${className}`} href={link} target={httpCondt ? "_blank" : ""} download={download}>
                    {children}
                </a>
            );
        }

        return (
            <Link className={`${className}`} to={link} target={link.startsWith("/api") ? "_blank" : target}>
                {children}
            </Link>
        );
    }
};

export default NormalLink;