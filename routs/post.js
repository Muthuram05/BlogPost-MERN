const express = require('express')
const router = express.Router()
const userController = require("../controllers/newpost");

router.post('/new',userController.new)
module.exports = router;