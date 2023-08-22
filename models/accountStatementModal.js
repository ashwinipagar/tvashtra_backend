const mongoose = require("mongoose");

const accountStatementSchema = mongoose.Schema({
  date: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  chequeNo: {
    type: String,
    default: "",
  },
  debit: {
    type: String,
    default: "",
  },
  credit: {
    type: String,
    default: "",
  },
  balance: {
    type: String,
    default: ""
  },
  from: {
    type: String,
    default: "",
  },
  forT: {
    type: String,
    default: "",
  },
  to: {
    type: String,
    default: "",
  },
  by: {
    type: String,
    default: "",
  },
});

const Token = mongoose.model("AccountStatement", accountStatementSchema);
module.exports = Token;
