const router = require("express").Router();
const { register, login, allusers } = require("../controllers/userControllers");
router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", allusers);
module.exports = router;
