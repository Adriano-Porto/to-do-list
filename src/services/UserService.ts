import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import { ValidationError } from '../error/ValidationError'

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

interface DeleteI {
    userId: string,
    password: string
}

class UserService {
    async create(userObj:UserI) {
        const userExists = await this.checkUserExists(userObj.email)

        if (userExists) {
            throw new ValidationError("Email já existente na base de dados", 400)
        }

        const encryptedPassword:string = await this.encrypt(userObj.password)

        userObj.password = encryptedPassword

        const userCreated = await prismaClient.user.create({
            data: userObj
        })

        delete(userCreated.password)

        return userCreated
    }

    async login(loginObj:LoginI) {
        const userFound = await prismaClient.user.findUnique({
            where: {
                email: loginObj.email,
            },
            include: {
                todos: true
            }
        })

        const passwordChecks = await this.checkEncrypt(loginObj.password, userFound.password)
        
        
        if (!passwordChecks){
            throw new ValidationError("Email ou Senha Incorretos", 400)
        }

        delete(userFound.password)

        return userFound

    }

    async deleteUser(deleteParams: DeleteI) {
        // First Authenticate User

        const userFound = await prismaClient.user.findUnique({
            where: {
                id: deleteParams.userId
            },
            include: {
                todos: true,
            }
        })

        if (!userFound) { throw new ValidationError("Usuário não está presente na database", 404)}

        const logedIn = this.checkEncrypt(deleteParams.password, userFound.password)

        if (!logedIn) { throw new ValidationError("Senha Incorreta", 403)}

        // Then check if he has a todo

        if (userFound.todos.length > 0) { // if he does, erase all todos and the user in a transaction
            const deleteTodos = prismaClient.todo.deleteMany({
                where: {
                    userId: userFound.id
                }
            })
            
            const deleteUser = prismaClient.user.delete({
                where: {
                    id: userFound.id
                }
            })

            const transaction = await prismaClient.$transaction([deleteTodos, deleteUser])

            return transaction
        } else { // if he don't, just erase the user
            const deleteUser = await prismaClient.user.delete({
                where: {
                    id: userFound.id
                }
            })

            return deleteUser
        }
    }
    
    async checkUserExists(email: string) {
        const userExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        console.log(userExists)

        return !!userExists
    }
    
    async encrypt (password: string) {

        const hash = await bcrypt.hash(password, 10)
        return hash
    }

    async checkEncrypt(password: string, hash: string) {
        const checks = await bcrypt.compare(password, hash)
        return checks
    }
}

export { UserService }