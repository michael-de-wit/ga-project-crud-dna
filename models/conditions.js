const { default: mongoose } = require('mongoose');

const conditionStateComparisonSchema = new mongoose.Schema({
    condition: String,
    xPos1: Number,
    xPos2: Number,
})

const conditionStateComparisonData = mongoose.model(`conditionStateComparisonData`, conditionStateComparisonSchema)

module.exports = conditionStateComparisonData