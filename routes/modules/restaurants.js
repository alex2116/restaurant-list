const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:restaurant_id/edit', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log)

})

router.get('/:restaurant_id/detail', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.post('/search', async (req, res) => {
  const keyword = req.body.keyword.toLowerCase().replace(/\s+/g, '')
  const userId = req.user._id
  if (!keyword) {
    return res.redirect('/')
  }

  const restaurantsOfUser = await Restaurant.find({ userId }).lean()
  const filteredrestaurant = restaurantsOfUser.filter( filteredRestaurant => {
    return filteredRestaurant.name.toLowerCase().includes(keyword)
  })  
  res.render('index', { restaurant: filteredrestaurant })
})

router.post('/add-restaurant', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}/detail`))
    .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router