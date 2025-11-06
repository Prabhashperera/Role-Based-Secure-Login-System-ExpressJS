import User from '../schema/userSchema.js'
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
    try {

        const userName = req.body.userName;
        const password = req.body.password;
        const role = req.body.role;

        const newUser = new User({
            userName,
            password,
            role,
        })

        const savedUser = await newUser.save();
        console.log("User Saved : " + savedUser);

        res.status(201).json({
            message: "User Saved",
            data: savedUser,
        })

    }catch (err) {
        res.status(500).json({
            message: "User NOT SAVED",
            error: err.message,
        })
    }
}


// Login User 
const loginUser = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName})
        if(!user) {
            res.status(501).json({message: "Login Failed"})
        }
        if(user.password !== password) 
            {res.status(501).json({message: "Login Failed"})
        }
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn: "1h"}
        );

    }catch(err) {
        console.log(err)
    }
}