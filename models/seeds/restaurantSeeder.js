const mongoose = require('mongoose')
const Restaurants = require('../restaurants')
const restaurantData = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true }) //seeder要connect 因為這是預先配置好的資料嗎？

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')

  Restaurants.create(Object.assign(restaurantData.results, restaurantData))
    
  console.log('done.')
})