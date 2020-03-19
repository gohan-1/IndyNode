let getMessage = async (port) =>{


    let message = {
        "headers":headers,
        "url":`http://localhost:${port}/api/message`,
        "method":"GET",
        
    };
    request(message,async (error,result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result.body)
        }})

}

module.exports={
    getMessage : getMessage
}
                              