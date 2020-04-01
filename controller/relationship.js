const request = require('request');
exports.getRelationship = async (port) =>{
    return new Promise((resolve, reject) => {
        console.log("inside relation")
        let headers = {"content-type":"application/json"}
        console.log(port)

    let relationshipI = {
        "headers":headers,
        "url":`http://localhost:${port}/api/relationships`,
        "method":"GET",
        
    };

     request(relationshipI,async (error,result)=>{
        if(error){
            console.log(error)
            res.send("error")
        }
        else{
            let nice =result.body
            
            resolve(result.body)
        }

     })
    })
}