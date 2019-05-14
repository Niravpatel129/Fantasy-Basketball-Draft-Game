const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose
mongoose.connect('mongodb://dbadmin:dbadmin1@ds155076.mlab.com:55076/tournament', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection success to database!');

  // var Person1 = new User({ user: "Jon", date: "2019-05-12", picks: [
  //   {
  //     gameId: '56',
  //     homeTeam: "Toronto Raptors",
  //     awayTeam: "Milwauke Bucks",
  //     selection: "Toronto Raptors"
  //   }]
  // });

  // Person1.save();
});
var personData = new mongoose.Schema({
  username: String,
  date: String,
  picks: [
    {
      gameId: String,
      homeTeam: String,
      awayTeam: String,
      selection: String
    }
  ]
});

var User = mongoose.model('User', personData);
// API calls
app.post('/vote', (req, res) => {
  console.log(req.body, 'was recieved by /vote');
  // var data = new User({ user: req.body.user, teamPicked: req.body.teamPicked });
  // data.save();

  var Person1 = new User({
    username: 'Jon',
    date: '2019-05-12',
    picks: [
      {
        gameId: '56',
        homeTeam: 'Toronto Raptors',
        awayTeam: 'Milwauke Bucks',
        selection: 'Toronto Raptors'
      }
    ]
  });

  Person1.save();
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
