import React, { Component } from 'react';
import { SubmitRecord } from './IMCRSubmitRecordComponent';
import fields from "./fields.json";
import { getByKey } from "./mitraClipRecord"
import logo from './IMCR-LOGO.png';

export default class IMCRStep extends Component {
    constructor() {
        super();

        this.state = {};

        this.validateForm = this.validateForm.bind(this);
    }


    validateForm(e) {
        e.preventDefault();

        try {
            if (this.form.reportValidity()) {

                const allFieldsInStep = fields[this.props.stepName];

                let doesHaveEmptyValue = false;

                for (let i = 0; i < allFieldsInStep.length; i++) {
                    const keyName = Object.keys(allFieldsInStep[i])[0];

                    if (getByKey(allFieldsInStep[i][keyName].name) === "@@IMCR@@") {
                        doesHaveEmptyValue = true;
                        break;
                    }
                }

                if (doesHaveEmptyValue) {
                    const userResponse = window.confirm("Missing values, do you want to continue?");
                    if (userResponse) {
                        this.props.nextStep();

                    }
                } else {
                    this.props.nextStep();
                }

            } else {
                console.log(1);

            }
        } catch (e) {
            console.error(e);
        }
    }

    createNavigationBar() {
        const arr = [];

        const keys = Object.keys(fields);
        for (let i = 0; i < keys.length; i++) {
            <li><a href="#">Link</a></li>
            arr.push(<li><a href="#" onClick={() => this.props.goToStep(i + 1)}>{keys[i]}</a></li>)
            // class="w3-bar-item w3-button w3-hover-white"
            //arr.push(<a href="#" onclick="this.props.goToStep(i+1)" class="w3-bar-item w3-button w3-hover-white">{keys[i]}</a> )
        }
        return arr;
    }





    render() {
        return (<div >
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            <img className="logo" src={logo} alt={"IMCR"} />

                        </a>

                    </div>
                    <div >
                        <ul class="nav navbar-nav">
                            {this.createNavigationBar()}
                        </ul>
                        </div>
                </div>
            </nav>
            <div className="card1">
                <h3>{this.props.stepName}</h3>
                <form
                    ref={form => this.form = form} >
                    {this.props.children}
                </form>

                {this.props.currentStep > 1 ? <button class="btn btn-info" style={{ "width": "160px" }} onClick={this.props.previousStep}>Previous Step</button> : null}
                {this.props.currentStep < this.props.totalSteps ? <button style={{ "width": "160px" }} class="btn btn-primary" onClick={this.validateForm}>Next Step</button> : null}


                {this.props.currentStep === this.props.totalSteps ? <SubmitRecord></SubmitRecord>
                    : null}

                <p class="text-center">{this.props.currentStep} / {this.props.totalSteps}</p>


            </div>
        </div>);
    }
}

