        
      
        // geoNames api info
         //http://api.geonames.org/postalCodeSearchJSON?placename=houston&username=binu
         const geoBaseUrl       = 'http://api.geonames.org/postalCodeSearchJSON?';
         const geoApiUsername = "binu";
      
      
         // weatherbit api info
         const weathBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?'
         const weathApi_key = 'aa99a52e41d9409fa54a33d56fe394d2'
        //  https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY


               // pixabay api info

       const  pixBaseUrl = 'https://pixabay.com/api/?'
       const  PixApi_key = '16907629-fae8b9893441944e32484016c'
         
        //baseUrl with image search of houston city
        //https://pixabay.com/api/?key=16907629-fae8b9893441944e32484016c&q=houston&image_type=photo


        // access user input and define variables
        
      
        
        

      

          


  
      
 
      
        
        
        
        //generate new date
        const dateGenerator = () => {
                let d        = new Date()
                let month    = d.getMonth() 
                let date     = d.getDate()
                let year     = d.getFullYear()
                let fullDate = `${year}-${month + 1}-${date}`
            return fullDate;

            }

        
        // define a function that is called when generate button is clicked with chaining promises 
         function geoNamesCaller(evt){
             evt.preventDefault()
                   
                    let  city = document.getElementById('desti-location').value
                    let  geoNamesFullUrl = `${geoBaseUrl}placename=${city}&username=${geoApiUsername}`
                    let fetchedData = {}
                    
                    // let placeName =''
                    // let countryCode =''
                    // let lat = 0
                    // let lng = 0
                    // let low_temp = 0
                    // let high_temp = 0
                    // let weathDescription =''

                    
                    
                            
                  
                    
                    // fetch data from weather api
                        fetchApiCall(geoNamesFullUrl)
                        
                        .then( (data)=>{
                            console.log(data)
                        // asigning fetched data to a variable
                          fetchedData.placeName = data.postalCodes[0].placeName
                       
                          fetchedData.countryCode = data.postalCodes[0].countryCode
                          fetchedData.lat = data.postalCodes[0].lat
                           fetchedData.lng = data.postalCodes[0].lng
                            
                         let  weathbitFullUrl = `${weathBaseUrl}city=${fetchedData.placeName},${fetchedData.countryCode}&lat=${fetchedData.lat}&lon=${fetchedData.lng}&key=${weathApi_key}`
                           return  fetchApiCall(weathbitFullUrl)
                          
                             })
                        
                            .then(weathData => {
                                console.log(weathData)
                                fetchedData.low_temp = weathData.data[0].low_temp
                           
                                fetchedData.high_temp = weathData.data[0].high_temp
                                fetchedData.weathDescription = weathData.data[0].weather.description
                               let  pixabayFulUrl = `${pixBaseUrl}key=${PixApi_key}&q=${city}&image_type=photo`
                               return fetchApiCall(pixabayFulUrl)
                            })
                       
                          .then(pixaData =>{
                              let pixPhoto = pixaData.hits[0].webformatURL
                           
                              postData("http://localhost:3000/addAll" ,{placeName:fetchedData.placeName, countryCode:fetchedData.countryCode, low_temp:fetchedData.low_temp, high_temp:fetchedData.high_temp,weathDescription:fetchedData.weathDescription,pixPhoto:pixPhoto })
                           
                                //fetch all data from server and update into dom 
                             updateUI();
                          })
                    };

        


                
                
                
            
            
            


        
        // define fetch for api call
            const fetchApiCall  = async (url) =>{

                const response = await fetch(url)
                 try{
                    const responseData = await response.json()
                    console.log(responseData)
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
        
        
        
        

        
        
        // updateUI function define
        const updateUI = async ()=> {
            // fetch all data from endpoint object
            const request = await fetch('http://localhost:3000/all')
            
            try{
                //update to the dom dynamically
                    const allData = await request.json();
                    document.getElementById('days-count-info').innerHTML    = ` ${allData.placeName}, ${allData.countryCode} is 220 days away`
                    document.getElementById('place-info').innerHTML    = ` ${allData.placeName}, ${allData.countryCode}`
                    document.getElementById('departing-date').innerHTML    = ` ${dateGenerator()}`
                    document.getElementById('min-high-temp').innerHTML    = ` min: ${allData.low_temp} °c /high: ${allData.high_temp} °c`
                    document.getElementById('weather-temp').innerHTML    = ` ${allData.weathDescription}`
                    document.getElementById('location-img').src = `  ${allData.pixPhoto}`;
        
                    
            }catch(error){
                console.log("error",  error);
        }
        };


       


    export {geoNamesCaller}
        
