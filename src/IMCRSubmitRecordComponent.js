import React from 'react';
import {getRecord} from './mitraClipRecord';
import {api} from "./config";
const cookies = require('browser-cookies');



export function SubmitRecord(){
    return(<button class="btn" style={{"width":"160px", "margin-top":".5em"}} onClick={sendRecord}>Submit</button>);
}

function sendRecord(){
    fetch(`${api}/record?token=${cookies.get("imcr-token")}`, {
        method:'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie':document.cookie
          },
        body: JSON.stringify(getRecord())
    }).then((res)=>{
        if(res.status===200){
            console.log("send record sucssefuly");
            alert('Record has been sent')
        }
        else{
            alert('opsss..... something went wrong')
            console.error("wrong send record");
        }
    })
}
