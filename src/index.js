import React, {Component} from 'react';
import {render} from 'react-dom';
import './style.css';
import Login from './LoginComponent';
import FormWrapper from './formWrapperComponent';
import 'bootstrap/dist/css/bootstrap.css';
import * as userService from "./user.service";
import AbbottComponent from "./AbbottComponent";



class App extends Component {
    constructor() {
        super();
        this.state = {
            name: 'React',
            login: false
        };

        this.onLogin = this.onLogin.bind(this);
        this.getClass = this.getClass.bind(this);
    }


    onLogin() {
        this.setState({login: true});
    };


    getMainComponent() {
        if (this.state.login) {
            return userService.getUserType() === userService.KnownType.hospitalUser ? <FormWrapper></FormWrapper>:<AbbottComponent></AbbottComponent> ;
        } else {
            return <Login onLogin={this.onLogin}></Login>;
        }
    };


    getClass() {
        if(!this.state.login) {
            return "with-image"
        } else {
            return "without-image"

        }
    }

    render() {
        return (
            <div className={this.getClass()}>
                {this.getMainComponent()}
            </div>
        );
    }
}

render(<App/>, document.getElementById('root'));
