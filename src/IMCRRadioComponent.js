import React from 'react';
import {set} from './mitraClipRecord';

export default function IMCRRadio (props) {
    let inputs=[];
    for(let i=0; i<props.inputs.length; i++){
        inputs.push([<label htmlFor={i}>{props.inputs[i].label}</label>,<input class="radio" onChange={(event)=>{set(props.name, event.target.value)}} id={i} {...props.inputs[i]}/>]);
    }
    return (<div class={"IMCRField"}> {props.label}:{inputs} </div>);
}
