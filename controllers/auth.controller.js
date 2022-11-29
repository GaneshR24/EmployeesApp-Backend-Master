const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Emplolyees = require("../model/employees.model");

exports.register = async (req, res) => {
    try {
        const payload = req.body;
        if(!payload.password){
            return res.status(400).send({message: "Password is mandatory!"});
        }
        const hashValue = await bcrypt.hash(payload.password, 15);
        payload.hashedPassword = hashValue;
        delete payload.password;
        
        let newEmployee = new Emplolyees(payload);
        await newEmployee.save((err, data) => {
            if(err) {
                if(err.errors) {
                    return res.status(400).send({message: `${JSON.stringify(err.errors)}`})
                }
                if(err.code === 11000) {
                    if(err.keyValue.email) {
                        return res.status(400).send({message: 'Employee with this email already exists'})
                    }
                }
                return res.status(400).send({message: 'Employee registration failed'})
            }
            return res.status(201).send({employeeID: data._id, message: "Employee registration successfull"})
        })

    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
};

exports.signin = async (req, res) => {
    try {
        const {email, password} = req.body; //email and password
        const existingEmployee = await Emplolyees.findOne({email: email}) // to check whether employee exists or not
        
        if(existingEmployee) {
            const isMatching = await bcrypt.compare(password, existingEmployee.hashedPassword); //true or false
            if(isMatching) {
                const token = jwt.sign({_id: existingEmployee._id}, process.env.SECRET_KEY);

                res.cookie('entrytoken', token, {expire: new Date() + 86400000}); //parameter: key, value, expriration

                const {_id, email} = existingEmployee;
                return res.status(200).send({token: token, employeeID: _id, email: email, message: "Employee signed in successfully"});
            }
            return res.status(400).send({message: "Incorrect email or password"});
        }
        return res.status(400).send({message: "Employee not found"})
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
};

exports.signout = async (req, res) => {
    try {
        await res.clearCookie("entrytoken");
        return res.status(200).send({message: "Employee signed out successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
};