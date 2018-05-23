'use strict';

var pdfjs = require('pdfjs-dist/build/pdf');

module.exports = function parsePDF(pdfBuf, cb) {
  var pdfData = undefined;

  try {
    pdfData = new Uint8Array(pdfBuf);

    pdfjs.getDocument(pdfData).then(function (doc) {
      cb(null, doc);
    })['catch'](function (err) {
      cb(err);
    });
  } catch (uncaughtErr) {
    cb(uncaughtErr);
  }
};