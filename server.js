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
    
    // Re-cast data type for checkbox on->true, null->false to expected DB boolean data type
    if(req.body.nucleotideMatch === 'on') {
        req.body.nucleotideMatch = true;
    } else {
        req.body.nucleotideMatch = false;
    }

    // Add date added time stamp to new entry
    req.body.dateAdded =Date()

    // Check for overlapping position values, i.e. an inserted entry
    // Save the added nucleotide pair position, i.e. the position to insert the pair into
    const addedNucleotidePosition = Number(req.body.nucleotidePosition)
    // console.log(addedNucleotidePosition);
    
    // Get all the data prior to the new entry being added
    const allData = await nucleotidePairData.find()

    // Get all the positions from the data prior to the new entry being added
    const preAddAllDataPositionArray = allData.map(entry => entry.nucleotidePosition)
    // console.log(preAddAllDataPositionArray); 

    // Check to see if the added position / insert position already exists; i.e. if there is an overlapping position
    if(preAddAllDataPositionArray.includes(addedNucleotidePosition)) {
        console.log(`Overlap position found`);
        // If the inserted position overlaps with an existing position, increment the pre-existing overlapping position and all subsequent positions by 1 to make space for the inserted position
        // e.g. If we already have entries for Positions 1,2,3,4 and we want to insert an entry into position 2; the old positions update like: 1, 2+1, 3+1, 4+1
        // Which results in the positions 1, 2 (new 2), 3 (old 2), 4 (old 3), 5 (old 4)
        allData.forEach((entry, index) => {
            // console.log(`pre incr entry.nucleotidePosition, ${entry.nucleotidePosition}`);
            // For the old positions which are greater than or equal to the inserted position
            if(entry.nucleotidePosition >= addedNucleotidePosition) {
                // Increment their positions by 1
                entry.nucleotidePosition = entry.nucleotidePosition + 1
            }
            // console.log(`post incr entry.nucleotidePosition, ${entry.nucleotidePosition}`);
        })
    } else {
        console.log(`No overlap position found`);
    }
    
    // Update the pre-add data with their updated positions
    await nucleotidePairData.create(allData)
    
    // Add the new entry with its insert position
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

    req.body.dateModified =Date()

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