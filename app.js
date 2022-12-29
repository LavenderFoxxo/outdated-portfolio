/* Importing Dependencies */
const express = require('express')
const app = express()
const path = require('path')
const port = 27504

/* Importing Routes */
const Main = require('./routes/panel')

/* Setting up the app */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/', Main)

/* Starting the app */
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})