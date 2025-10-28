// Packages, connections
const dotenv = require('dotenv'); // in order to use .env
dotenv.config() // in order to use .env

const express = require(`express`) // in order to use Express
const app = express() // in order to use Express

const { default: mongoose } = require('mongoose'); // in order to use mongoose to connect with MongoDB
mongoose.connect(process.env.MONGODB_URI) // connect to MongoDBusing the info in .env
mongoose.connection.on(`connected`, () => { // connect to MongoDB
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})
const methodOverride = require(`method-override`) // to make DELETE, PUT requests work
// const morgan = require(`morgan`) // for HTML request info in the console

app.use(express.urlencoded({ extended: false })); // expect user input data from forms
app.use(methodOverride(`_method`)) // to make DELETE, PUT requests work
// app.use(morgan(`dev`)) // for HTML request info in the console

const path = require('path'); // Set up public folder
app.use(express.static('public'));

// Schema
const nucleotidePairData = require(`./models/nucleotide.js`) // use this MongoDB schema

// Connections
app.get (`/`, async (req, res) => { // GET request for the index route
    const allData = await nucleotidePairData.find()
    
    res.render(`home.ejs`, {
        dataPoints: allData
    })
})

app.post(`/`, async (req, res) => { // POST request to the fruits new route (i.e. not a get request)
    if(req.body.nucleotideMatch === 'on') {
        req.body.nucleotideMatch = true;
    } else {
        req.body.nucleotideMatch = false;
    }
    await nucleotidePairData.create(req.body)
    
    res.redirect(`/`) // redirect to the GET fruits index route after the post fruits processing has run
    
})

app.get(`/new`, async (req, res) => {
    const allData = await nucleotidePairData.find()

    // console.log(allData);

    // Determine the max nucleotide position out of all the pairs
    let maxPosition = 0
    for (const pair of allData) {
        if (pair.nucleotidePosition > maxPosition) {
            maxPosition = pair.nucleotidePosition;
        }
    }

    res.render(`new.ejs` , {
        dataPoints: allData,
        maxPosition: maxPosition
    })
})

app.put(`/:dataPointId`, async (req, res) => { // need a form for a put request
    await nucleotidePairData.findByIdAndUpdate(req.params.dataPointId, req.body)
    res.redirect(`/`)
})

app.delete(`/:dataPointId`, async (req, res) => { // DELETE request
    await nucleotidePairData.findByIdAndDelete(req.params.dataPointId)
    res.redirect(`/`)

})

app.get(`/:dataPointId`, async (req, res) => { // GET request for show route
    const allData = await nucleotidePairData.find()
    const foundDataPoint = await nucleotidePairData.findById(req.params.dataPointId)
    res.render(`show.ejs` , {
        dataPoint: foundDataPoint,
        dataPoints: allData,

    })
})

// Listening
const portNumber = 3001
app.listen(portNumber, () => {
    console.log(`Listening on port ${portNumber}`);
})