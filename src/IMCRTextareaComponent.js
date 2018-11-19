import React from 'react';
import {set} from './mitraClipRecord';

export default function IMCRTextarea(props) {
    return( <div>{props.label} :<textarea {...props} onChange={(event)=>{set(props.name,event.target.value)}}></textarea></div>);
}

