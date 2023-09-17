import express from "express"
import "express-async-errors"
import { UserController } from './controllers/UserController'
import { TodoController } from './controllers/TodoController'
import { handleErrors } from "./error"


const userController = new UserController()
const todoController = new TodoController()

const PORT = process.env.LOCAL_PORT

const app = express()

app
    .use(express.json())
    .use(handleErrors)

app
    .post   ('/user/create', userController.handle)
    .get    ('/user/login', userController.login)
    .delete ('/user/delete', userController.deleteUser)
    .patch  ('/user/edit', userController.edit)

    .post   ('/todo/create', todoController.handle)
    .get    ('/todo/list', todoController.list)
    .delete ('/todo/delete', todoController.deleteTodo)
    .patch  ('/todo/edit', todoController.edit)

app
    .listen(PORT, () => { console.log(`Up and Running on port ${PORT}`)})