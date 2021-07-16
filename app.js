const express = require('express')
const app = express()
// const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const routes = require('./routes')

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
app.use(methodOverride('_method'))
app.use(routes)





app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})