import React, {Component} from 'react';
import logo from './IMCR-LOGO.png';
import {api} from "./config";

const cookies = require('browser-cookies');

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            isToggleOn: true
        };

        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.login = this.login.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    emailChanged(event) {
        console.log('emailChanged: ' + event.target.value)
        this.setState({
            email: event.target.value
        });
    }

    passwordChanged(event) {
        console.log('passwordChanged: ' + event.target.value)
        if (event.target.value.length >= 6) {
            this.setState({
                password: event.target.value
            });
        }
        else {
            console.log(event.target.value);
        }
    }


    login() {
        fetch(`${api}/login?username=${this.state.email}&password=${this.state.password}`)
            .then((res) => {
                if (res.status === 401) {
                    throw new Error();
                } else {
                    return res.json()
                }
            })
            .then((json) => {
                cookies.set("imcr-token",json.token);
                this.props.onLogin();
            })
            .catch((err)=>{
                cookies.erase("imcr-token");
                alert("Wrong username or password");
            })
    }


    handleCloseClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            [
                /* Sidebar/menu*/
                <nav className="sidebar">
                    <button onClick={this.handleCloseClick}> Close Menu</button>
                    <br/>
                    <h3 className="w3-padding-64 w3-center"><b>"Israel" <br/> "Mitraclip" <br/> "Registry"</b></h3>
                </nav>

                , <div className="top">
                <img className="logo" src={logo} alt={"IMCR"}/>
            </div>,

                <section className="container">
                    <div className="login_heading">
                        <div className="login_body">
                            <label for="email"> E-mail: </label>
                            <input id="email" type="email" name="email" onChange={this.emailChanged}/>
                            <label for="pass"> Password: </label>
                            <input id="pass" type="password" name="psw" onChange={this.passwordChanged}/>
                            <input type="button" class="btn" value="Login" onClick={this.login}/>
                        </div>
                    </div>
                </section>
            ]

        );
    }
}