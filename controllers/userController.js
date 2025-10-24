const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {loginValidate, registerValidate} = require("./validate")

const userController = {
    register: async (req, res) => {

        const {error} = registerValidate(req.body);
        if(error){
            return res.status(400).send(error.message);
        }

        // validando existencia do email no db
        const selectedUser = await User.findOne({ email: req.body.email })
        if (selectedUser) return res.status(400).send("Email already exists.")

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            // passando senha criptografada
            password: bcrypt.hashSync(req.body.password)
        });

        try{
            const savedUser = await user.save();
            res.send(user);
        }catch(error){
            res.status(400).send(error);
        }
    },
    login: async (req, res) => {
        const {error} = loginValidate(req.body);
        if(error){
            return res.status(400).send(error.message);
        }

        // validando existencia do email no db
        const selectedUser = await User.findOne({ email: req.body.email })
        if (!selectedUser) return res.status(400).send("Email or password incorrect.")

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
        if (!passwordAndUserMatch) return res.status(400).send("Email or password incorrect.")

        const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN_SECRET);

        res.header("authoriztion-token", token);
        res.send("User logged");
    }
}

module.exports = userController;