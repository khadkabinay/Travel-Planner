    
    
    // import require functions
            import {fetchApiCall, postData ,errorHandler } from "./fetchHandler"
            import {daysCalculator} from "./daysCount"
            import{updateUI} from "./uiUpdate"
   
    
     // geoNames api info
        const geoBaseUrl       = 'http://api.geonames.org/postalCodeSearchJSON?';
        const geoApiUsername   = "binu";
    
    // weatherbit api info
         const weathbitBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?'
         const weathApi_key    = 'aa99a52e41d9409fa54a33d56fe394d2'
    
    // pixabay api info     
    
        const  pixBaseUrl       = 'https://pixabay.com/api/?'
        const  PixApi_key       = '16907629-fae8b9893441944e32484016c'
        
  

    // define a function that is called when generate button is clicked with chaining promises 
        function geoWeathPixCaller(evt){
            evt.preventDefault()
            const  city            = document.getElementById('desti-location').value
            const departureDate    = document.getElementById('departure-date').value
            let  geoNamesFullUrl = `${geoBaseUrl}placename=${city}&username=${geoApiUsername}`
            let fetchedData      = {}
              
            // fetch data from geoNames API
                fetchApiCall(geoNamesFullUrl)
                    
                .then( (data)=>{
                    if(data.postalCodes.length == 0){
                           errorHandler()
                    }else{
                        
                        // asigning fetched data to a variable
                        fetchedData.placeName   = data.postalCodes[0].placeName
                        fetchedData.countryCode = data.postalCodes[0].countryCode
                        fetchedData.lat         = data.postalCodes[0].lat
                        fetchedData.lng         = data.postalCodes[0].lng
                       
                        let  weathForcastFullUrl = `${weathbitBaseUrl}&city_name=${city},${fetchedData.countryCode}
                                                    &lat=${fetchedData.lat}&lon=${fetchedData.lng}&key=${weathApi_key}`
                          
                            return  fetchApiCall(weathForcastFullUrl )
                        
                        }})
                    
                .then(weathData => {
                           
                        fetchedData.low_temp         = weathData.data[0].low_temp
                        fetchedData.high_temp        = weathData.data[0].high_temp
                        fetchedData.weathDescription = weathData.data[0].weather.description
                            
                            
                        let  pixabayFulUrl = `${pixBaseUrl}key=${PixApi_key}&q=${city}&image_type=photo`
                          return fetchApiCall(pixabayFulUrl)
                          
                            
                          })
                    
                .then( pixaData =>{
                    let pixPhoto = pixaData.hits[0].webformatURL
                          
                    postData("http://localhost:3000/addAll" ,
                    {placeName:fetchedData.placeName, countryCode:fetchedData.countryCode,departureDate:departureDate, low_temp:fetchedData.low_temp, high_temp:fetchedData.high_temp,weathDescription:fetchedData.weathDescription,pixPhoto:pixPhoto })
                        
                            //fetch all data from server and update into dom 
                    updateUI();
                        })
                       
                };





    


 export {geoWeathPixCaller, daysCalculator}
    
