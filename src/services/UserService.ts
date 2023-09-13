import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"

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

        if (userExists) { return {message: "User Already Exists"}}

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
        
        delete(userFound.password)
        if (!passwordChecks){
            return null
        }
        return userFound

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