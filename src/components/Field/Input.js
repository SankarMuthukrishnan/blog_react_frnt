import React from 'react';
import Label from "./Label";
import Error from "./Error";
import { Editor } from '@tinymce/tinymce-react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            valueEntered: props.input.value.toString() ? true : false,
            inputValue: props.input.value,
            defaultValue: props.input.value,
            acText: ''
        };
    }

    static defaultProps = {
        required: false,
        type: "text",
        disabled: false,
        onKeyPress: () => { }
    }

    componentDidUpdate(prevProps) {
        const { input: { value } } = this.props;
        if (value != prevProps.input.value) {
            this.setState({
                valueEntered: value.toString() ? true : false,
                inputValue: value
            })
        }
    }

    onFocusHandler = () => {
        this.setState({
            focus: true
        });
    }

    onBlurHandler = () => {
        this.setState({
            focus: false
        });
    }

    handleEditorChange = (content) => {
        const { input: { onChange } } = this.props;
        onChange(content);
    }

    keyUpHandler = (e) => {
        this.setState({
            acText: e.target.value
        })
    }

    getInput = () => {
        const { focus, defaultValue } = this.state;
        const { type, inputclass, flexible = false, value, input, onKeyPress, meta: { error, touched }, ...other } = this.props;

        if (type === "editor") {
            return (
                <Editor
                    apiKey="c3vz98s96jhmgmu5xdwjs5htdaaobauzl78zsdzv35ytlowo"
                    initialValue={`<p>${defaultValue}</p>`}
                    init={{
                        height: 250,
                        branding: false,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | bold italic link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | code help'
                    }}
                    onEditorChange={this.handleEditorChange}
                />
            )
        }

        if (flexible != true) {
            if (type === "textarea") {
                return (
                    <textarea {...input} {...other} className={inputclass} onFocus={this.onFocusHandler} onBlur={(e) => { input.onBlur(e); setTimeout(() => this.onBlurHandler()) }}></textarea>
                )
            }
            return (
                <input type={type} {...input} {...other} defaultValue={value} className={inputclass} onFocus={this.onFocusHandler} onBlur={(e) => { input.onBlur(e); setTimeout(() => this.onBlurHandler()) }} autoComplete="off" />
            )
        }
        else {
            return (
                <input type={type} {...input} {...other} defaultValue={value} className={inputclass} onKeyUp={this.keyUpHandler} onFocus={this.onFocusHandler} onBlur={(e) => { input.onBlur(e); setTimeout(() => this.onBlurHandler()) }} />
            )
        }
    }

    render() {
        const { label = false, required, meta: { error, touched }, type, classes, servererror } = this.props;
        const { focus, valueEntered, acText } = this.state;
        if (label !== false) {
            return (
                <div className={`${touched && error ? " " + "haserror" : (valueEntered ? "hassuccess" : "")} accountsec_inputsec`}>
                    {
                        label !== false && type !== "editor" && (
                            <Label text={acText ? acText : label} focus={focus || valueEntered ? true : false} />
                        )
                    }
                    <div className={`${classes ? classes : ''}`}>{this.getInput()}</div>
                    <Error {...this.props} />
                </div>
            )
        } else {
            return (
                <div className={`${touched && error ? " " + "haserror" : (valueEntered ? "hassuccess" : "")} ${classes ? classes : ''}`}>
                    {this.getInput()}
                    <Error {...this.props} />
                </div>
            )
        }
    }
}