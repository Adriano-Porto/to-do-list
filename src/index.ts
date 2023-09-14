import express from "express"
import "express-async-errors"
import { UserController } from './controllers/UserController'
import { TodoController } from './controllers/TodoController'
import { handleErrors } from "./error"

const userController = new UserController()
const todoController = new TodoController()

const app = express()

app
    .use(express.json())
    .use(handleErrors)

app
    .post('/user/create', userController.handle)
    .get('/user/login', userController.login)

    // todo create delete routes for both


    .post('/todo/create', todoController.handle)
    .get('/todo/list', todoController.list)

app
    .listen(3000, () => { console.log("!!! Up and Running !!!")})