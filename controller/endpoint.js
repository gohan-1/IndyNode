const request = require('request');

exports.endpointDid = async (port)=>{
    return new Promise((resolve, reject) => {
    console.log("inside "+port)
    let headers = {"content-type":"application/json"}

    let endpoint = {
        "headers":headers,
        "url":`http://localhost:${port}/api/endpointDid`,
        "method":"GET",
        
    };
    
     request(endpoint,async (error,result)=>{
        if(error){
            console.log("error")
            res.send("error")
        }
        else{
         //   res.send("schema create "+result)
         
            let did= result.body
            console.log(did+"inside")
            resolve(did)
        }
    })

    })

};
