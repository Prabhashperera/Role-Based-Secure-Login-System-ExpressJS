import User from '../schema/userSchema.js'
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
    try {

        const userName = req.body.userName;
        const password = req.body.password;
        const role = req.body.role;

        const allowedRoles = ["USER", "AUTHOR"];

        if(!allowedRoles.includes(role)) {
            return res.status(401).json({message: "Selected Roles only"})
        }

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
export const loginUser = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName})
        if(!user) {
            res.status(501).json({message: "Login Failed"})
        }
        if(user.password !== password) {
            return res.status(501).json({message: "Login Failed"})
        }
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn: "1h"}
        );
        res.status(200).json({
            message: "Login Success",
            data: {token, user}
        })

    }catch(err) {
        console.log(err)
    }
}

//Create Admin Account
export const createAdmin = async (req, res) => {
    try {

        const userName = req.body.userName;
        const password = req.body.password;
        const role = req.body.role;

        if(role !== "ADMIN") {
            return res.status(401).json({message: "Selected Roles only"})
        }

        const newUser = new User({
            userName,
            password,
            role,
        })

        const savedUser = await newUser.save();
        console.log("Admin Saved : " + savedUser);

        res.status(201).json({
            message: "Admin Saved",
            data: savedUser,
        })

    }catch (err) {
        res.status(500).json({
            message: "User NOT SAVED",
            error: err.message,
        })
    }
}