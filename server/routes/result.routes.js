let express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

// Info model - haqqimizda sehifesi
let Result = require('../model/resultSchema');

router.post("/saveResults", function(req, res) {
    const results = new Result ({
      score: req.body.score,
      numberOfQuestions: req.body.numberOfQuestions,
      numberOfAnsweredQuestions: req.body.numberOfAnsweredQuestions,
      correctAnswers: req.body.correctAnswers,
      wrongAnswers: req.body.wrongAnswers,
      username: req.body.username,
    });
  
    results.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    })
  });
  

router.get("/saveResults", (req, res, next) => {
    Result.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            infos: data
        });
    });
});

router.delete("/saveResults/:username", function(req, res) {

    const username = req.params.username;
  
    Result.deleteOne({username: username}, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(username + " Successfully deleted");
      }
    })
  });

module.exports = router;