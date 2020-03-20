const express = require('express');
const router = new express.Router();
const request = require('request');
const endpoint = require('../controller/endpoint')
const message = require('../controller/message')
const acceptProof = require('../controller/acceptProof')

const connection = require('../controller/connection')
const bodyParser = require("body-parser");


const app = express();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.post('/api/schemaCreation',async (req,res)=>{
    try{
        let payload=`{
            "name_of_schema": "peopleschema",
            "version": "1.0",
            "attributes": [
            "macId",
            "test"
            ]
        }`;
        const headers = {"content-type":"application/json"};
        
        console.log("hii")
        let schemaApi = {
            "headers":headers,
            "url":`http://localhost:3000/api/issuer/create_schema`,
            "method":"POST",
            "body": payload
        };

            console.log("2")
            request(schemaApi,async (error,result)=>{
                if(error){
                    res.send("error")
                }
                else{
                 //   res.send("schema create "+result)
                 console.log(JSON.parse(result.body).id)
                    let schemaId=JSON.parse(result.body).id
                    let credPayload=
                        `{"schema_id": "${schemaId}",
                        "tag": "mytag"
                        }`;
                      let credDef = {
                        "headers":headers,
                        "url":`http://localhost:3000/api/issuer/create_cred_def`,
                        "method":"POST",
                        "body": credPayload
                        };
                        
                        request(credDef,async (error,innerResult)=>{
                            if(error){
                                res.send("error")
                            }
                            else{
                                console.log(JSON.stringify(innerResult))
                                res.send("credential defintion created"+JSON.stringify(innerResult))
                            }
                        })
                }
            })
        }catch(error){
            res.send("something gone wrong")
        }

        

})

router.post('/api/connection',async (req,res)=>{
    try{

        let flag=0
        let port=req.body.port;
        let fixedport=3001;
        

        let dids= await endpoint.endpointDid(port);
        console.log("sdf"+dids)
        let flags = await connection.sendConReq(dids,fixedport,flag)
        console.log(flags)
        if (flags==1){
            let messages= await message.getMessage(port)
                                let jsMessages=JSON.parse(messages);
                                let messageId=jsMessages[0].id;
                                console.log(messageId)
                                let acceptResponse = await acceptProof.acceptMessage(messageId,port);
                                console.log("proof acepted"+acceptResponse);
                                 messages= await message.getMessage(fixedport)
                                 jsMessages=JSON.parse(messages);
                                 messageId=jsMessages[0].id;
                                 acceptResponse = await acceptProof.acceptMessage(messageId,fixedport);
                                console.log("proof acepted of 3001"+acceptResponse);
                                res.send("connection established with "+port+""+fixedport)
        }
       
        
        
        
                        
                        
                        
                        
                                




                                //res.send("credential defintion created"+innerResult)
                            
                    
                        
        }catch(error){
            res.send("something gone wrong")
        }

        

})




module.exports = router;