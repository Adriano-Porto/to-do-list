import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

interface UserI {
    name: string,
    email: string,
    gender: string,
    age: string,
    photo: string,
    password: string,
}

interface LoginI {
    email: string,
    password: string,
}

class UserService {
    async create(userObj:UserI) {
        const userExists = await this.checkUserExists(userObj.email)

        if (!userExists) { return {message: "User Already Exists"}}

        const userCreated = await prismaClient.user.create({
            data: userObj
        })

        return userCreated
    }

    async login(loginObj:LoginI) {
        const userFound = await prismaClient.user.findUnique({
            where: {
                email: loginObj.email,
                password: loginObj.password
            },
            include: {
                todos: true
            }
        })


        
        return userFound

    }
    
    async checkUserExists(email: string) {
        const userExists = prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        return !!userExists
    }
}

export { UserService }