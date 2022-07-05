const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response){

 response.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey = "4e436b15ec5aec88e7c4d88127f4afb1";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey ;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const tempFeels = weatherData.main.feels_like;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.write("<h1>temperature in " + query + " is " + temp + " in degree celcius</h1>");
      res.write("<img src="+ imageURL+">");
      res.write("<p>temperature feels like "+ tempFeels + " degree celcius<p>");
      res.send();

    });
  });

})





app.listen(3000,function(){
  // console.log("server is running on port 3000.");
})
