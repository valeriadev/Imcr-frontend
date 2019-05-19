let userType;

export function setUserType(type){
    userType = type;
}


export function getUserType(){
    return userType;
}

export const KnownType = {
    "administratorAccount":"administratorAccount",
    "hospitalUser":"hospitalUser"
}

//  const  KnownType;