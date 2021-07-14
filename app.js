const express = require('express')
const app = express()
// const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurant => res.render('index', {restaurant}))
  .catch(error => console.log(error))
})

app.get('/restarant/new', (req,res) => {
  return res.render('new')
})

app.post('/add-restaurant', (req,res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description  
  
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  console.log(req.params.restaurant_id)
  res.render('show', {restaurant})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().replace(/\s+/g, '').includes(keyword.toLowerCase().replace(/\s+/g, '')))
  res.render('index', {restaurantList: restaurants, keyword: keyword})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})