const express = require('express')
const routes = express.Router()
const bikeController = require('../controllers/bike.controller')
const auth = require('../middleware/auth')
const multer = require('multer')

const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
}) })

//Doesn't require authentication
routes.get('/get',bikeController.listBikes)  
routes.get('/getbyID/:id', bikeController.getbyID)
// routes.get('/getbyName/:name', bikeController.getbyName)

//Requires Authentication
routes.post('/post',auth,upload.single('file'), bikeController.createBike) 
routes.put('/updatebyID/:id' ,auth, bikeController.updateBike)
routes.delete('/deletebyID/:id',auth, bikeController.deleteBike) 
routes.get('/:lenderid',auth, bikeController.getBikeByLender) 

routes.put('/avb/:id',bikeController.decrementAvaibility)
routes.put('/avbplus/:id',bikeController.incrementAvaibility)


module.exports = routes;
