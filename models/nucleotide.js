const { default: mongoose } = require('mongoose');

const nucleotidePairsSchema = new mongoose.Schema({
    templateNucleotide: String,
    codingNucleotide: String,
})

const nucleotidePairData = mongoose.model(`nucleotidePairData`, nucleotidePairsSchema)

module.exports = nucleotidePairData