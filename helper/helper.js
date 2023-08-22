const fs = require("fs");
const pdfParse = require("pdf-parse");


// const pdfRead = "https://res.cloudinary.com/demo/image/upload/v1686933623/docs_uploading_example/KC-SalesOrder-PI-32-23-24_hylfj7.pdf";
const { ocrSpace } = require('ocr-space-api-wrapper');

const GSTValidationRegex = /[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/;


const extractDataFromPDF = async (invoice) => {  
  const filePath = `${invoice.destination}/${invoice.filename}`;
  
    // try {
    //   const res1 = await ocrSpace(filePath, { apiKey: 'K81953750988957' });

    //   const pdfText = res1.ParsedResults[0].ParsedText;

    //   console.log("pdfText:", pdfText);
    // } catch(err) {
    //   console.log("Error:", err);
    // }

    return filePath;
}

module.exports = {
    extractDataFromPDF
}