import React from 'react';
import {set} from './mitraClipRecord';

export default function IMCRInput(props) {
    return (<div class={"IMCRField"}> {props.label}: <input {...props} onChange={(event)=>{set(props.name,event.target.value)}}/></div>);
}

