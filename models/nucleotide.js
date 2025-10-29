const { default: mongoose } = require('mongoose');

const nucleotidePairsSchema = new mongoose.Schema({

    nucleotidePosition: Number,
    templateNucleotide: String,
    codingNucleotide: String,
    nucleotideMatch: Boolean,
    dateAdded: Date,
    dateModified: Date

})

const nucleotidePairData = mongoose.model(`nucleotidePairData`, nucleotidePairsSchema)

module.exports = nucleotidePairData

