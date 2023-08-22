const express = require("express");
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const { getPdfData, getMultiPdfData } = require("../middleware/vendorMiddlewae");
const {
  protect,
  adminOnly,
  authorOnly,
} = require("../middleware/authMiddleware");

const {
  createVendor,
  deleteVendor,
  deleteMultiVendor,
  updateVendor,
  uploadFiles,
  getVendor,
  getAllVendors,
  uploadMultiVendorFiles
} = require("../controllers/vendorController");

const storage = multer.diskStorage({  
  destination: function(req, file, cb) {
      cb(null, './uploads');
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

router.post("/createVendor", createVendor);
router.delete("/:id", deleteVendor);
router.post("/deleteMultiVendor", deleteMultiVendor);
router.patch("/updateVendor", updateVendor);
router.post("/getVendor", getVendor);

router.get("/getAllVendors", getAllVendors);
router.post("/uploadFiles", upload.single('files'), getPdfData, uploadFiles);
router.post("/uploadMultiVendorFiles", upload.array('file'), getMultiPdfData, uploadMultiVendorFiles);

module.exports = router;
