var fs = require("fs")
var d3 = require("d3")

// script to append files
var readAppend = (file, appendFile) => {
  
  fs.readFile(appendFile, function (err, data) {
    if (err) throw err;
    console.log('file read');

    fs.appendFile(file, data, function (err) {
      if (err) throw err;
      console.log('file appended')
    })
  })
}

file = './data/exceptiondata.csv'
appendFile = './data/support/twonumdata.csv'
readAppend(file, appendFile)

appendFile = './data/support/nadata.csv'
readAppend(file, appendFile)

file = './data/normaldata.csv'
appendFile = './data/support/eurodata.csv'
readAppend(file, appendFile)

appendFile = './data/support/pounddata.csv'
readAppend(file, appendFile)

appendFile = './data/support/mmdata.csv'
readAppend(file, appendFile)

appendFile = './data/support/bndata.csv'
readAppend(file, appendFile)