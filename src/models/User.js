let mongoose = require('mongoose')
let testSchema = new mongoose.Schema({
  justText: String
})
module.exports = mongoose.model('Test', testSchema)