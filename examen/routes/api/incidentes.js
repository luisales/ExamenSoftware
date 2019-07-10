var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
function initIncidente(db) {
var incidentesColl = db.collection('incidentes');
    router.get('/', (req, res, next)=>{
        incidentesColl.find().toArray((err, incidentes )=>{
        if(err){
          console.log(err);
          return res.status(404).json({"error":"Error al extraer incidentes de la base de datos"});
        }
        return res.status(200).json(incidentes);
      });
    });
    router.get('/:id', (req, res, next)=>{
      var id = new ObjectID(req.params.id);
      incidentesColl.findOne({"_id": id} , (err, doc)=>{
        if(err){
          console.log(err);
          return res.status(404).json({"error":"No se Puede Obtener incidente Intente de Nuevo"});
        }
        return res.status(200).json(doc);
      });
    }); 
  
    router.post('/', (req, res, next)=>{
      var newIncidente = Object.assign(
        {},
        {
          "descripcion":"",
          "fechayhora":new Date().getTime(),
          "tipo":"",
          "estado":"",
          "usuarioRegistrado":"" ,
          "usuarioAsignado":"",
          "fechaHoraAsignado":"",
          "fechaHoraCerrado":""
        },
        req.body
      );
      incidentesColl.insertOne(newIncidente, (err, rslt)=>{
        if(err){
          console.log(err);
          return res.status(404).json({"error":"No se pudo agregar nuevo incidentee"});
        }
        if(rslt.ops.length===0){
          console.log(rslt);
          return res.status(404).json({ "error": "No se pudo agregar nuevo incidente" });
        }
        return res.status(200).json(rslt.ops[0]);
      });
    });//post
   router.post
    
    return router;
}

module.exports = initIncidente;