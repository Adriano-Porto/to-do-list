import { Prisma, PrismaClient } from "@prisma/client";
import { ValidationError } from "../error/ValidationError";

interface todoI {
    title: string,
    created_at: Date,
    end_at: Date,
    completed: boolean,
    userId: string
}

interface listArguments {
    userId: string,
    completed?: boolean
}

const prismaClient = new PrismaClient()

class TodoService {
    async create(props: todoI) {
        const todoCreated = await prismaClient.todo.create({
            data: props
        })

        if (!todoCreated) {
            throw new ValidationError("Id de usuário não existe", 404)
        }

        return todoCreated
    }

    async list(props: listArguments){

        const todoList = await prismaClient.todo.findMany({
            where:{
                userId: props.userId,
                completed: props?.completed
            }
        })

        if (!todoList) {
            throw new ValidationError("Id de usuário não existe", 404)
        }

        return todoList
    }
}

export { TodoService }