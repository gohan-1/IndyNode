const request = require('request');
exports.getMessage = async (port) =>{
    return new Promise((resolve, reject) => {
        console.log("inside messages")
        let headers = {"content-type":"application/json"}
        console.log(port)

    let messageInfo = {
        "headers":headers,
        "url":`http://localhost:${port}/api/message`,
        "method":"GET",
        
    };
    console.log(messageInfo)
     request(messageInfo,async (error,result)=>{
        if(error){
            console.log(error)
            res.send("error")
        }
        else{
            
            resolve(result.body)
        }})
    })

}

