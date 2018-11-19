import React from 'react';
import {getRecord} from './mitraClipRecord';

export function SubmitRecord(){
    return(<input type="button" class="btn" value="submit" onClick={sendRecord}/>);
}

function sendRecord(){
    fetch('http://localhost:8080/record', {
        method:'post',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(getRecord())
    }).then((res)=>{
        if(res.status===200){
            console.log("send record sucssefuly");
        }
        else{
            console.error("wrong send record");
        }
    })
}
