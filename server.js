// Packages, connections
const dotenv = require('dotenv'); // in order to use .env
dotenv.config() // in order to use .env

const express = require(`express`) // in order to use Express
const app = express() // in order to use Express

const { default: mongoose } = require('mongoose'); // in order to use mongoose to connect with MongoDB
mongoose.connect(process.env.MONGODB_URI) // connect to MongoDB using the info in .env
mongoose.connection.on(`connected`, () => { // connect to MongoDB
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})
const methodOverride = require(`method-override`) // to make DELETE, PUT requests work
app.use(methodOverride(`_method`)) // to make DELETE, PUT requests work

// const morgan = require(`morgan`) // for HTML request info in the console

app.use(express.urlencoded({ extended: false })); // to expect user input data from forms
// app.use(morgan(`dev`)) // for HTML request info in the console

const path = require('path'); // To set up the public folder
app.use(express.static('public')); // To set up the public folder


// MongoDB document schema for MDW-GA-Project > mdw-ga-project-cluster0 > gacruddna > nucleotidepairdatas
const nucleotidePairData = require(`./models/nucleotide.js`) // use this MongoDB schema


// Connections

// GET all the data for the '/' route
app.get (`/`, async (req, res) => { // GET request for the index route
    const allData = await nucleotidePairData.find()
    
    res.render(`home.ejs`, {
        dataPoints: allData
    })
})

// POST new entries to the '/' route
app.post(`/`, async (req, res) => { // POST request to the '/' route
    // console.log(`req.body`, req.body);

    // Re-cast data type for checkbox on->true, null->false to expected DB boolean data type; frontendbehavior.js data validation ensures that nucleotideMatch = true when the checkbox is checked 
    if(req.body.nucleotideMatch === 'on') {
        req.body.nucleotideMatch = true;

    // Check for if the Matching? checkbox is unchecked, but the nucleotides still match -> nucleotideMatch = true
    } else if ((req.body.templateNucleotide === "G" && req.body.codingNucleotide === "C") ||
               (req.body.templateNucleotide === "C" && req.body.codingNucleotide === "G") ||
               (req.body.templateNucleotide === "A" && req.body.codingNucleotide === "T") ||
               (req.body.templateNucleotide === "T" && req.body.codingNucleotide === "A")
            ) {
        req.body.nucleotideMatch = true;

    // i.e. the Matching? checkbox is unchecked and the nucleotides do in fact not match -> only scenario to set nucleotideMatch = false
    } else {
        req.body.nucleotideMatch = false;
    }

    // Add Date Added time stamp to new entry
    req.body.dateAdded = Date()


    // Check for overlapping position values, i.e. an inserted entry
    // Save the added nucleotide pair position, i.e. the position to insert the pair into
    const addedNucleotidePosition = Number(req.body.nucleotidePosition)
    // console.log(addedNucleotidePosition);
    
    // Get all the data prior to the new entry being added - for comparisons
    const allData = await nucleotidePairData.find()

    // Get all the positions from the data prior to the new entry being added
    const preAddAllDataPositionArray = allData.map(entry => entry.nucleotidePosition)
    // console.log(preAddAllDataPositionArray); 

    // Check if the added position / insert position already exists; i.e. if there is an overlapping position
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
    } else { // No overlapping positions; suggests that the pair was added to the end / appended
        console.log(`No overlap position found`);
    }
    
    // Update the pre-add data with their updated positions
    await nucleotidePairData.create(allData)
    
    // Add the new entry with its insert position
    await nucleotidePairData.create(req.body)

    res.redirect(`/`) // redirect to the '/'' route
    
})

