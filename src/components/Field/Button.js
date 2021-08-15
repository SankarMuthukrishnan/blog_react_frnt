import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import style from '../../assets/css/style.module.css';
import NormalLink from '../NormalLink';

export default class Button extends React.Component {
    static defaultProps = {
        disabled: false,
        link: "",
        target: '_self',
        submit: false,
        classes: "",
        color: "#02269E",
        fetching: false,
        label: "",
        onClick: null,
        rectBtn: false
    }

    getSizeClass = () => {
        if (this.props.size === "small")
            return style.buttonSmall;

        return style.buttonLarge;
    }

    render() {
        const { color, classes, submit, label, target, fetching, link, disabled, onClick, rectBtn, textBtn = false, id = '' } = this.props;
        if (fetching === true) {
            return (
                <div className={`${textBtn ? '' : 'button spinning'}${classes ? " " + classes : ""}`}>
                    <div className="fetching">
                        <Spinner color={color} />
                    </div>
                    <span>{label}</span>
                </div>
            )
        }

        if (disabled === true) {
            return (
                <div className={`${textBtn ? '' : 'button'}${classes ? " " + classes : ""} buttondisabled`}>
                    <span dangerouslySetInnerHTML={{ __html: label }}></span>
                    {rectBtn !== false && <span className={rectBtn}></span>}
                </div>
            )
        }

        if (submit === true) {
            return (
                <button type="submit" className={`${textBtn ? '' : 'button'}${classes ? " " + classes : ""}`}>
                    <span dangerouslySetInnerHTML={{ __html: label }}></span>
                    {rectBtn !== false && <span className={rectBtn}></span>}
                </button>
            )
        }

        if (!link) {
            return (
                <a className={`${textBtn ? '' : 'button'}${classes ? " " + classes : ""}`} onClick={onClick}>
                    <span dangerouslySetInnerHTML={{ __html: label }}></span>
                    {rectBtn !== false && <span className={rectBtn}></span>}
                </a>
            )
        }

        return (
            <NormalLink link={link} className={`${textBtn ? '' : 'button'}${classes ? " " + classes : ""}`} onClick={onClick} id={id}>
                <span dangerouslySetInnerHTML={{ __html: label }}></span>
                {rectBtn !== false && <span className={rectBtn}></span>}
            </NormalLink>
        )
    }
}