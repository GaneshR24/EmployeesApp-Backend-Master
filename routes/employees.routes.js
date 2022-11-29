const express = require("express");
const router = express.Router();

// Importing controller
const {getEmployees, getEmployeeByID, addEmployee, updateEmployee, deleteEmployee, getSignedInUserID, } = require("../controllers/employees.controller");
const {requireSignIn, isAuth} = require("../utils/authentication");
const { isAdmin } = require("../utils/authorization");


router.get('/:userID/employees', requireSignIn, isAuth, getEmployees);

router.get('/:userID/employees/:empID', requireSignIn, isAuth, getEmployeeByID);

router.post('/:userID/employees', requireSignIn, isAuth, isAdmin, addEmployee);

router.put('/:userID/employees/:empID', requireSignIn, isAuth, isAdmin, updateEmployee);

router.delete('/:userID/employees/:empID', requireSignIn, isAuth, isAdmin, deleteEmployee);

router.param('userID', getSignedInUserID);

module.exports = router;