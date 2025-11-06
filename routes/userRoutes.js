import express from 'express'
import { createUser } from '../controller/userController.js'

const userRoute = express.Router()

userRoute.post('/register', createUser)

export default userRoute;