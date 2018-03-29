// Variable set ups
const GithubStrategy = require('passport-github'),
      cookieSession  = require("cookie-session"),
      QueuedPerson   = require('./models/queuedPeople'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      express        = require('express'),
      Person         = require('./models/people'),
      mongo          = require('mongodb'),
      path           = require('path'),
      cors           = require('cors'),
      seed           = require('./seed.js'),
      keys           = require('./config/keys'), //secure file
      PORT           = 3001;


//App configuration
const MLAB_URL = keys.mLab.url;
app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Connect to your db
mongoose.connect(MLAB_URL, (err, db) => {
    err ? console.log(err) : console.log(`You conncected to your ${MLAB_URL} DB...`);
});

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // session last for one day.
    keys: keys.auth.key
}));

//Seed Data: Remove all prev data and add seed data.
// seed();

//Oauth  set up for gethub
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Person.findById(id).then((user1) => {
        done(null, user1)
    }).catch((err) => { console.log(err, '<---from line 62') });
});

passport.use(new GithubStrategy({
    //options for the strategy
    callbackURL: '/auth/github/redirect',
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret

}, (accessToken, refreshToken, profile, done) => {
    //passport CB
    //this code is exicuted once the person get redirected 
    //back to our site with its user info.

    Person.findOne({ github_id: profile._json.id }).then((currentPerson) => {
        if (currentPerson) {
            console.log(`user is already saved as: ${currentPerson}`);
            done(null, currentPerson);
        } else {
            //save persons data to mongoDB
            new Person({
                login: profile._json.login,
                github_id: profile._json.id,
                avatar_url: profile._json.avatar_url
            })
                .save()
                .then((newPerson) => {
                    console.log(`A new Person was just saved to the DB ${newPerson}`);
                    done(null, newPerson);
                }).catch((err) => { console.log(err, '<-----from line 95') })
        }
    }).catch((err) => { console.log(err, '<-----from line 97') });
})
);


//////////////////
////Auth Routes///
//////////////////

app.get('/auth/login', (req, res) => {
    res.render("login");
});

app.get('/auth/github', passport.authenticate('github', {
    scope: ['profile'] // The items my app is requesting access to. 
}));

//callback route for github 
app.get('/auth/github/redirect', passport.authenticate('github'), (req, res) => {
    console.log(req.user, '<----- im the user');
    res.redirect(`/home?${req.user._id}`); //passing _id in a query string (ended up not working)
});

//Logout route is not working yet. No button for it. 
app.get('/auth/logout', (req, res) => {
    //need to use passport to logout instead
    res.send('logging out');
});


//////////////////
//Control Routes//
//////////////////

app.get('/home', (req, res) => {
    console.log(req.query, "look here !!!!!!!!!!!!!!");
    res.cookie('id', req.query).sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/build/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/bundle.js'));
});

//////////////////
////DB Routes/////
//////////////////

//Get all 
app.get('/person', (req, res) => {
    console.log('There was as GET request to the server...')
    Person.find({}, (err, people) => {
        if (err) {
            console.warn('Error in the /data route: ', err);
        } else {
            console.log('People: ', people);
            res.send(people);
        }
    });
});

//Add one to users
app.post('/person', (req, res) => {
    console.log('There was a POST request to the server...');
    console.log(`request.body normal is ${req.body.name}`);
    newPerson = { name: req.body.name };
    Person.create(newPerson, (err, createdPerson) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${createdPerson} was added to the DB...`);
            res.status(200).json(createdPerson);
        }
    });
});

//get queue
app.get('/queuedPeople', (req, res) => {
    QueuedPerson.find({}, (err, allQueued) => {
        if (err) {
            console.log(err);
        } else {
            console.log(allQueued, ' was added to the queue');
            res.send(allQueued);
        }
    })
})


//Delete one
app.delete('/person/:login', (req, res) => {
    console.log('There was a DELETE Request to the server...');
    console.log(req.params.login);
    let toBeDeleted = { login: req.params.login };
    Person.findOneAndRemove(toBeDeleted, (err, deleted) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`${deleted} was removed from DB`);
            res.sendStatus(200);
        }
    });
});

//Server lisening
app.listen(PORT, () => console.log(`server is listening on ${PORT}...`));