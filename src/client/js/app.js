        
      
        // geoNames api info
         //http://api.geonames.org/postalCodeSearchJSON?placename=houston&username=binu
         const geoBaseUrl       = 'http://api.geonames.org/postalCodeSearchJSON?';
         const userName = "binu";
      
      
         // weatherbit api info
         // baseUrl = https://api.weatherbit.io/v2.0/history/daily?
         // api_key = aa99a52e41d9409fa54a33d56fe394d2


        // pixabay api info

        //baseUrl = https://pixabay.com/api/?
         //api_key = 16907629-fae8b9893441944e32484016c
        
        //baseUrl with image search of houston city
        //https://pixabay.com/api/?key=16907629-fae8b9893441944e32484016c&q=houston&image_type=photo
 
      
        
        
        
        // generate new date
        // const dateGenerator = () => {
        //         let d        = new Date()
        //         let month    = d.getMonth() 
        //         let date     = d.getDate()
        //         let year     = d.getFullYear()
        //         let fullDate = `${year}-${month + 1}-${day}`
        //     return fullDate;

        //     }

        
        // define a function that is called when generate button is clicked with chaining promises 
         function tempFeelingTeller(event){
                    event.preventDefault()
            // input fields
              let  city = document.getElementById('zip').value
        
                let  geoNamesFullUrl = `${geoBaseUrl}placename=${city}&username=${userName}`
            


                     // fetch data from weather api
                        getTemperate(geoNamesFullUrl)
                        
                        .then( (data)=>{
                        //asigning fetched data to a variable 
                            console.log(data)
                         let placeName = data.postalCodes[0].placeName
                         let countryCode = data.postalCodes[0].countryCode
                         let lat = data.postalCodes[0].lat
                         let lng = data.postalCodes[0].lng

                            
                            
                    
                        // add an object as post route to server
                        postData('http://localhost:3000/addFeelWith', {placeName:placeName, countryCode:countryCode, lat:lat, lng:lng  } );
                
                        //fetch all data from server and update into dom 
                        updateUI();
                    })
                };

                
                
                
            
            
            


        
        // define fetch for api call
        const getTemperate  = async (url) =>{

            const response = await fetch(url)
                try{
                    const weatherData = await response.json()
                    console.log(weatherData)
                    return weatherData;
                
                }catch(error){
                    console.log("error", error)
                }
            };
        
        
        
        
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
                    document.getElementById('temp').innerHTML    = ` ${allData.placeName}, ${allData.countryCode}, ${allData.lat}, ${allData.lng}`
                    document.getElementById('content').innerHTML = ` ${allData.feelings}`;
        
            }catch(error){
                console.log("error",  error);
        }
        };



    export {tempFeelingTeller}
        
