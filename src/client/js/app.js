    
    
    // geoNames api info
        //http://api.geonames.org/postalCodeSearchJSON?placename=houston&username=binu
        const geoBaseUrl       = 'http://api.geonames.org/postalCodeSearchJSON?';
        const geoApiUsername = "binu";
    
    
        // weatherbit api info
         const weathbitBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?'
         const weathApi_key = 'aa99a52e41d9409fa54a33d56fe394d2'
    //  https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
   // https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2020-06-05&end_date=2020-06-06&key=API_KEY
   //&lat=38.123&lon=-78.543&start_date=2020-06-05&end_date=2020-06-06

            // pixabay api info

    const  pixBaseUrl = 'https://pixabay.com/api/?'
    const  PixApi_key = '16907629-fae8b9893441944e32484016c'
        
    //baseUrl with image search of houston city
    //https://pixabay.com/api/?key=16907629-fae8b9893441944e32484016c&q=houston&image_type=photo


    // access user input and define variables
  
  
   
    
   

    
    
    

    

        



    

    
    
    // //generate new date
    // const dateGenerator = (inputDate) => {
    //          let splitedDate = inputDate.split('-')
    //          return splitedDate

    //     //     let month    = d.getMonth() 
    //     //     let date     = d.getDate()
    //     //     let year     = d.getFullYear()
    //     //     let fullDate = `${year}-${month + 1}-${date}`
    //     // return fullDate;

    //     }
    
    

    
    // define a function that is called when generate button is clicked with chaining promises 
        function geoWeathPixCaller(evt){
            evt.preventDefault()
            let  city = document.getElementById('desti-location').value
            let departureDate = document.getElementById('departure-date').value
            let  geoNamesFullUrl = `${geoBaseUrl}placename=${city}&username=${geoApiUsername}`
            let fetchedData = {}
              
                // fetch data from weather api
                    fetchApiCall(geoNamesFullUrl)
                    
                    .then( (data)=>{
                     
            
                
                        
                    // asigning fetched data to a variable
                        fetchedData.placeName = data.postalCodes[0].placeName
                     
                    
                        fetchedData.countryCode = data.postalCodes[0].countryCode
                        fetchedData.lat = data.postalCodes[0].lat
                        fetchedData.lng = data.postalCodes[0].lng
                       
                        
                        
                        let  weathForcastFullUrl = `${weathbitBaseUrl}&city_name=${city},${fetchedData.countryCode}&lat=${fetchedData.lat}&lon=${fetchedData.lng}&key=${weathApi_key}`
                            console.log(weathForcastFullUrl )
                            return  fetchApiCall(weathForcastFullUrl )
                        
                      })
                    
                    .then(weathData => {
                           
                            fetchedData.low_temp = weathData.data[0].low_temp
                        
                            fetchedData.high_temp = weathData.data[0].high_temp
                            fetchedData.weathDescription = weathData.data[0].weather.description
                            
                            
                            let  pixabayFulUrl = `${pixBaseUrl}key=${PixApi_key}&q=${city}&image_type=photo`
                            return fetchApiCall(pixabayFulUrl)
                          
                            
                          })
                    
                    .then( pixaData =>{
                           
                            let pixPhoto = pixaData.hits[0].webformatURL
                        
                            postData("http://localhost:3000/addAll" ,{placeName:fetchedData.placeName, countryCode:fetchedData.countryCode,departureDate:departureDate, low_temp:fetchedData.low_temp, high_temp:fetchedData.high_temp,weathDescription:fetchedData.weathDescription,pixPhoto:pixPhoto })
                        
                            //fetch all data from server and update into dom 
                            updateUI();
                        })
                };

    


            
            
            
        
        
        


    
    // define fetch for api call
     const fetchApiCall    = async (url) =>{
            let errorContent    = document.getElementById('error-content')
            let  errMsg    = document.createTextNode("please! enter valid city name")
            const response = await fetch(url)
                try{
                const responseData = await response.json()
               
                return responseData;
                    
                
                
            
            }catch(error){
              console.log("error", error)
            }
        };
    
    
    

    // add an object as post route to server
    //   postData('http://localhost:3000/addFeelWith', {placeName:placeName, countryCode:countryCode, lat:lat, lng:lng  } );
    
    //postData function define
    
    const postData = async (url = " ", data = {})=>{

        const response = await fetch(url,{
            method:"POST",
            credentials: "same-origin",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
    
            });
    
            try {
                const newData = await response.json();
            return newData;
            
            }catch(error){
            console.log("error", error)
            }
            
        };
    

        

        function daysCalculator(departDate){
            let departure_date = new Date(departDate)
            let dayOfleave = new Date()
            let diffBetween = Math.abs(dayOfleave  - departure_date)
            let days = Math.floor((diffBetween / (60*60*24*1000)))
            return days;
       }
    
    
    

       // ${(parseInt(allData.departureDate)) - (parseInt(returnDate))}
    
    // updateUI function define
    const updateUI = async ()=> {
        let  returnDate = document.getElementById('return-date').value
        // fetch all data from endpoint object
        const request = await fetch('http://localhost:3000/all')
        
        try{
            //update to the dom dynamically
                const allData = await request.json();
             
                document.getElementById('days-count-info').innerHTML    = ` ${allData.placeName}, ${allData.countryCode} is ${daysCalculator("'" + allData.departureDate +"'")} days away`
                document.getElementById('place-info').innerHTML    = ` ${allData.placeName}, ${allData.countryCode}`
                document.getElementById('departing-date').innerHTML    = ` ${allData.departureDate}`
                document.getElementById('returning-date').innerHTML    = ` ${returnDate}`
                document.getElementById('min-high-temp').innerHTML    = ` min: ${allData.low_temp} °c /high: ${allData.high_temp} °c`
                document.getElementById('weather-temp').innerHTML    = ` ${allData.weathDescription}`
                document.getElementById('location-img').src = `  ${allData.pixPhoto}`;
               
    
                
        }catch(error){
            console.log("error",  error);
    }
    };


    


export {geoWeathPixCaller}
    
