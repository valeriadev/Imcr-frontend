import React from 'react';
import { set } from './mitraClipRecord';

export default function IMCRListOptions(props) {

    let inputs = [];
    for (let i = 0; i < props.inputs.length; i++) {
        inputs.push(<option key={i} value={props.inputs[i].value} />);
    }
    return (<div> {props.label}:
    <input list={props.name} {...props} onChange={(event) => set(props.name, event.target.value)} />
        <datalist id={props.name}>{inputs}</datalist>
    </div>);
}