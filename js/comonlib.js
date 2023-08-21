export async function fetchData(url, requestMethod, bodyContent={})
{
    //const base_url = 'http://10.64.38.121:7000'; http
    const base_url = 'https://cdwebapsvr.fincadrc.com:8001';
    let response;
    let options;
    if(requestMethod === 'GET' || requestMethod === 'HEAD'){
        options = {
            method: requestMethod,
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    } else {
        options = {
            method: requestMethod,
            body: JSON.stringify(bodyContent),
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    response = await fetch(base_url + url, options);
    if(response.status === 401){
        return {status: 'failure', error_code: 401};
    };
      
    return response.json(); 
}


export function todayDate() {
    var today = new Date();
    return today.toISOString().slice(0,10);
}