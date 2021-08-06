const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurants = require('../restaurant')
const restaurantData = require('./restaurant.json')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurant = require('../restaurant')


const SEED_USERS = [{
  name: '使用者一',
  email: 'user1@example.com',
  password: '12345678',
  ownedRestaurantsId: [1, 2, 3]
},
{
  name: '使用者二',
  email: 'user2@example.com',
  password: '12345678',
  ownedRestaurantsId: [4, 5, 6]
}]

db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, (SEED_USER, i) => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const restaurants = restaurantData.results.filter(restaurant => SEED_USER.ownedRestaurantsId.includes(restaurant.id)) //利用餐廳id把兩個user的餐廳從json檔案找出來
        restaurants.forEach(restaurant => { restaurant.userId = userId}) //把挑出後的餐廳賦值.userId = userId
        return Restaurants.create(restaurants)
      })
  }))    
    .then(() => {
      console.log('seeder done')
      process.exit()
    })
    .catch(error => console.log(error))
})