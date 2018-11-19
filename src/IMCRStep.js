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




    render() {
        return (<div>
            <h3>{this.props.stepName}</h3>
            <form
                ref={form => this.form = form} >
                {this.props.children}
            </form>
            <div>
                <p>{this.props.currentStep} / {this.props.totalSteps}</p>

                {this.props.currentStep > 1 ? <p><button onClick={this.props.previousStep}>Previous Step</button></p> : null}
                {this.props.currentStep < this.props.totalSteps ? <p><button onClick={this.validateForm}>Next Step</button></p> : null}

                {this.props.currentStep === this.props.totalSteps ? <SubmitRecord></SubmitRecord>
                    : null}

                <p><button onClick={() => this.props.goToStep(17)}>Step 17</button></p>

            </div>
        </div>);
    }
}

