import * as imcrRecordManager from "./mitraClipRecord";
import { api } from "./config";
import axios from "axios";
const cookies = require("browser-cookies");
let callbackFunc = false;

export function getLastReocrd(hospital, procNum) {
  if (!hospital || !procNum || procNum == "0") {
    imcrRecordManager.resetRecord();
    imcrRecordManager.setAll({
      hospitals: hospital,
      ProcedureNumber: procNum
    });

    if (callbackFunc) {
      callbackFunc();
    }
    return;
  }
  axios(
    `${api}/record?token=${cookies.get(
      "imcr-token"
    )}&hospital=${hospital}&procNum=${procNum}`,
    {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      if (!res.data) {
        resetRecord(hospital, procNum);
        return;
      }
      imcrRecordManager.setAll(res.data);
      if (callbackFunc) {
        callbackFunc();
      }
    })
    .catch(err => {
      resetRecord(hospital, procNum);
    });
}

function resetRecord(hospital, procNum) {
  imcrRecordManager.resetRecord();
  imcrRecordManager.setAll({ hospitals: hospital, ProcedureNumber: procNum });

  if (callbackFunc) {
    callbackFunc();
  }
}

export function registerDataChnage(callback) {
  callbackFunc = callback;
}
