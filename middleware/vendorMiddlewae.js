const asyncHandler = require("express-async-handler");
const { ocrSpace } = require('ocr-space-api-wrapper');

// const GSTValidationRegex = /[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/;
const regexGST = /[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/;
const regexDate = /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/;
// const regexGST = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/; 

const validateGSTNo = new RegExp(regexGST);


const getPdfData = asyncHandler(async (req, res, next) => {
    try {
        const filePath = `${req.file.destination}/${req.file.filename}`;
        const res = await ocrSpace(filePath, { apiKey: 'K81953750988957' });
        const pdfText = res.ParsedResults[0].ParsedText;

        // console.log("pdfText:", typeof(pdfText));

        // GSTN number 
        let gstnList = [];
        const matchString = regexDate.exec(pdfText);
        console.log("matchString:", matchString);
        if (matchString !== null) {
          console.log("m:", m);
          m.forEach((match, groupIndex) => {
            // console.log("match:", match);
            gstnList.push(match);
          });
        }

        console.log("gstnList",gstnList);
       
    //   req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("PDF data not found");
    }
  });

  const getMultiPdfData = asyncHandler(async (req, res, next) => {
    try {
       console.log("req.files:", req.files);
    //   req.user = user;
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
  