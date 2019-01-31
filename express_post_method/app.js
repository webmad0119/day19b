const express     = require('express')
const app         = express()
const handlebars  = require("express-handlebars")
const hbs         = require('hbs')
const bodyParser  = require('body-parser')      // needed por POST request

// config
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: '',
    layoutsDir: __dirname + '/views'
}));




// pre-built middleware
app.use(bodyParser.urlencoded({ extended: true })) // needed por POST request

// custom middleware
app.use(miProceso)
function miProceso(req, _, next){
  console.log("Middleware working!")
  req.accessGranted = true;     // custom property on req object
  next()
}



// http://localhost:3000/user-info
app.get('/user-info', (req, res) => res.render('user-info-form'))
app.post('/display-user-info', (req, res) => {
  if (req.accessGranted) res.send(`<h1>Hi ${req.body.name}! Acceso permitido</h1>`)
  else res.send('<h1>¿Dónde vas, merluzo?</h1>')
});

app.listen(3000, () => console.log('App listening on port 3000!'))
