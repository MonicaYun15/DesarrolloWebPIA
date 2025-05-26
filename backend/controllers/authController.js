const User = require('../models/User')
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    if (!fullName || !email || !password){
        return res.status(400).json({message: "Todos los campos son requeridos"});
    }

    try{
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "Este correo ya esta en uso"});
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({message: "Error al registrar el usuario", error: err.message});
    }

    
};
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({message: "Todos los campos son requeridos"});
    }
    try{
        const user = await User.findOne({email});
        if (!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Credenciales invalidas"});
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({message: "Error al registrar el usuario", error: err.message});
    }
};
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user){
            return res.status(400).json({message: "No se encontro el usuario"});
        }
        res.status(200).json(user);
        
    } catch (err) {
        res.status(500).json({message: "Error al registrar el usuario", error: err.message});
    }
};