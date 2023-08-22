const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema(
    {
        vendorCode: {
            type: String,
            default: "",
            unique: true,
            required: true
        },
        vendorName: {
            type: String,
            default: "",
            required: true
        },
        address: {
            type: String,
            default: "",
            required: true
        },
        state: {
            type: String,
            default: "",
            required: true
        },
        city: {
            type: String,
            default: "",
            required: true
        },
        category: {
            type: String,
            default: "",
            required: true
        },
        productOrServiceName: {
            type: String,
            default: "",
            required: true
        },
        gstNumber: {
            type: String,
            default: "",
            required: true
        },
        mobileNumber: {
            type: String,
            default: "+91",
            required: true
        },
        personName: {
            type: String,
            default: "",
            required: true
        },
        bankAccNumber: {
            type: String,
            default: "",
            required: true
        },
        confirmAccNumber: {
            type: String,
            default: "",
            required: true
        },
        ifscCode: {
            type: String,
            default: "",
            required: true
        },
        bankBranchName: {
            type: String,
            default: "",
            required: true
        },
        bankName: {
            type: String,
            default: "",
            required: true
        },
        invoices: {
            type: Array,
            default: [],
        }
    },
    {
        timestamps: true,
        minimize: false,
    }
);

const Token = mongoose.model("Vendor", vendorSchema);
module.exports = Token;
