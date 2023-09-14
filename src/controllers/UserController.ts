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
    
            if (newUser == null) {
                return res.status(400)
            }

            return res.status(201).json(newUser)
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Error creating user", error: err})
        }
        

    }

    async login(req: Request, res: Response) {
        const props = req.body
        
        const userFound = await userService.login(props)

        if(userFound) {
            return res.status(200).json(userFound)
        }
        return res.status(404).json({message: "Email ou Login Errados"})
    }
}

export { UserController }