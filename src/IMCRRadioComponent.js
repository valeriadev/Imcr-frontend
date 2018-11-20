import React from 'react';
import { set } from './mitraClipRecord';

export default function IMCRRadio(props) {
    let inputs = [];
    for (let i = 0; i < props.inputs.length; i++) {
        inputs.push([<label style={{"min-width" :"8em", "font-size":"medium"}} class="radio-inline" htmlFor={i}>{props.inputs[i].label}<input style={{"width":"33%"}} class="radio" onChange={(event) => { set(props.name, event.target.value) }} id={i} {...props.inputs[i]} /> </label>]);
    }
    return (
        <div style={{"margin-left": "1.5em"}} class={"d-flex justify-content-between bd-highlight mb-3"}>
            <label style={{"padding-right":"1em"}}>{props.label}</label>
            <div >{inputs}</div>
        </div>);
}
