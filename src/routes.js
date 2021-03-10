const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/status', (req,res) => {
    res.send({status: 200})
})

// login
routes.post('/login', LoginController.store)

// Dashboard
routes.get('/dashboard/:sport',DashboardController.getAllEvents)
routes.get('/dashboard',DashboardController.getAllEvents)
routes.get('/dashboard/:event_id', DashboardController.getEventById)

// Events
routes.post('/event', upload.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:event_id', EventController.delete)

// User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:user_id', UserController.getUserById)
 
module.exports = routes