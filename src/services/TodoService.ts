import { Prisma, PrismaClient } from "@prisma/client";

interface todoI {
    title: string,
    created_at: Date,
    end_at: Date,
    completed: boolean,
    userId: string
}

const prismaClient = new PrismaClient()

class TodoService {
    async create(props: todoI) {
        const todoCreated = await prismaClient.todo.create({
            data: props
        })

        return todoCreated
    }
}

export { TodoService }