import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';


//Register
export const registerController = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "All Fields Are required for register"
            });
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(200).send({
                success: false,
                message: "User Already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({username, email, password: hashedPassword});
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'New User created',
            user
        });


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Register Callback",
            error
        });
    }
};

//getallusers
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'all users data',
            users
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in get all users',
            error
        })
    }
}

//Login
export const loginController = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(401).send({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(200).send({
                success: false,
                message: 'email not exist'
            })
        }
        //password compare
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username and password'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Login successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in login callback",
            error
        });
    }
};