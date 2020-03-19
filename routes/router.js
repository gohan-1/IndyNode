const express = require('express');
const router = new express.Router();
const request = require('request');
const endpoint = require('../controller/endpoint')
const message = require('../controller/message')

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
        let did= await endpoint.endpointDid(3000);
        let didInfo=`{"did":"${did}"}`
        let connectionReq = {
                        "headers":headers,
                        "url":`http://localhost:3001/api/send_connection_request`,
                        "method":"POST",
                        "body": didInfo
                        };
                        console.log("3")
                        request(connectionReq,async (error,result)=>{
                            if(error){
                                res.send("error")
                            }
                            else{
                                console.log(result)
                              
                               


                                //res.send("credential defintion created"+innerResult)
                            }
                        })
            
        }catch(error){
            res.send("something gone wrong")
        }

        

})




module.exports = router;