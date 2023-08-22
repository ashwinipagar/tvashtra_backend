const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const AccountStatement = require("../models/accountStatementModal");

// Get account statement info
const getAccountData = asyncHandler(async (req, res) => {
    const accData = await AccountStatement.find();

    if (!accData) {
        res.status(500);
        throw new Error("Something went wrong");
    }

    res.status(200).json(accData);
});

// Set account statement info
const createAccountData = asyncHandler(async (req, res) => {
    const accData = req.body;

    let account = await AccountStatement.insertMany(accData, { ordered: false, rawResult: true });

    if (!account) {
        res.status(500);
        throw new Error("Something went wrong");
    } 
        
    res.status(200).json(account);
});

// Update Account data
const updateAccountStatement = asyncHandler(async (req, res) => {
    let account;

    if (mongoose.Types.ObjectId.isValid(req.body.id) ) {
        account = await AccountStatement.findById(req.body.id);
    }
 
    console.log("account:", account);

    if (account) {
        const {
            date,
            description,
            chequeNo,
            debit,
            credit,
            balance,
            from,
            forT,
            to,
            by
        } = account;

        account.date = req.body.date || date;
        account.description = req.body.description || description;
        account.chequeNo = req.body.chequeNo || chequeNo;
        account.debit = req.body.debit || debit;
        account.credit = req.body.credit || credit;
        account.balance = req.body.balance || balance,
        account.from = req.body.from || from;
        account.forT = req.body.forT || forT;
        account.to = req.body.to || to;
        account.by = req.body.by || by;

        const updatedAccountStatement = await account.save();

        console.log("updatedAccountStatement", updatedAccountStatement);

        res.status(200).json({
            _id: updatedAccountStatement._id,
            date: updatedAccountStatement.date,
            description: updatedAccountStatement.description,
            chequeNo: updatedAccountStatement.chequeNo,
            debit: updatedAccountStatement.debit,
            credit: updatedAccountStatement.credit,
            balance: updatedAccountStatement.balance,
            from: updatedAccountStatement.from,
            forT: updatedAccountStatement.forT,
            to: updatedAccountStatement.to,
            by: updatedAccountStatement.by
        });
    } else {
        res.status(404);
        throw new Error("Account Statement not found");
    }
});

// Delete Account data -----------------------------------
const deleteAccountStatement = asyncHandler(async (req, res) => {
    const account = await AccountStatement.findById(req.params.id);

    if (!account) {
        res.status(404);
        throw new Error("Account Statement not found");
    }

    await account.deleteOne();

    res.status(200).json({
        message: "Account Statement deleted successfully",
    });
});

module.exports = {
    getAccountData,
    createAccountData,
    updateAccountStatement,
    deleteAccountStatement
};
