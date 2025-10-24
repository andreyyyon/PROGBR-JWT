const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController")

router.get("/", auth,(req, res) => { 
    // valido a informação preenchida pelo auth
    if(req.user.admin){
        res.send("Admin: Validated access")
    }else{
        res.status(400).send("Not Admin: Access Denied");
    }
})

module.exports = router;