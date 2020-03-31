const request = require('request');
exports.getrequest = async (port,datastring) =>{
    return new Promise((resolve, reject) => {
        console.log("inside request Proof")
        let headers = {"content-type":"application/json"}
        console.log(port)


        let requestProofInfo = {
            "headers":headers,
            "url":`http://localhost:${port}/api/requestProof`,
            "method":"POST",
            "body": datastring
            };
   


     request(requestProofInfo,async (error,result)=>{
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