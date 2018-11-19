const record= {};

export function set(key, value){
    record[key]=value;
}

export function getByKey(key){
    return record[key]
} 
export function getRecord(){
    return record;
}

