const request = require('request');
exports.acceptMessage= async (messageId,port)=>{
    return new Promise((resolve, reject) => {
   let mesStruct = `{"messageId":"${messageId}"}`
   let headers = {"content-type":"application/json"}

   let acceptProof = {
    "headers":headers,
    "url":`http://localhost:${port}/api/proofs/accept`,
    "method":"POST",
    "body": mesStruct
    };

    console.log("accept Proof")

    request(acceptProof,async (error,result)=>{
        if(error){
            res.send("error");
        }
        else{
            let response = result.body;
             resolve( response); 
        }
    })
})
}

