const express = require('express')
const app = express()
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
const port = 3000
//

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {restaurantList: restaurantList.results})
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