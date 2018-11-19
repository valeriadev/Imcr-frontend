import React, {Component} from 'react';
import fields from './fields.json';
import IMCRInput from './ImcrInputComponent.js';
import IMCRListOptions from './IMCRListComponent.js';
import IMCRRadio from './IMCRRadioComponent.js';
import IMCRTextarea from './IMCRTextareaComponent.js';
import {SubmitRecord} from './IMCRSubmitRecordComponent';

export default class FormWrapper extends Component{

    constructor(){
        super();
        this.state={
            steps: this.getSteps(fields)
        }
    };

    getSteps(fields){
        return Object.keys(fields);
    }

    getComponnetForStep(stepName){
        let inputFromStep = fields[stepName];
        let componentArray=[];
        for(let i=0; i<inputFromStep.length;i++){
           componentArray.push(this.getComponent(inputFromStep[i]));
        }
        return componentArray;
    }

    getComponent(input){
       let keyName = Object.keys(input)[0];
        if(input[keyName].type==='number' || input[keyName].type==='date' || input[keyName].type==='month' ){
            return <IMCRInput {...input[keyName]}></IMCRInput>
        }
        else if(input[keyName].type==='list'){
            return <IMCRListOptions {...input[keyName]}></IMCRListOptions>
        }
        else if(input[keyName].type==='radio'){
            return <IMCRRadio {...input[keyName]}></IMCRRadio>
        }
        else if(input[keyName].type==='text'){
            return <IMCRTextarea {...input[keyName]}></IMCRTextarea>
        }
        
    }

    render(){
        console.log(this.state.steps);
        return(<div>steps:
            <ul>
                {this.state.steps.map((step)=>{return <li>{step}: {this.getComponnetForStep(step)}</li>})}
            </ul>
            <SubmitRecord></SubmitRecord>
        </div>
        )
    }

}