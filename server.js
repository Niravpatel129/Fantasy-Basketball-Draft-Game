const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
var mongoose = require("mongoose");
const axios = require("axios");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose
mongoose.connect(
  "mongodb://dbadmin:dbadmin1@ds155076.mlab.com:55076/tournament",
  { useNewUrlParser: true }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connection success to database!");

  // Person1.save();
});
var personData = new mongoose.Schema({
  username: String,
  Date: String,
  picks: [
    {
      gameId: String,
      selection: String
    }
  ]
});

var User = mongoose.model("User", personData);

// Client API Calls
app.post("/logPicks", (req, res) => {
  var picks = req.body.logPicks.picks.map(pick => {
    return {
      gameId: pick.gameId,
      selection: pick.selection
    };
  });

  var Person1 = new User({
    username: req.body.logPicks.user.name,
    Date: req.body.logPicks.date,
    picks: picks
  });

  Person1.save();
  console.log("saved");
});

app.get("/checkIfAlreadyPickedToday", (req, res) => {
  User.find(
    { username: req.query.name, Date: req.query.date },
    (err, response) => {
      if (response.length > 0) {
        res.send("found");
      } else {
        res.send("notfound");
      }
    }
  );
});

app.get("/games", (req, res) => {
  // console.log(req.query.product);	  console.log(req.query);
  let date = req.query.product;
  gamesApi(date, date).then(data => res.send(data.data));
});

app.get("/results", (req, res) => {
  // console.log(req.query);
  var results = [];
  {
    User.find(
      { username: req.query.name, Date: req.query.date },
      (err, response) => {
        if (response.length > 0) {
          response[0].picks.map(pick => {
            // console.log(pick.gameId);
            // console.log(pick.selection);
            axios
              .get("https://www.balldontlie.io/api/v1/games/" + pick.gameId)
              .then(dat => {
                let gameWinner;
                let selectionTeam;
                console.log(dat.data.date);
                var homeTeam = {
                  team: dat.data.home_team.full_name,
                  score: dat.data.home_team_score,
                  gameResult: "",
                  selected: false
                };

                var visitorTeam = {
                  team: dat.data.visitor_team.full_name,
                  score: dat.data.visitor_team_score,
                  gameResult: "",
                  selected: false
                };

                var didHomeTeamWin =
                  homeTeam.score > visitorTeam.score ? true : false;

                if (didHomeTeamWin) {
                  gameWinner = dat.data.home_team.full_name;
                } else {
                  gameWinner = dat.data.visitor_team.full_name;
                }

                selectionTeam = pick.selection;

                results.push({
                  homeTeam: homeTeam,
                  visitorTeam: visitorTeam,
                  gameWinner,
                  selectionTeam
                });
                if (results.length == response[0].picks.length) {
                  console.log(results);
                  res.send(results);
                }
              });
          });
        } else {
          console.log("not found");
          res.send("not found any data for this date");
        }
      }
    );
  }
});

app.get("/data", (req, res) => {
  console.log("retrieving data");
  let team_id = req.query.team_id;
  prevGameApi(team_id)
    .then(data => {
      var currIdx = 0;
      while (
        data.data.data[currIdx].status === "Final" &&
        currIdx != data.data.data.length - 1
      ) {
        currIdx++;
      }
      if (currIdx != data.data.data.length - 1) {
        const game_id = data.data.data[currIdx - 1].id;
        const game_data = statsApi(team_id, game_id)
          .then(data => {
            var players = [];
            data.data.data.map(player => {
              if (player.player.team_id == team_id) {
                players.push(player);
              }
            });
            res.send(players.sort(compareByPoints));
          })
          .catch(err => {
            console.log(err);
          });
      } else res.send("no current games");
    })
    .catch(err => {
      console.log(err);
    });
});

function compareByPoints(a, b) {
  const playerA = a.pts;
  const playerB = b.pts;

  let comparison = 0;
  if (playerA > playerB) comparison = -1;
  else if (playerA < playerB) comparison = 1;

  return comparison;
}

// BallDontLie API calls
async function gamesApi(start, end) {
  return await axios.get(
    "https://www.balldontlie.io/api/v1/games?start_date=" +
      start +
      "&end_date=" +
      end
  );
}

async function prevGameApi(team_id) {
  return await axios.get(
    "https://www.balldontlie.io/api/v1/games?per_page=100&seasons[]=2018&team_ids[]=" +
      team_id
  );
}

async function statsApi(team_id, game_id) {
  return await axios.get(
    "https://www.balldontlie.io/api/v1/stats?per_page=100&game_ids[]=" + game_id
  );
}

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
