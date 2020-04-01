try{
       let  offers=[];
       let port=req.body.port;
       let fixedport=3001;
       let obj= {};
       let tagName =req.body.tag
       let names = req.body.names;
       let values= req.body.values;
       for(let i=0;i<names.length;i++){
            console.log(names[i])
            offers.push({
                name : names[i],
                value : values[i]
            })

        }
        console.log(offers)
        let relationshipInfo= await relationship.getRelationship(port)
        relationshipInfo= JSON.parse(relationshipInfo)
        console.log(relationshipInfo[0].their_did)

        let credDef = await credentialDefintion.getcredDef(port,tagName)
        credDef = JSON.parse(credDef)
        console.log(credDef.id)
        let datastring=`{"their_relationship_did":"${relationshipInfo[0].their_did}","cred_def_id":"${credDef.id}","offers": ${JSON.stringify(offers)}}`;

        console.log(datastring)
        let credOffer=await credentialOffer.getcredOffer(port,datastring)

        console.log(credOffer);


        messages= await message.getMessage(fixedport)
        jsMessages=JSON.parse(messages);
        messageId=jsMessages[0].id;
        acceptResponse = await acceptOffer.acceptOffers(messageId,fixedport);

        res.send("credential accepted "+ acceptResponse)










    }catch (e){
        res.send("something gone wrong")
    }


