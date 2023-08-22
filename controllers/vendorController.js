const mongoose = require("mongoose");

const Vendor = require("../models/vendorModel");
const asyncHandler = require("express-async-handler");
const {extractDataFromPDF}= require("../helper/helper.js");
const pdfParse = require("pdf-parse");

const path = require('path');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })

const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const {GridFsStorage} = require('multer-gridfs-storage');
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }                                                                                                                                                                                                                                                                                                                                                                                                    
})

var upload = multer({ storage: storage })

// Add Vendor --------------------------------------
const createVendor = asyncHandler(async (req, res) => {
    const {
        vendorCode,
        vendorName,
        address,
        state,
        city,
        category,
        productOrServiceName,
        gstNumber,
        mobileNumber,
        personName,
        bankAccNumber,
        confirmAccNumber,
        ifscCode,
        bankBranchName,
        bankName
    } = req.body;

    // Validation
    if (!vendorCode ||
        !vendorName ||
        !address ||
        !state ||
        !city ||
        !category ||
        !productOrServiceName ||
        !gstNumber ||
        !mobileNumber ||
        !personName ||
        !bankAccNumber ||
        !confirmAccNumber ||
        !ifscCode ||
        !bankBranchName ||
        !bankName) {
        res.status(400);
        throw new Error("All fields are required.");
    }

    if (bankAccNumber !== confirmAccNumber) {
        res.status(400);
        throw new Error("Account number and confirm account number should be same.");
    }

    //   Create new vendor
    const vendor = await Vendor.create({
        vendorCode,
        vendorName,
        address,
        state,
        city,
        category,
        productOrServiceName,
        gstNumber,
        mobileNumber,
        personName,
        bankAccNumber,
        confirmAccNumber,
        ifscCode,
        bankBranchName,
        bankName
    });

    if (vendor) {
        const {
            _id,
            vendorCode,
            vendorName,
            address,
            state,
            city,
            category,
            productOrServiceName,
            gstNumber,
            mobileNumber,
            personName,
            bankAccNumber,
            confirmAccNumber,
            ifscCode,
            bankBranchName,
            bankName
        } = vendor;

        res.status(201).json({
            _id,
            vendorCode,
            vendorName,
            address,
            state,
            city,
            category,
            productOrServiceName,
            gstNumber,
            mobileNumber,
            personName,
            bankAccNumber,
            confirmAccNumber,
            ifscCode,
            bankBranchName,
            bankName
        });
    } else {
        res.status(400);
        throw new Error("Invalid vendor data");
    }
});

// Delete Vendor -----------------------------------
const deleteVendor = asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
        res.status(404);
        throw new Error("Vendor not found");
    }

    await vendor.deleteOne();

    res.status(200).json({
        message: "Vendor deleted successfully",
    });
});

// Delete Multiple Vendor -----------------------------------
const deleteMultiVendor = asyncHandler(async (req, res) => {
    const ids = req.body.ids;

    console.log("ids:", ids);

    for (var item of ids) {
        let vendor;

        if (mongoose.Types.ObjectId.isValid(item._id) ) {
            vendor = await Vendor.findById(item._id);
        }

        if (!vendor) {
            res.status(404);
            throw new Error("Vendor not found");
        }
    
        await vendor.deleteOne();
    
        res.status(200).json({
            message: "Vendor deleted successfully",
        });
    }
});

