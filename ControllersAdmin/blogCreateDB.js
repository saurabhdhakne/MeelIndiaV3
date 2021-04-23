const mongoose = require("mongoose");

const databases = require("../database/models/blog");

const { async } = require("crypto-random-string");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = (req, res) => {

  var url = `${process.env.db}`;

  mongoose.connect(url, async (err, db) => {
    if (err) {
      console.log("Unable to connect");
    } else {

    console.log("connected");

      var currentdate = new Date(); 
      var datetime =  "Date : "+ currentdate.getDate() + "/"
                      + (currentdate.getMonth()+1)  + "/" 
                      + currentdate.getFullYear() + ", Time : "  
                      + currentdate.getHours() + ":"  
                      + currentdate.getMinutes() + ":" 
                      + currentdate.getSeconds();

        
        databases.create(
            {
            
              title: req.body.title,

              img: req.body.img,
    
              dateTime: datetime,
    
              content: req.body.content,

            },
            (error, post) => {

                console.log(error, post);

            }

          );
          
    res.render("accountCreated");

    }

  });

};
