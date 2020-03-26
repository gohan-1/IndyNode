const request = require('request');
exports.getcredDef = async (port,tagName) =>{
    return new Promise((resolve, reject) => {
        console.log("inside credDef")
        let headers = {"content-type":"application/json"}
        console.log(port)

        let tagValue = `{"tag":"${tagName}"}`
        console.log(tagValue)
        let credDefIn = {
            "headers":headers,
            "url":`http://localhost:${port}/api/credentialsDefinitionByTag`,
            "method":"POST",
            "body": tagValue
            };



     request(credDefIn,async (error,result)=>{
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