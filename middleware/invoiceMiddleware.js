const asyncHandler = require("express-async-handler");

const getPdfData = asyncHandler(async (req, res, next) => {
    try {

        console.log("Req from middleware", req);

        //   req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("PDF data not found");
    }
});

const getMultiPdfData = asyncHandler(async (req, res, next) => {
    try {

        const { vendorId, vendorCode, vendorName } = req.body;

        let multiInvoices = [];

        req.files && req.files.map((invoice) => {
            console.log("invoice", invoice);
            multiInvoices.push({
                vendorId, vendorCode, vendorName, pdfUrl: invoice.filename
            })
        })

        req.invoiceData = multiInvoices;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("PDF data not found");
    }
});

module.exports = {
    getPdfData,
    getMultiPdfData
};
