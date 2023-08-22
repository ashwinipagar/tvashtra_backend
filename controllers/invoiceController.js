var fs = require('fs');
const asyncHandler = require("express-async-handler");
const Invoice = require("../models/invoiceModal");

// Create Invoice --------------------------------------
const createInvoice = asyncHandler(async (req, res) => {
    console.log("Create invoice")
    const {
        vendorId,
        vendorCode,
        vendorName,
        invoice_number,
        due_date,
        credit_days,
        total_amount,
        pdfUrl
    } = req.body;

    //   Create new invoice
    const invoice = await Invoice.create({
        vendorId,
        vendorCode,
        vendorName,
        invoice_number,
        due_date,
        credit_days,
        total_amount,
        pdfUrl
    });

    if (invoice) {
        const {
            _id,
            vendorId,
            vendorCode,
            vendorName,
            invoice_number,
            due_date,
            credit_days,
            total_amount,
            pdfUrl
        } = invoice;

        res.status(201).json({
            _id,
            vendorId,
            vendorCode,
            vendorName,
            invoice_number,
            due_date,
            credit_days,
            total_amount,
            pdfUrl
        });
    } else {
        res.status(400);
        throw new Error("Invalid invoice data");
    }
});

// Delete Invoice -----------------------------------
const deleteWithoutPdfInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);

    // Delete File from public/images folder
    // if (invoice && invoice.pdfUrl) {
    //     fs.unlink(`./public/images/${invoice.pdfUrl}`, (err) => {
    //         if (err) {
    //             // throw err;
    //             console.log("err", err);
    //         }
        
    //         console.log("Delete File successfully.");
    //     });
    // }
    
    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }

    await invoice.deleteOne();

    res.status(200).json({
        message: "Invoice deleted successfully",
    });
});

// Delete Invoice -----------------------------------
const deleteInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);

    // Delete File from public/images folder
    if (invoice && invoice.pdfUrl) {
        fs.unlink(`./public/images/${invoice.pdfUrl}`, (err) => {
            if (err) {
                // throw err;
                console.log("err", err);
            }
        
            console.log("Delete File successfully.");
        });
    }
    
    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }

    await invoice.deleteOne();

    res.status(200).json({
        message: "Invoice deleted successfully",
    });
});

// Delete Invoice PDF ------------------------------
const deleteInvoicePdf = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }

    // Delete File from public/images folder
    if (invoice && invoice.pdfUrl) {
        fs.unlink(`./public/images/${invoice.pdfUrl}`, (err) => {
            if (err) {
                // throw err;
                console.log("err", err);
            }
        
            console.log("Delete File successfully.");
        });
    }

    const {
        vendorId,
        vendorCode,
        vendorName,
        invoice_number,
        due_date,
        credit_days,
        total_amount
    } = invoice;

    invoice.vendorId = vendorId;
    invoice.vendorCode = vendorCode;
    invoice.vendorName = vendorName;
    invoice.invoice_number = invoice_number;
    invoice.due_date = due_date;
    invoice.credit_days = credit_days;
    invoice.total_amount = total_amount;
    invoice.pdfUrl = "";

    const updatedInvoice = await invoice.save();

    res.status(200).json({
        message: "Invoice PDF deleted successfully",
    });
})

// Update Invoice -----------------------------------
const updateInvoice = asyncHandler(async (req, res) => {
    let invoice = await Invoice.findById(req.body.id);

    if (invoice) {
        const {
            vendorId,
            vendorCode,
            vendorName,
            invoice_number,
            due_date,
            credit_days,
            total_amount,
            pdfUrl
        } = invoice;

        invoice.vendorId = req.body.vendorId || vendorId;
        invoice.vendorCode = req.body.vendorCode || vendorCode;
        invoice.vendorName = req.body.vendorName || vendorName;
        invoice.invoice_number = req.body.invoice_number || invoice_number;
        invoice.due_date = req.body.due_date || due_date;
        invoice.credit_days = req.body.credit_days || credit_days;
        invoice.total_amount = req.body.total_amount || total_amount;
        invoice.pdfUrl = req.body.pdfUrl || pdfUrl;

        const updatedInvoice = await invoice.save();

        res.status(200).json({
            _id: updatedInvoice._id,
            vendorCode: updatedInvoice.vendorCode,
            vendorId: updatedInvoice.vendorId,
            vendorName: updatedInvoice.vendorName,
            invoice_number: updatedInvoice.invoice_number,
            due_date: updatedInvoice.due_date,
            credit_days: updatedInvoice.credit_days,
            total_amount: updatedInvoice.total_amount,
            pdfUrl: updatedInvoice.pdfUrl
        });

    } else {
        res.status(404);
        throw new Error("Invoice not found");
    }
});

// Get Invoice --------------------------------------
const getInvoice = asyncHandler(async (req, res) => {
    let invoice;

    if (mongoose.Types.ObjectId.isValid(req.body.id)) {
        invoice = await Invoice.findById(req.body.id);
    }

    if (invoice) {
        const {
            _id,
            vendorId,
            vendorCode,
            vendorName,
            invoice_number,
            due_date,
            credit_days,
            total_amount,
            pdfUrl
        } = invoice;

        res.status(200).json({
            _id,
            vendorId,
            vendorCode,
            vendorName,
            invoice_number,
            due_date,
            credit_days,
            total_amount,
            pdfUrl
        });
    } else {
        res.status(404);
        throw new Error("Vendor not found");
    }
});

// Get all invoices ------------------------------------
const getAllInvoices = asyncHandler(async (req, res) => {
    const invoices = await Invoice.find().sort("vendorCode");

    if (!invoices) {
        res.status(500);
        throw new Error("Something went wrong");
    }

    res.status(200).json(invoices);
});

// Upload multiple invoices 
const uploadMultiInvoices = asyncHandler(async(req, res) => {
    const invoices = await Invoice.create(req.invoiceData);

    if (invoices) {
        res.status(201).json(invoices);
    } else {
        res.status(400);
        throw new Error("Invalid invoice data");
    }
})

module.exports = {
    createInvoice,
    deleteInvoice,
    updateInvoice,
    getInvoice,
    getAllInvoices,
    deleteInvoicePdf,
    uploadMultiInvoices,
    deleteWithoutPdfInvoice
};
