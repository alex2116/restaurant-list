const Restaurants = require('../restaurant')
const restaurantData = require('./restaurant.json')

const db = require('../../config/mongoose')


db.once('open', () => {
  console.log('mongodb connected')

  Restaurants.create(Object.assign(restaurantData.results, restaurantData))
    
  console.log('done.')
})