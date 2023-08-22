const express = require("express");
const router = express.Router();
let path = require('path');
const {
    protect,
    adminOnly,
    authorOnly,
  } = require("../middleware/authMiddleware");


const {
    getAccountData,
    createAccountData,
    updateAccountStatement,
    deleteAccountStatement
} = require("../controllers/accountStatementController");

router.post("/createAccountData", createAccountData);
router.get("/getAccountData", getAccountData);
router.patch("/updateAccountStatement", updateAccountStatement);
router.delete("/:id", deleteAccountStatement);

module.exports = router;
