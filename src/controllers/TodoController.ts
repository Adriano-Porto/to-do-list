import { Request, Response } from "express";
import { TodoService } from '../services/TodoService'

const todoService = new TodoService()

class TodoController {
    async handle(req: Request, res: Response) {
        const props = req.body

        const todoCreated = await todoService.create(props)
        
        if (!todoCreated) {
            return res.status(404).json({message: "User Id não existe na database"})
        }
        return res.status(201).json(todoCreated)
    }

    async list(req: Request, res: Response) {
        const props = req.body
        
        const todoList = await todoService.list(props)

        if(!todoList) {
            return res.status(404).json({message: "User Id não existe na database"})
        }

        return res.json(todoList)
    }

    async listNonCompleted() {

    }
}

export {TodoController}