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

            let classString = "";
            if(i + 1 === this.props.currentStep){
                classString = "underline"
            }
            arr.push(<li class={classString}><a href="#" onClick={() => this.props.goToStep(i + 1)}>{keys[i]}</a></li>)
            // class="w3-bar-item w3-button w3-hover-white"
            //arr.push(<a href="#" onclick="this.props.goToStep(i+1)" class="w3-bar-item w3-button w3-hover-white">{keys[i]}</a> )
        }
        return arr;
    }





    render() {
        return (<div >
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container-fluid" style={{ "justify-content": "flex-start"}}>
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            <img className="logo" src={logo} alt={"IMCR"} />

                        </a>

                     
                    </div>
                    <ul class="nav navbar-nav" style={{"flex-direction":"row"}}>
                            {this.createNavigationBar()}
                        </ul>
                </div>
            </nav>
            <div className="card1">
                <h3 style={{ "margin": "1em" }}>{this.props.stepName}</h3>
                <form class="step-form"
                    ref={form => this.form = form} >
                    {this.props.children}
                </form>


                {this.props.currentStep > 1 ? <button class="btn btn-info" style={{ "width": "160px", "margin-top":".5em" }} onClick={this.props.previousStep}>Previous Step</button> : null}
                {this.props.currentStep < this.props.totalSteps ? <button style={{ "width": "160px", "margin-top":".5em" }} class="btn btn-primary" onClick={this.validateForm}>Next Step</button> : null}


                {this.props.currentStep === this.props.totalSteps ? <SubmitRecord></SubmitRecord>
                    : null}

                <p class="text-center" style={{"margin-top":".5em"}}>{this.props.currentStep} / {this.props.totalSteps}</p>


            </div>
        </div>);
    }
}

