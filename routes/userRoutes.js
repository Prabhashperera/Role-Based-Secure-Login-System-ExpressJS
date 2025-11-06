import express from 'express'
import { createAdmin, createUser, loginUser } from '../controller/userController.js'
import authMiddleware from '../jwt/authMiddleware.js'
import adminOnlyMiddleware from '../jwt/adminOnlyMiddleware.js'

const userRoute = express.Router()

userRoute.post('/register', createUser)
userRoute.post('/login' , loginUser)
userRoute.post('/admin/register', adminOnlyMiddleware, authMiddleware , createAdmin)

export default userRoute;