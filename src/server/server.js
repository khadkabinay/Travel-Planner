
            // serve as an endpoint data

            let projectData = {};


            // Require Express to run server and routes
            const express = require('express');
            const path    = require("path");
           
            
            /* Start up an instance of app */
            const app = express();


            /* Middleware*/
            //Here we are configuring express to use body-parser as middle-ware.
            const fetch      = require("node-fetch");
            const bodyParser = require('body-parser')
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());


            // Cors for cross origin allowance
            const cors = require('cors');
            app.use(cors());


            // Initialize the main project folder
            app.use(express.static("dist"));


            // Setup Server
            const port   = 3000
            const server =  app.listen(port, listening);
            
            function listening(){
                console.log(`server is running on localhost:${port}`);
            };


        app.get('/', function (req, res) {
            res.sendFile('dist/index.html')
        })


        // add api fetched data and feelings into an object

            app.post('/addAll', addAllToObj);

            function addAllToObj(req,res){
            
            // data coming as post request asigned to an object
        
            projectData.placeName        = req.body.placeName
            projectData.countryCode      = req.body.countryCode
            projectData.departureDate    = req.body.departureDate
            projectData.low_temp         = req.body.low_temp
            projectData.high_temp        = req.body.high_temp
            projectData.weathDescription = req.body.weathDescription
            projectData.pixPhoto        = req.body.pixPhoto
            
            
                
            res.send(projectData)
            };
            



            //send end point object where it is fetched 
            app.get("/all",getGeoWeathPixData);

            function getGeoWeathPixData(req,res){
                        res.send(projectData)

            };

