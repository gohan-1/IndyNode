
let endpointDid = async (port)=>{
 
    const headers = {"content-type":"application/json"}

    let endpoint = {
        "headers":headers,
        "url":`http://localhost:${port}/api/endpointDid`,
        "method":"GET",
        
    };
    request(endpoint,async (error,result)=>{
        if(error){
            res.send("error")
        }
        else{
         //   res.send("schema create "+result)
         console.log(result.body)
            let did=result.body
        }
    })



};

module.exports={
    endpointDid :endpointDid    
}