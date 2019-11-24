const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('assets'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.render('index', { links: [] }))
app.post('/', (req, res) => {

    res.render('index', { links: [req.body] })
})

app.listen(3000, () => console.log('...'))