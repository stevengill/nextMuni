"use strict;"

const handleResult = require ("../src/handleResult")
const fs = require ("fs")

fs.readFile("sampleresult.xml", 'utf8', (err, data) => {
  if (err) throw err;
  handleResult(data, 21)
})
