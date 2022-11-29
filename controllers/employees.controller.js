const Employees = require("../model/employees.model");

exports.getEmployees = (req, res) => {
    try{
        Employees.find((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving employees.'})
            }
            res.status(200).send(data);
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
};


exports.getEmployeeByID = (req, res) => {
    try{
        Employees.findOne({_id: req.params.empID},(err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving employee.'})
            }
            res.status(200).send(data);
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.addEmployee = (req, res) => {
    
}

exports.updateEmployee = (req, res) => {
    try{
        Employees.findByIdAndUpdate({_id: req.params.empID}, {$set: req.body}, (err, data) => {
            if(err){
                return res.status(400).send({message: "Error while updating an employee."})
            }

            res.status(200).send({employeeID: req.params.empID, message: 'Employee has been updated successfully.'})
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.deleteEmployee = async (req, res) => {
    try{
        const existingEmployee = await Employees.findOne({_id: req.params.empID});

        if(existingEmployee){
            Employees.deleteOne({_id: existingEmployee._id}, (err, data) => {
                if(err){
                    return res.status(400).send({message: "Error while deleting an employee."});
                }
                res.status(200).send({message: "Employee data has been deleted successfully."})
            })
        }
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.getSignedInUserID = (req, res, next, userID) => {
    try{
        Employees.findOne({_id: userID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Employee doesnt exist. Register as a new employee.'})
            }
            req.profile = data;
            console.log("Req.Profile: ", req.profile);
            next();
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}