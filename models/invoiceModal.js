const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "vendor",
  },
  vendorCode: {
    type: String,
    default: "",
    ref: "vendor",
  },
  vendorName: {
    type: String,
    default: "",
  },
  invoice_number: {
    type: String,
    default: "",
  },
  due_date: {
    type: Date,
    default: "",
  },
  credit_days: {
    type: String,
    default: "",
  },
  total_amount: {
    type: String,
    default: "",
  },
  pdfUrl: {
    type: String,
    default: "",
  },
});

const Token = mongoose.model("Invoice", invoiceSchema);
module.exports = Token;
