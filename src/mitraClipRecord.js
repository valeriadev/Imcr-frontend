import fields from "./fields.json";
let record = {};

export function set(key, value) {
  record[key] = value;
}

export function getByKey(key) {
  return record[key];
}
export function getRecord() {
  return record;
}


export function resetRecord() {
   record = {};
}


export function setAll(newRecord) {
  console.log(record);
  const keys = Object.keys(newRecord);
  for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      set(getKeyByIndex(i), newRecord[key]);
      
  }
}

function getKeyByIndex(index){
  let counter = 0
  const steps = Object.keys(fields);
  for (let j = 0; j < steps.length; j++) {
    let inputFromStep = fields[steps[j]];

    for (let i = 0; i < inputFromStep.length; i++) {
      let keyName = Object.keys(inputFromStep[i])[0];
      if (inputFromStep[i][keyName].titleOnly === "true") {
        continue;
      }
      if(counter === index) {
        return inputFromStep[i][keyName].name;
      }
      counter++;
    }
  }
}
