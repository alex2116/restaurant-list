const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const routes = require('./routes')
require('./config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.failureFlash = req.flash('failureFlash')
  next()
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})