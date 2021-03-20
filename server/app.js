const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Mongo URI

const mongoURI = "mongodb://localhost:27017/clinicDB";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const clinicInfoSchema = new mongoose.Schema ({
  title: String,
  content: String
});

const ClinicInfo = mongoose.model("ClinicInfo", clinicInfoSchema);

/* All functionalities for clinic info - get, post, delete, update */

app.post("/res", function (req, res) {

  const clinicInfo = new ClinicInfo ({
    title: req.body.clinicTitle,
    content: req.body.clinicContent
  });

  clinicInfo.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })

});

app.get("/res", function(req, res) {
  ClinicInfo.find(function(err, infos) {
    if (err) {
      console.log(err);
    } else {
      res.send(infos);
    }
  })
});

app.delete("/:clinicTitle", function(req, res) {

  const clinicTitle = req.params.clinicTitle;

  ClinicInfo.deleteOne({title: clinicTitle}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(clinicTitle + " Successfully deleted");
    }
  })
});

app.patch("/", function(req, res) {

  ClinicInfo.update(
    {title: req.body.clinicTitle},
    {content: req.body.clinicContent},
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body.clinicContent + " Successfully updated!");
      }
    })

});

/* End of clinic info */ 


app.listen(3005, function() {
    console.log("Server is running on port 3005");
})