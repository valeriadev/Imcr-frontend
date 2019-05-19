import React, { Component } from "react";
import { set, getByKey } from "./mitraClipRecord";
import * as api from "./api.service";
import * as userService from "./user.service";

export default class IMCRInput extends Component {
  constructor() {
    super();

    this.myRef = React.createRef();

    this.getLastRecord = this.getLastRecord.bind(this);
    this.loadPatientButton = this.loadPatientButton.bind(this);
  }
  getLastRecord() {
    console.log(`getByKey("hospitals"): ${getByKey("hospitals")}`);
    console.log(`getByKey("ProcedureNumber"): ${getByKey("ProcedureNumber")}`);
    if (
      this.props.name === "hospitals" ||
      (this.props.name === "ProcedureNumber" &&
        (getByKey("hospitals") != "@@IMCR@@" &&
          getByKey("ProcedureNumber") != "@@IMCR@@") &&
        userService.KnownType.hospitalUser === userService.getUserType())
    ) {
      api.getLastReocrd(getByKey("hospitals"), getByKey("ProcedureNumber"));
    }
  }

  loadPatientButton() {
    if (this.props.name === "ProcedureNumber") {
      return (
        <input
          type="button"
          style={{ width: "9em", fontSize: "smaller" }}
          onClick={this.getLastRecord}
          value="Load Patient"
        />
      );
    } else {
      return undefined;
    }
  }

fixMonth(number) {
  if (number < 10){
    return `0${number}`
  }
}

  render() {
    this.moreData = {};

    if (this.props.realValue) {
      const valueInStore = getByKey(this.props.name);
      this.moreData.value =
        valueInStore === "@@IMCR@@" ? this.props.realValue : valueInStore;

        if(this.props.type === 'month'){
          this.moreData.value = `${this.moreData.value}-01`
        } else if (this.props.type === 'date'){
          try{
            let dateObj = false;
            if(!isNaN(Date.parse(this.moreData.value))) {
              dateObj = new Date(this.moreData.value);
            } else {
              const splitted = this.moreData.value.split('/');
              dateObj = new Date(splitted[2], splitted[1],splitted[0]);
            }
          this.moreData.value = `${dateObj.getFullYear()}-${this.fixMonth(dateObj.getMonth())}-${dateObj.getDate()}`//'2019-04-17'
          }catch (w){

          }
        }
    } else {
      if (this.myRef.current) {
        this.myRef.current.value=getByKey(this.props.name);
      }
    }
    return (
      <div class={"IMCRField"}>
        <label>{this.props.label}</label>
        <input
          ref={this.myRef}
          {...this.props}
          {...this.moreData}
          onChange={event => {
            set(this.props.name, event.target.value);
            this.forceUpdate();
          }}
        />
        {this.loadPatientButton()}
      </div>
    );
  }
}
