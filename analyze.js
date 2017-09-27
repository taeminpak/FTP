var fs = require("fs")
var d3 = require("d3")

fs.readFile("data/data.csv", "utf8", function (err, data) {
  //parse csv data
  if (err) throw err
  data = d3.csvParse(data)

  //filter for words with more than two letters (not including symbols)
  var word = data.filter(function (d) {
    return d.VALUE.replace(/[^a-z]/ig, "").length > 2
  })

  wordString = d3.csvFormat(word)
  fs.writeFile("data/exceptiondata.csv", wordString, function (err) {
    console.log("exceptiondata written")
  })

  for (let i = 0; i < word.length; i++) {
    word[i].VALUE = 'exception'
  }

  //function to check if value has more than one number
  var checker = str => {
    let toggle = false
    let counter = 0
    for (let i = 0; i < str.length; i++) {
      if (/[0123456789.,]/i.test(str[i]) && toggle === false) {
        counter++
        toggle = true
      } else if (/[0123456789.,]/i.test(str[i])) {
        toggle = true
      } else {
        toggle = false
      }
    }
    return counter >= 2 ? true : false
  }

  //filter for values with more than one number & numbers wrapped in parenthesis
  var num = data.filter(function (d) {
    return checker(d.VALUE) || (d.VALUE[0] === '(' && d.VALUE[d.VALUE.length-1] === ')')
  })

  numString = d3.csvFormat(num)
  fs.writeFile("data/support/twonumdata.csv", numString, function (err) {
    console.log("twonumdata written")
  })

  for (let i = 0; i < num.length; i++) {
    num[i].VALUE = 'exception'
  }

  //filter for na values, those with +, and ~
  var na = data.filter(function (d) {
    return /na/i.test(d.VALUE) || d.VALUE.includes('N/A') || d.VALUE.includes('~') || d.VALUE.includes('+')
  })

  naString = d3.csvFormat(na)
  fs.writeFile("data/support/nadata.csv", naString, function (err) {
    console.log("nadata written")
  })

  for (let i = 0; i < na.length; i++) {
    na[i].VALUE = 'exception'
  }

  //filter for number values (assuming they're in millions and '-' means negative)
  var number = data.filter(function (d) {
    return d.VALUE.replace(/[,$]/g, '') < Infinity
  })

  for (let i = 0; i < number.length; i++) {
    number[i].VALUE = String(parseInt(number[i].VALUE.replace(/[,$]/g, '')) * 1000000)
  }

  numberString = d3.csvFormat(number)
  fs.writeFile("data/normaldata.csv", numberString, function (err) {
    console.log("normaldata written")
  })

  //filter for euro values (assuming 1 euro = 1.18 USD and they're in millions)
  var euro = data.filter(function (d) {
    return d.VALUE.includes('���')
  })

  for (let i = 0; i < euro.length; i++) {
    let neg = euro[i].VALUE.includes('-')
    let bn = euro[i].VALUE.includes('bn')
    euro[i].VALUE = euro[i].VALUE.replace(/[^.0123456789]/g, '')
    neg ? euro[i].VALUE = '-' + String(parseInt(euro[i].VALUE) * 1180000) : euro[i].VALUE = String(parseInt(euro[i].VALUE) * 1180000)
    bn ? euro[i].VALUE = String(parseInt(euro[i].VALUE) * 1000) : euro[i].VALUE = String(parseInt(euro[i].VALUE) * 1)
  }

  euroString = d3.csvFormat(euro)
  fs.writeFile("data/support/eurodata.csv", euroString, function (err) {
    console.log("eurodata written")
  })

  //filter for pound values (assuming 1 pound = 1.34 USD and they're in millions)
  var pound = data.filter(function (d) {
    return d.VALUE.includes('�')
  })

  for (let i = 0; i < pound.length; i++) {
    let neg = pound[i].VALUE.includes('-')
    let bn = pound[i].VALUE.includes('bn')
    pound[i].VALUE = pound[i].VALUE.replace(/[^.0123456789]/g, '')
    neg ? pound[i].VALUE = '-' + String(parseInt(pound[i].VALUE) * 1340000) : pound[i].VALUE = String(parseInt(pound[i].VALUE) * 1340000)
    bn ? pound[i].VALUE = String(parseInt(pound[i].VALUE) * 1000) : pound[i].VALUE = String(parseInt(pound[i].VALUE) * 1)
  }

  poundString = d3.csvFormat(pound)
  fs.writeFile("data/support/pounddata.csv", poundString, function (err) {
    console.log("pounddata written")
  })

  //filter for mm and mn values (assuming m, mm, and mn stands for million)
  var mm = data.filter(function (d) {
    return /mm/ig.test(d.VALUE) || /mn/ig.test(d.VALUE) || d.VALUE.replace(/[^m]/ig, "").length === 1
  })

  for (let i = 0; i < mm.length; i++) {
    let neg = mm[i].VALUE.includes('-')
    mm[i].VALUE = mm[i].VALUE.replace(/[^.0123456789]/g, '')
    neg ? mm[i].VALUE = '-' + String(parseInt(mm[i].VALUE) * 1000000) : mm[i].VALUE = String(parseInt(mm[i].VALUE) * 1000000)
  }

  mmString = d3.csvFormat(mm)
  fs.writeFile("data/support/mmdata.csv", mmString, function (err) {
    console.log("mmdata written")
  })

  //filter for bn values (assuming bn stands for billion)
  var bn = data.filter(function (d) {
    return /bn/i.test(d.VALUE) || d.VALUE.replace(/[^b]/ig, "").length === 1
  })

  for (let i = 0; i < bn.length; i++) {
    let neg = bn[i].VALUE.includes('-')
    bn[i].VALUE = bn[i].VALUE.replace(/[^.0123456789]/g, '')
    neg ? bn[i].VALUE = '-' + String(parseInt(bn[i].VALUE) * 1000000000) : bn[i].VALUE = String(parseInt(bn[i].VALUE) * 1000000000)
  }

  bnString = d3.csvFormat(bn)
  fs.writeFile("data/support/bndata.csv", bnString, function (err) {
    console.log("bndata written")
  })
})
