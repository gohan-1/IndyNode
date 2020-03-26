const request = require('request');
exports.getcredOffer = async (port,datastring) =>{
    return new Promise((resolve, reject) => {
        console.log("inside credDef")
        let headers = {"content-type":"application/json"}
        console.log(port)


        let credDefInfo = {
            "headers":headers,
            "url":`http://localhost:${port}/api/issuer/send_credential_offer`,
            "method":"POST",
            "body": datastring
            };
   


     request(credDefInfo,async (error,result)=>{
        if(error){
            console.log(error)
            res.send("error")
        }
        else{
            
            resolve(result.body)
        }

     })
    })
}