const express  = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const quizRouter = require('./routes/quiz')

const PORT = process.env.PORT || 3000

//Passport Setup
require('./config/passport')

//DB config
const db = require('./config/keys').mongoURI
mongoose.connect(db , {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
}).then(()=> console.log('---------- MongoDB Connected -----------')).catch(err => console.log(err))

const app = express()

//View Engine setup
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set(express.static("public"))


//Express bodyparser
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

//Express session
app.use(
    session({
        secret: 'IEEE-SSIT',
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 60000000}
    })
)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/quiz', quizRouter)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  app.listen(PORT, console.log(`Server started on port ${PORT}. Database at ${db}.`))

