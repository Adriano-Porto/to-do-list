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

interface ChangeI {
    userId: string,
    password: string,
    editObj: {
        password?: string,
        age?: string,
        gender?: string,
        photo?: string,
        name?: string,
    }
}

class UserService {
    async create(userObj:UserI) {
        const userExists = await this.checkUser(userObj.email)

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
            throw new ValidationError("Email ou Senha Incorretos", 404)
        }

        delete(userFound.password)

        return userFound

    }

    async deleteUser(deleteParams: ChangeI) {
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

        const logedIn = await this.checkEncrypt(deleteParams.password, userFound.password)

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

    async edit(changeObj: ChangeI) {
        // first authenticateUser
        const userFound = await prismaClient.user.findUnique({
            where: {
                id: changeObj.userId
            }
        })

        if (!userFound) { throw new ValidationError("Usuário não está presente na database", 404)}

        const logedIn = await this.checkEncrypt(changeObj.password, userFound.password)

        if (!logedIn) { throw new ValidationError("Senha Incorreta", 403)}


        if(changeObj.editObj.password) {
            const passwordHash = await this.encrypt(changeObj.editObj.password)
            changeObj.editObj.password = passwordHash
            // console.log({new: passwordHash, old: userFound.password})
            delete(userFound.password)
        }

        const newUser = {...changeObj.editObj, ...userFound}



        // console.log({newUser})

        delete(newUser.id)

        const userEdited = await prismaClient.user.update({
            where: {
                id: userFound.id
            },
            data: newUser
        })

        return userEdited

    }
    
    async checkUser(email: string, includeTodo: boolean = false) {
        const userExists = await prismaClient.user.findFirst({
            where: {
                email: email
            },
            include: {
                todos: includeTodo
            }
        })

        return userExists
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