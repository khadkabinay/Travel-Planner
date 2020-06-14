
  import { geoWeathPixCaller} from "./app"
  import { daysCalculator} from "./daysCount"
    // updateUI function define
    const updateUI = async ()=> {
        let returnDate = document.getElementById('return-date').value
        // fetch all data from endpoint object
        const request  = await fetch('http://localhost:3000/all')
        console.log(request)
        try{
            //update to the dom dynamically
                const allData = await request.json();
                
                
                document.getElementById('location-img').src             = `  ${allData.pixPhoto}`;
                document.getElementById('place-info').innerHTML         = ` <strong>Your trip to:</strong> ${allData.placeName}, ${allData.countryCode}`
                document.getElementById('departing-date').innerHTML     = ` <strong>Departing:</strong> ${allData.departureDate}`
                document.getElementById('returning-date').innerHTML     = ` <strong>Returning:</strong> ${returnDate} <br><br>`
                document.getElementById('days-count-info').innerHTML    = ` ${allData.placeName}, ${allData.countryCode} is ${daysCalculator("'" + allData.departureDate +"'")} days away`
                document.getElementById('min-high-temp').innerHTML      = `<strong>Typical weather for then is:</strong><br> min: ${allData.low_temp} °c /high: ${allData.high_temp} °c`
                document.getElementById('weather-temp').innerHTML       = ` ${allData.weathDescription}`
               
        }catch(error){
            console.log("error",  error);
        }
    };

   
    export { updateUI }