import React from 'react';
import {set} from './mitraClipRecord';

export default function IMCRDate(props){
return (<div>{props.label}:<input {...props} onChange={(event)=>{set(props.name, event.target.value)}}/></div>);
}