require('dotenv').config();
const express = require('express')
    , cors = require('cors')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , authController = require('./controller/auth_controller')
    , controller = require('./controller/controller');

const app = express();
app.use(bodyParser.json());
app.use(session({
    seecret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


//Auth Strategy
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let {username, email, firstName, lastName, gender, user_id} = profile;
    const db = app.get('db');

    db.find_user([user_id]).then(function(user) {
        if(!user[0]){
            db.create_user([
                user_id,
                username,
                email,
                firstName,
                lastName,
                gender
            ]).then(user => {
                return done(null, user[0].id)
            })
        }
        else {
            return done(null, user[0].id)
        }
    })
}))

passport.serializeUser((profile, done) => {
    done(null, profile);
})
passport.deserializeUser((profile, done) => {
    done(null, profile);
})

//End Points 

app.get('/auth/me', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/home'
}))

app.get('/api/getUsers', authController.getUsers);
app.post('/api/addUser', authController.addUser);

// 76D endpoint
app.get("/api/getFriends/:id", controller.getFriends)

massive(process.env.CONNECTION).then(db=>{
    app.set('db', db);
    app.listen(process.env.SERVER_PORT, () => console.log(`Sup? It's me, port ${process.env.SERVER_PORT}`))
})