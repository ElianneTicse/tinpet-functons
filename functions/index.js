const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

//Create and deploy your first functions
//https://firebase.google.com/docs/functions/get-started
//

exports.nickname = functions.https.onRequest((req, res) => {
    
    // Grab the text parameter.
    const nicknameInput = req.query.nickname;
    const snapshot = admin.firestore().collection("mascota").where('nickname','==',nicknameInput).get().then(function(snapshot){
        
        functions.logger.info({snapshot},nicknameInput);
        if(snapshot.empty){
            res.json({result: `Nickname válido`});
        }else{
            res.json({result: 'Nickname ya registrado.'})
        }
    });

})

exports.populares = functions.https.onRequest((req,res) => {
    
    const spn = admin.firestore().collection("solicitudes").where("status","==","aceptado").get().then(function(snapshot){
        let list = snapshot.size;
        functions.logger.info(list);
        let index = 0;
        let mapKey_Friends = {};
        let snapshotEach = snapshot.forEach((document) => {
            functions.logger.info(index);
            index = index + 1;
            if(mapKey_Friends[document.data()["iudMe"]]!=null){
                let friends = mapKey_Friends[document.data()["iudMe"]]
                mapKey_Friends[document.data()["iudMe"]] = friends+1

            }else{
                mapKey_Friends[document.data()["iudMe"]] = 1
            }
            if(list==index){
                res.json(mapKey_Friends);
            }
        })
    })
})
    

    
   

        





