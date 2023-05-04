const express = require('express')
const routes = express.Router()
const historyController = require('../controllers/history.controller')

routes.post('/register', historyController.register)
routes.put('/update/:id', historyController.update)
routes.get('/byuser/:id',historyController.getHistoryByUser)
routes.get('/bylender/:id',historyController.getHistoryByLender)
routes.put('/completed/:id',historyController.completedStatusToTrue)


module.exports = routes;