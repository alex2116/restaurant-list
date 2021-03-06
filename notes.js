app.post('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/detail/${id}`))
    .catch(error => console.log(error))
})

app.post('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/detail/${id}`))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = Restaurant.filter(restaurants => restaurants.name.toLowerCase().replace(/\s+/g, '').includes(keyword.toLowerCase.replace(/\s+/g, '')))
  return res.render('index', { restaurant: restaurants })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  return Restaurant.find({ name: { $regex: `${keyword}`, $options: 'i' } })
    .lean()
    .then(restaurant => res.render('index', { restaurant, keyword: req.query.keyword }))
})