// GET data for the '/new' route
app.get(`/new`, async (req, res) => {
    const allData = await nucleotidePairData.find()

    // console.log(allData);

    // Determine the max nucleotide position out of all the pairs; to pre-populate the Position field with the appending Position (i.e. not an inserting position)
    let maxPosition = 0
    // Run through the positions of all the data and save the max position value
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

// PUT updates for the '/:dataPointId' route
app.put(`/:dataPointId`, async (req, res) => { // need a form for a put request

    // Create Data Modified timestamp for updated entry
    req.body.dateModified = Date()

    // Check for overlapping position values, i.e. an inserted entry
    // Save the updated nucleotide pair position, i.e. the position to insert the pair into
    const modifiedNucleotidePosition = Number(req.body.nucleotidePosition)
    // console.log(`modifiedNucleotidePosition`, modifiedNucleotidePosition);

    // Get all the data prior to modifying the entry
    let allData = await nucleotidePairData.find()
    // console.log(`1 allData`, allData); 

    // Get all the Positions from the data prior to the new entry being added; to compare against the updated Position (is it an insert?)
    const preModifyAllDataPositionArray = allData.map(entry => entry.nucleotidePosition) // Creates an array only of existing nucleotide pair positions
    // console.log(`2 preModifyAllDataPositionArray`, preModifyAllDataPositionArray); 

    // Check to see if the updated position already exists; i.e. if there is an overlapping position
    if(preModifyAllDataPositionArray.includes(modifiedNucleotidePosition)) { // Does the existing pair position array include the updated position? i.e. is the user trying to insert the updated pair (vs. appending it)?
        console.log(`Overlap position found`);
        // If the inserted position overlaps with an existing position, increment the pre-existing overlapping position and all subsequent positions by 1 to make space for the inserted position
        // e.g. If we already have entries for Positions 1,2,3,4 and we want to insert an entry into position 2; the old positions update like: 1, 2+1, 3+1, 4+1
        // Which results in the positions 1, 2 (new 2), 3 (old 2), 4 (old 3), 5 (old 4)
        allData.forEach((entry, index) => {
            // console.log(`pre incr entry.nucleotidePosition, ${entry.nucleotidePosition}`);
            // For the old positions which are greater than or equal to the inserted position
            if(entry.nucleotidePosition >= modifiedNucleotidePosition) {
                // Increment their positions by 1
                entry.nucleotidePosition = entry.nucleotidePosition + 1
            }
            // console.log(`post incr entry.nucleotidePosition, ${entry.nucleotidePosition}`);
        })
    } else { // No overlapping positions; suggests that the pair was added to the end / appended
        console.log(`No overlap position found`);
    }

    await nucleotidePairData.create(allData) // Re-save the pre-existing pairs but with their updated Positions
    
    await nucleotidePairData.findByIdAndUpdate(req.params.dataPointId, req.body) // Updated the modified pair

    // Re-order the Positions just in case + if an existing pair was inserted into a higher Position, the above logic yields a gap in Position numbers, however the Order is as expected; so re-numbering the Positions eliminates gaps in Position values
    allData = await nucleotidePairData.find() // Get the consolidate data

    //Re-sort the entries by position (may still have a gap)
    // console.log(`pre allData`, allData);
    allData.sort((entry1, entry2) => entry1.nucleotidePosition - entry2.nucleotidePosition) // Sorts the array in ascending order of nucleotide Position
    // console.log(`post allData`, allData);

    // Re-number the Positions in Order (i.e. handles Position gaps; e.g. 1,2,4,5 -> 1,2,3,4)
    allData.forEach((entry, index) => {
        // console.log('pre entry.nucleotidePosition', entry.nucleotidePosition);
        entry.nucleotidePosition = index + 1
        // console.log('post entry.nucleotidePosition', entry.nucleotidePosition); 
    })

    // Update the data with their updated, no-gap Positions
    await nucleotidePairData.create(allData)

    res.redirect(`/`)
})

// DELETE request for the `/:dataPointId` route 
app.delete(`/:dataPointId`, async (req, res) => { // DELETE request
    await nucleotidePairData.findByIdAndDelete(req.params.dataPointId) // Delete the nucleotide pair

    // GET all the resulting data to update the Position values; deleting an entry creates a Position gap
    allData = await nucleotidePairData.find()

    // Re-number the positions in order
    allData.forEach((entry, index) => {
        // console.log('pre entry.nucleotidePosition', entry.nucleotidePosition);
        entry.nucleotidePosition = index + 1
        // console.log('post entry.nucleotidePosition', entry.nucleotidePosition); 
    })

    // Update the data with their updated, no-gap Positions
    await nucleotidePairData.create(allData)

    res.redirect(`/`)

})

// GET request for the `/:dataPointId` route 
app.get(`/:dataPointId`, async (req, res) => { // GET request for show route
    const allData = await nucleotidePairData.find()
    const foundDataPoint = await nucleotidePairData.findById(req.params.dataPointId) // Isolates the individual nucleotide pair to view; for pre-populating the forms with correct data

    // Determine the max Position; to make sure that the user cannot set a Position higher than 1 plus the max Position
    let maxPosition = 0
    // Run through the Positions of all the data and save the max position value
    for (const pair of allData) {
        if (pair.nucleotidePosition > maxPosition) {
            maxPosition = pair.nucleotidePosition;
        }
    }
    // console.log(`maxPosition`, maxPosition);

    res.render(`show.ejs` , {
        dataPoint: foundDataPoint,
        dataPoints: allData,
        maxPosition: maxPosition

    })
})

// Listening
const portNumber = 3001
app.listen(portNumber, () => {
    console.log(`Listening on port ${portNumber}`);
})