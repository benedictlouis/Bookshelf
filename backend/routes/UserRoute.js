const express = require('express');
const router = express.Router();
const userController = require("../repositories/user.repository.js");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/getAllUser", userController.getAllUser);
router.get("/getUserById/:user_id", userController.getUserById);
router.delete("/deleteUser/:user_id", userController.deleteUser);

module.exports = router;
