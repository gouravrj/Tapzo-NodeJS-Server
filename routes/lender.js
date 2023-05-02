const express = require('express')
const routes = express.Router()
const lenderController = require('../controllers/lender.controller')

routes.post('/register', lenderController.register)
routes.post('/login', lenderController.login)

module.exports = routes;