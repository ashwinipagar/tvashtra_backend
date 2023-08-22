const express = require("express");
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const {
  protect,
  adminOnly,
  authorOnly,
} = require("../middleware/authMiddleware");

const {getPdfData, getMultiPdfData} = require("../middleware/invoiceMiddleware");

const {
    createInvoice,
    deleteInvoice,
    deleteInvoicePdf,
    deleteWithoutPdfInvoice,
    updateInvoice,
    getInvoice,
    getAllInvoices,
    uploadMultiInvoices
} = require("../controllers/invoiceController");

const storage = multer.diskStorage({  
  destination: function(req, file, cb) {
      cb(null, './public/images');
  },
  filename: function(req, file, cb) {   
      const fileName = uuidv4() + '-' + Date.now() + path.extname(file.originalname); 
      cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

router.post("/createInvoice", createInvoice);
router.delete("/:id", deleteInvoice);
router.delete("/notPdf/:id", deleteWithoutPdfInvoice);
router.delete("/pdf/:id", deleteInvoicePdf);
router.patch("/updateInvoice", updateInvoice);
router.post("/getInvoice", getInvoice);
router.get("/getAllInvoices", getAllInvoices);
router.post("/uploadMultiInvoices", upload.array('file'), getMultiPdfData, uploadMultiInvoices);

module.exports = router;
