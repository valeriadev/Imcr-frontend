import React, { Component } from 'react';
import { SubmitRecord } from './IMCRSubmitRecordComponent';
import fields from "./fields.json";
import { getByKey } from "./mitraClipRecord"


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
            arr.push(<button class="w3-bar-item w3-button w3-hover-white" onClick={() => this.props.goToStep(i+1)}>{keys[i]}</button>)
            //arr.push(<a href="#" onclick="this.props.goToStep(i+1)" class="w3-bar-item w3-button w3-hover-white">{keys[i]}</a> )
        }
        return arr;
    }




    render() {
        return (<div>
               <nav> 
                    {this.createNavigationBar()}
                </nav>
             <div class="card">   
            <h3>{this.props.stepName}</h3>
            <form
                ref={form => this.form = form} >
                {this.props.children}
            </form>
            <p>{this.props.currentStep} / {this.props.totalSteps}</p>

                {this.props.currentStep > 1 ? <p><button onClick={this.props.previousStep}>Previous Step</button></p> : null}
                {this.props.currentStep < this.props.totalSteps ? <p><button onClick={this.validateForm}>Next Step</button></p> : null}

                {this.props.currentStep === this.props.totalSteps ? <SubmitRecord></SubmitRecord>
                    : null}

                <p><button class="w3-button w3-block w3-padding-large w3-red w3-margin-bottom" onClick={() => this.props.goToStep(17)}>Step 17</button></p>
      </div>
  </div>);
    }
}

