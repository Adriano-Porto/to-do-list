import { Request, Response } from "express";
import { TodoService } from '../services/TodoService'

const todoService = new TodoService()

class TodoController {
    async handle(req: Request, res: Response) {
        const props = req.body

        const todoCreated = await todoService.create(props)
        return res.json(todoCreated)
    }

    async listAll() {

    }

    async listNonCompleted() {

    }
}

export {TodoController}