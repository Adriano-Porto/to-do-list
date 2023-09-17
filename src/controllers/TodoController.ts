import { Request, Response } from "express";
import { TodoService } from '../services/TodoService'

const todoService = new TodoService()

class TodoController {
    async handle(req: Request, res: Response) {
        const props = req.body

        const todoCreated = await todoService.create(props)
        
        return res.status(201).json(todoCreated)
    }

    async list(req: Request, res: Response) {
        const props = req.body
        
        const todoList = await todoService.list(props)

        return res.json(todoList)
    }

    async deleteTodo(req: Request, res: Response) {
        const props = req.body

        console.log("got here")

        await todoService.deleteTodo(props)

        return res.json({message: `Todo deletado com sucesso`})
    }

    async edit(req: Request, res: Response) {
        const props = req.body

        const editedTodo = await todoService.edit(props)

        return res.json(editedTodo)
    }
}

export {TodoController}