import * as userService from "./user.service";
import { getRecord } from "./mitraClipRecord";
import React , {Component} from "react";
import { api } from "./config";
import axios from "axios";
const cookies = require("browser-cookies");

export class SubmitRecord extends Component {
  constructor(){
    super();

    this.sendRecord = this.sendRecord.bind(this);
    this.getEndpoint = this.getEndpoint.bind(this);

    this.state = {
      sending:false
    }
  }
  render(){
    let extra = {disabled:false}
    if(this.state.sending){
        extra.disabled=true;
    } 
    return (
      <button
      class="btn"

      style={{ width: "160px", "margin-top": ".5em" }}
      onClick={this.sendRecord}
      {...extra}
    >
      Submit
    </button>
  );
}

 sendRecord() {
  let data = getRecord();
  console.log(data);

  axios(`${api}/${this.getEndpoint()}?token=${cookies.get("imcr-token")}`, {
    method: "post",
    crossdomain: true,
    headers: {
      "Content-Type": "application/json"
    },
    data: getRecord()
  })
    .then(res => {

    this.setState({
      sending:false
    })
      console.log("send record sucssefuly");
      alert("Record has been sent");
    })
    .catch(err => {

    this.setState({
      sending:false
    })
      alert("opsss..... something went wrong");
      console.error("wrong send record");
    });

    this.setState({
      sending:true
    })
}

 getEndpoint() {
  return userService.getUserType() ===
    userService.KnownType.administratorAccount
    ? "abbott"
    : "record";
}

}