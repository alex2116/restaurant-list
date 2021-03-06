const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  "name": {
    type: String,
    required: true
  },
  "name_en": {
    type: String,
    required: false
  },
  "category": {
    type: String,
    required: true
  },
  "image": {
    type: String,
    required: false
  },
  "location": {
    type: String,
    required: true
  },
  "phone": {
    type: String,
    required: false
  },
  "google_map": {
    type: String,
    required: false
  },
  "rating": {
    type: String,
    required: false
  },
  "description": {
    type: String,
    required: false
  },
  "userId": {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  "name_toLowerCase":{
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)