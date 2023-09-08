import express from "express";
import { UserController } from './controllers/UserController'
import { TodoController } from './controllers/TodoController'

const userController = new UserController()
const todoController = new TodoController()

const app = express()

app.use(express.json())

app
    .post('/user/create', userController.handle)
    .get('/user/login', userController.login)
    .get('/todo/create', todoController.handle)

app.listen(3000, () => { console.log("!!! Up and Running !!!")})