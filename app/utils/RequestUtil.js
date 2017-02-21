const request = (url, method, params) => {
    let isOk;
    let body='';
    for(let key of Object.keys(params)){
        body += key;
        body += '=';
        body += params[key];
        body += '&';
    }
    if(body.length > 0){
        body = body.substring(0,body.length - 1);
    }

    return new Promise((resolve, reject) => {
        fetch(url,{
            method,
            body
        })
        .then((response) => {
            if(response.ok){
                isOk = true;
            }else {
                isOk = false;
            }
            return response.json();
        })
        .then((responseData) => {
            if(isOk){
                // console.log("success----------"+JSON.stringify(responseData));
                resolve({mjson:responseData,mycode:1});
            } else {
                // console.log("error----------"+JSON.stringify(responseData));
                resolve(responseData);
            }
        })
        .catch((error) => {
            // console.log("error----------"+error);
            reject(error);
        });
    });
}

export {request};