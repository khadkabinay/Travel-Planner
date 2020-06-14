


        // return total days after substracting from current days
        const daysCalculator = (departDate) =>{
            let departure_date = new Date(departDate)
            let dayOfleave     = new Date()
            let diffBetween    = Math.abs(dayOfleave  - departure_date)
            let days           = Math.floor(diffBetween / (60*60*24*1000) + 1)
            
            return days
            
        }

        // return total trip length in days
        const tripLengthCount = (departDate ,returnDate) =>{
            let departure_date = new Date(departDate)
            let return_date     = new Date(returnDate)
            let diffBetween    = Math.abs( departure_date - return_date)
            let tripLength           = Math.floor(diffBetween / (60*60*24*1000) + 1)
            
            return tripLength
            
        }





        export { daysCalculator,tripLengthCount}