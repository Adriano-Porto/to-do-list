import { Request, Response } from "express";
import { TodoService } from '../services/TodoService'

const todoService = new TodoService()

class TodoController {
    async handle(req: Request, res: Response) {
        const props = req.body

        const todoCreated = await todoService.create(props)
        return res.json(todoCreated)
    }

    async list(req: Request, res: Response) {
        const props = req.body
        
        const todoList = await todoService.list(props)

        return res.json(todoList)
    }

    async listNonCompleted() {

    }
}

export {TodoController}