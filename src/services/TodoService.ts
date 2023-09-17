import { Prisma, PrismaClient } from "@prisma/client";
import { ValidationError } from "../error/ValidationError";

interface todoI {
    title: string,
    created_at: Date,
    end_at: Date,
    completed: boolean,
    userId: string
}

interface listI {
    userId: string,
    completed?: boolean
}

interface deleteI {
    id: string
}

interface editI {
    id: string,
    editObj: {
        created_at?: string,
        end_at?: string,
        completed?: boolean
        title?: string,
    }
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

    async list(props: listI){

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

    async deleteTodo(props: deleteI) {
        console.log(props)
        const deletedTodo = await prismaClient.todo.delete({
            where: {
                id: props.id
            }
        })

        console.log(deletedTodo)
        // if (!todoList) {
        //     throw new ValidationError(`Não foi possível encontrar Todo`, 404);
        // }
    }

    async edit(props: editI) {
        const editElements = {...props.editObj}
        const editedTodo = await prismaClient.todo.update({
            where: {
                id: props.id
            },
            data: {...editElements}
        })

        return editedTodo
    }
}

export { TodoService }