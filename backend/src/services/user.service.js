const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const jwtProvider=require("../config/jwtProvider")

const createUser = async (userData)=>{
    try {

        let {firstName,lastName,email,password,role}=userData;

        const isUserExist=await User.findOne({email});


        if(isUserExist){
            throw new Error("user already exist with email : ",email)
        }

        password=await bcrypt.hash(password,8);
    
        const user=await User.create({firstName,lastName,email,password,role})

        console.log("user ",user)
    
        return user;
        
    } catch (error) {
        console.log("error - ",error.message)
        throw new Error(error.message)
    }

}

const findUserById=async(userId)=>{
    try {
        const user = await User.findById(userId);
        if(!user){
            throw new Error("user not found with id : ",userId)
        }
        return user;
    } catch (error) {
        console.log("error :------- ",error.message)
        throw new Error(error.message)
    }
}

const getUserByEmail=async(email)=>{
    try {

        const user=await User.findOne({email});

        if(!user){
            throw new Error("user found with email : ",email)
        }

        return user;
        
    } catch (error) {
        console.log("error - ",error.message)
        throw new Error(error.message)
    }
}

const getUserProfileByToken=async(token)=>{
    try {

        const userId=jwtProvider.getUserIdFromToken(token)

        console.log("userr id ",userId)


        const user= (await findUserById(userId)).populate("addresses");
        user.password=null;
        
        if(!user){
            throw new Error("user not exist with id : ",userId)
        }
        return user;
    } catch (error) {
        console.log("error ----- ",error.message)
        throw new Error(error.message)
    }
}

const getAllUsers=async()=>{
    try {
        const users=await User.find();
        return users;
    } catch (error) {
        console.log("error - ",error)
        throw new Error(error.message)
    }
}

const   initializeAdminUser = async()=> {
    const email = 'codewithzosh@gmail.com';
    const adminRole = 'ADMIN';

    try {
        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user with admin role
            const hashedPassword = await bcrypt.hash('12345678', 10); 
            user = new User({
                firstName: 'Admin',
                lastName: 'User',
                email,
                password: hashedPassword,
                role:adminRole,
            });
            await user.save();
            console.log('Admin user created:', user.email);
        } else {
            // Update the existing user to have the admin role
            if (user.role!="ADMIN") {
                user.role="ADMIN";
                await user.save();
                console.log('Admin role added to user:', user.email);
            } else {
                console.log('User already has admin role:', user.email);
            }
        }
    } catch (error) {
        console.error('Error initializing admin user:', error);
    }
}

module.exports={
    createUser,
    findUserById,
    getUserProfileByToken,
    getUserByEmail,
    getAllUsers,
    initializeAdminUser,
 
}