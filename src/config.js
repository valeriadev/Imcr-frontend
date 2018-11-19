let api_endpoint = "http://localhost:8080";

if(window.location.hostname.indexOf("imcr.info") >= 0){
    api_endpoint = "http://api.imcr.info:8080";
}

export const api = api_endpoint
