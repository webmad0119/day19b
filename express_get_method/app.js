const express     = require('express')
const app         = express()
const handlebars  = require("express-handlebars")
const hbs         = require('hbs')

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: '',
    layoutsDir: __dirname + '/views'
}));





// REQUEST PARAMS

// http://localhost:3000/shop/chaqueta/color/verde
app.get('/shop/:modelName/color/:modelColor', (req, res) => res.send(req.params))


// http://localhost:3000/users/53500000L
// http://localhost:3000/users/X53500000L
app.get('/users/:userID([0-9]{8}[A-Z]|X[0-9]{8}[A-Z])', (req, res) => res.send(req.params))







// REQUEST QUERY STRINGS

// http://localhost:3000/search?id=99868755&color=blue&size=XXL
app.get('/search', (req, res) => res.send(req.query))


// http://localhost:3000/user-info
app.get('/user-info', (req, res) => res.render('display-user-info'))
app.get('/fetch-user-info', (req, res) => {
  let name        = req.query.name;
  let birth       = req.query.birth;
  let email       = req.query.email;

  res.send(`
    Your name is ${name} <br>
    Your birth date is ${birth} <br>
    Your email is ${email} <br>
  `)
});


app.listen(3000, () => console.log('App listening on port 3000!'))
