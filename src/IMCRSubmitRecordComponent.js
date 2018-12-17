import React from 'react';
import {getRecord} from './mitraClipRecord';
import {api} from "./config";
import axios from 'axios';
const cookies = require('browser-cookies');



export function SubmitRecord(){
    return(<button class="btn" style={{"width":"160px", "margin-top":".5em"}} onClick={sendRecord}>Submit</button>);
}

function sendRecord(){
    let data = getRecord();
    console.log(data);
    
    
    axios(`${api}/record?token=${cookies.get("imcr-token")}`, {
        method:'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
          },
        data: getRecord()
    }).then((res)=>{
            console.log("send record sucssefuly");
            alert('Record has been sent')
    }).catch((err)=>{
        alert('opsss..... something went wrong')
        console.error("wrong send record");
    })
}
