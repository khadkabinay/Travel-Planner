

const { daysCalculator } = require('./app.js')


// testing if daysCalculator funtion works

test ('expected daysCalculator should return substracted days ', ()=> {
     const departure_date = new Date('2020-06-07')
     const dayOfleave     = new Date()
     const diffBetween    = Math.abs(departure_date - dayOfleave)
     const expectedDays   = Math.floor(diffBetween / (1000 * 60 * 60 * 24) + 1) ;
     const  result        = daysCalculator(departure_date)
     expect(result).toEqual(expectedDays);
})

