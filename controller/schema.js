const request = require('request');
exports.getschema = async (port,payload) =>{
    return new Promise((resolve, reject) => {
        console.log("inside schema ")
        let headers = {"content-type":"application/json"}
        console.log(port)


        let schemaInfo = {
            "headers":headers,
            "url":`http://localhost:${port}/api/issuer/create_schema`,
            "method":"POST",
            "body": payload
            };
   


     request(schemaInfo,async (error,result)=>{
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