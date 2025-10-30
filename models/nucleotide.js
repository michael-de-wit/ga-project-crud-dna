// MongoDB schema
const { default: mongoose } = require('mongoose'); // Use the Mongoose library

// Nucleotide pair schema for MongoDB
const nucleotidePairsSchema = new mongoose.Schema({

    nucleotidePosition: Number, // 1-inf
    templateNucleotide: String, // G,C,A,T
    codingNucleotide: String, // G,C,A,T
    nucleotideMatch: Boolean, // True: G<>C, A<>T; otherwise False
    dateAdded: Date,
    dateModified: Date

})

const nucleotidePairData = mongoose.model(`nucleotidePairData`, nucleotidePairsSchema)

module.exports = nucleotidePairData

