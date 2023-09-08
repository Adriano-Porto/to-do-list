import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express'
import { EJSON, ObjectId } from 'bson'
import { UserService } from '../services/UserService'


const userService = new UserService()

class UserController {
    async handle(req: Request, res: Response) {
        const props = req.body
        try {
            const newUser = await userService.create(props)

            console.log(newUser)
    
            return res.json(newUser)
        } catch (err) {
            console.log(err)
            return res.json({message: "Error creating user"})
        }
        

    }

    async login(req: Request, res: Response) {
        const props = req.body
        
        const userFound = await userService.login(props)

        if(userFound) {
            return res.status(200).json(userFound)
        }
        return res.status(404).json({message: "User does not exists"})
    }
}

export { UserController }