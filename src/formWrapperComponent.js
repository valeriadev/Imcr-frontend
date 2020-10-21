import React, { Component } from "react";
import fields from "./fields.json";
import IMCRInput from "./ImcrInputComponent.js";
import IMCRListOptions from "./IMCRListComponent.js";
import IMCRRadio from "./IMCRRadioComponent.js";
import IMCRTextarea from "./IMCRTextareaComponent.js";
import IMCRStep from "./IMCRStep.js";
import StepWizard from "react-step-wizard";
import { set, getByKey } from "./mitraClipRecord";
import * as api from "./api.service"

export default class FormWrapper extends Component {
  constructor() {
    super();
    this.state = {
      steps: this.getSteps(fields)
    };

    this.initData();
    this.emptyValue = "@@IMCR@@";

    this.dataChanged = this.dataChanged.bind(this);
    api.registerDataChnage(this.dataChanged)
  }

  dataChanged(){
    this.forceUpdate();
  }

  initData() {
    const steps = Object.keys(fields);

    for (let j = 0; j < steps.length; j++) {
      let inputFromStep = fields[steps[j]];

      for (let i = 0; i < inputFromStep.length; i++) {
        let keyName = Object.keys(inputFromStep[i])[0];
        if (inputFromStep[i][keyName].titleOnly === "true") {
          continue;
        }
        set(inputFromStep[i][keyName].name, this.emptyValue);
      }
    }
  }

  getSteps(fields) {
    return Object.keys(fields);
  }

  getComponnetForStep(stepName) {
    let inputFromStep = fields[stepName];
    let componentArray = [];
    for (let i = 0; i < inputFromStep.length; i++) {
      componentArray.push(this.getComponent(inputFromStep[i]));
    }
    return componentArray;
  }

  getComponent(input) {
    let keyName = Object.keys(input)[0];
    const value = getByKey(input[keyName].name);
    if (!value || value === this.emptyValue) {
      set(input[keyName].name, this.emptyValue);
       delete input[keyName].realValue;
       input[keyName].bust = Math.floor(Math.random() * 99999) + 1000  
    } else {
      input[keyName].realValue = value;
    }
    if (
      input[keyName].type === "number" ||
      input[keyName].type === "date" ||
      input[keyName].type === "month"
    ) {
      return <IMCRInput {...input[keyName]} />;
    } else if (input[keyName].type === "list") {
      return <IMCRListOptions {...input[keyName]} />;
    } else if (input[keyName].type === "radio") {
      return <IMCRRadio {...input[keyName]} />;
    } else if (input[keyName].type === "text") {
      return <IMCRTextarea {...input[keyName]} />;
    } else if (input[keyName].titleOnly === "true") {
      return <h5 class="title">{keyName}</h5>;
    }
  }

  render() {
    return (
      <div>
        <section>
          <StepWizard initialStep={1}>
            {this.state.steps.map(step => {
              return (       
                <IMCRStep stepName={step}>
                  {this.getComponnetForStep(step)}
                </IMCRStep>  
              );
            })}
          </StepWizard>
        </section>

        <footer />
      </div>
    );
  }
}
