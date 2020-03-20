const request = require('request');


exports.sendConReq= async (dids,fixedport,flag)=>{
    return new Promise((resolve, reject) => {

        console.log("inside conn    ")
   
    let didInfo=`{"did":"${dids}"}`
    let headers = {"content-type":"application/json"}
        let connectionReq = {
                        "headers":headers,
                        "url":`http://localhost:${fixedport}/api/send_connection_request`,
                        "method":"POST",
                        "body": didInfo
                        };
                        console.log("3"+didInfo)
                        request(connectionReq,async (error,result)=>{
                            if(error){
                                res.send("error")
                            }
                            else{
                                console.log("3"+didInfo+"inrequjest")
                                flag=1
                                console.log(flag)
                                console.log(typeof(flag)+flag)
                               
                                resolve(flag);
                                
                            }
                        })
                    })

}
