const express = require('express')
const routes = express.Router()
const historyController = require('../controllers/history.controller')

routes.post('/register', historyController.register)
routes.put('/update/:id', historyController.update)

module.exports = routes;