// Update Vendor -----------------------------------
const updateVendor = asyncHandler(async (req, res) => {
    let vendor;

    if (mongoose.Types.ObjectId.isValid(req.body.id) ) {
        vendor = await Vendor.findById(req.body.id);
    }

    if (vendor) {
        const {
            vendorCode,
            vendorName,
            address,
            state,
            city,
            category,
            productOrServiceName,
            gstNumber,
            mobileNumber,
            personName,
            bankAccNumber,
            confirmAccNumber,
            ifscCode,
            bankBranchName,
            bankName,
            invoices
        } = vendor;

        vendor.vendorCode = vendorCode;
        vendor.vendorName = req.body.vendorName || vendorName;
        vendor.address = req.body.address || address;
        vendor.state = req.body.state || state;
        vendor.city = req.body.city || city;
        vendor.category = req.body.category || category;
        vendor.productOrServiceName = req.body.productOrServiceName || productOrServiceName;
        vendor.gstNumber = req.body.gstNumber || gstNumber;
        vendor.mobileNumber = req.body.mobileNumber || mobileNumber;
        vendor.personName = req.body.personName || personName;
        vendor.bankAccNumber = req.body.bankAccNumber || bankAccNumber;
        vendor.confirmAccNumber = req.body.confirmAccNumber || confirmAccNumber;
        vendor.ifscCode = req.body.ifscCode || ifscCode;
        vendor.bankBranchName = req.body.bankBranchName || bankBranchName;
        vendor.bankName = req.body.bankName || bankName;
        vendor.invoices = req.body.invoices ? [...invoices, req.body.invoices] : invoices;

        const updatedVendor = await vendor.save();

        res.status(200).json({
            _id: updatedVendor._id,
            vendorCode: updatedVendor.vendorCode,
            vendorName: updatedVendor.vendorName,
            address: updatedVendor.address,
            state: updatedVendor.state,
            city: updatedVendor.city,
            category: updatedVendor.category,
            productOrServiceName: updatedVendor.productOrServiceName,
            gstNumber: updatedVendor.gstNumber,
            mobileNumber: updatedVendor.mobileNumber,
            personName: updatedVendor.personName,
            bankAccNumber: updatedVendor.bankAccNumber,
            confirmAccNumber: updatedVendor.confirmAccNumber,
            ifscCode: updatedVendor.ifscCode,
            bankBranchName: updatedVendor.bankBranchName,
            bankName: updatedVendor.bankName,
            invoices: updatedVendor.invoices
        });
    } else {
        res.status(404);
        throw new Error("Vendor not found");
    }
});

// Get vendor --------------------------------------
const getVendor = asyncHandler(async (req, res) => {
    let vendor;

    if (mongoose.Types.ObjectId.isValid(req.body.id) ) {
        vendor = await Vendor.findById(req.body.id);
    }
  
    if (vendor) {
      const { 
        _id, 
        vendorCode,
        vendorName,
        address,
        state,
        city,
        category,
        productOrServiceName,
        gstNumber,
        mobileNumber,
        personName,
        bankAccNumber,
        confirmAccNumber,
        ifscCode,
        bankBranchName,
        bankName,
        invoices
    } = vendor;
      res.status(200).json({
        _id,
        vendorCode,
        vendorName,
        address,
        state,
        city,
        category,
        productOrServiceName,
        gstNumber,
        mobileNumber,
        personName,
        bankAccNumber,
        confirmAccNumber,
        ifscCode,
        bankBranchName,
        bankName,
        invoices
      });
    } else {
      res.status(404);
      throw new Error("Vendor not found");
    }
});

const uploadFiles = asyncHandler(async (req, res) => {
    let vendor;

    if (mongoose.Types.ObjectId.isValid(req.body.id) ) {
        vendor = await Vendor.findById(req.body.id);
    }
  
    if (vendor) {
        const {
            invoices
        } = vendor;

        // Here we can do PFD changes
        // let newInvoiceFile = extractDataFromPDF(req.file);

        vendor.invoices = [...invoices, req.file.filename] || invoices;

        const updatedVendor = await vendor.save();

        res.status(200).json({
            _id: updatedVendor._id,
            vendorCode: updatedVendor.vendorCode,
            vendorName: updatedVendor.vendorName,
            address: updatedVendor.address,
            state: updatedVendor.state,
            city: updatedVendor.city,
            category: updatedVendor.category,
            productOrServiceName: updatedVendor.productOrServiceName,
            gstNumber: updatedVendor.gstNumber,
            mobileNumber: updatedVendor.mobileNumber,
            personName: updatedVendor.personName,
            bankAccNumber: updatedVendor.bankAccNumber,
            confirmAccNumber: updatedVendor.confirmAccNumber,
            ifscCode: updatedVendor.ifscCode,
            bankBranchName: updatedVendor.bankBranchName,
            bankName: updatedVendor.bankName,
            invoices: updatedVendor.invoices
        });
    } else {
        res.status(404);
        throw new Error("Vendor not found");
    }
})

const uploadMultiVendorFiles = asyncHandler(async(req, res) => {
    const vendors = await Vendor.find().sort("-createdAt");

    // console.log("vendors:", vendors);
});

// Get all vendors ------------------------------------
const getAllVendors = asyncHandler(async (req, res) => {
    const vendors = await Vendor.find().sort("vendorCode");

    if (!vendors) {
      res.status(500);
      throw new Error("Something went wrong");
    }

    res.status(200).json(vendors);
});

module.exports = {
    createVendor,
    deleteVendor,
    deleteMultiVendor,
    updateVendor,
    getVendor,
    uploadFiles,
    getAllVendors,
    uploadMultiVendorFiles
};
