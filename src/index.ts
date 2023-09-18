import express, { Request, Response } from "express"
import "express-async-errors"
import { UserController } from './controllers/UserController'
import { TodoController } from './controllers/TodoController'
import { handleErrors } from "./error"
import { checkEnvironmentVariables } from "./controllers/EnvironmentController"
import cors from 'cors'

const userController = new UserController()
const todoController = new TodoController()

const { port } = checkEnvironmentVariables()

const app = express()

app
    .use(express.json())
    .use(handleErrors)
    .use(cors())
app
    .get('/', async (req: Request, res: Response) => {
        return res.status(200).json({message: "Server Up and Running"})
    })
    .post   ('/user/create', userController.handle)
    .post    ('/user/login', userController.login)
    .delete ('/user/delete', userController.deleteUser)
    .patch  ('/user/edit', userController.edit)

    .post   ('/todo/create', todoController.handle)
    .post    ('/todo/list', todoController.list)
    .delete ('/todo/delete', todoController.deleteTodo)
    .patch  ('/todo/edit', todoController.edit)

app
    .listen(port, () => console.log(`Up and Running on port ${port}`))

export { app } 