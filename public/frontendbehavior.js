const nucleotideMatchCheckbox = document.querySelector(`#nucleotideMatchCheckbox`) // Get the Nucleotide match? element
const templateNucleotide = document.querySelectorAll(`.templateNucleotide`) // Get the Template nucleotide element
const codingNucleotide = document.querySelectorAll(`.codingNucleotide`) // Get the Coding nucleotide element

let RadioCodingNucleotideG = document.querySelector('input[id="codingNucleotideG"]'); // The Coding nucleotide element with G selected 
let RadioCodingNucleotideC = document.querySelector('input[id="codingNucleotideC"]'); // The Coding nucleotide element with C selected
let RadioCodingNucleotideA = document.querySelector('input[id="codingNucleotideA"]'); // The Coding nucleotide element with A selected
let RadioCodingNucleotideT = document.querySelector('input[id="codingNucleotideT"]'); // The Coding nucleotide element with T selected

//If the user checks Nucleotide match?, then update the Coding nucleotide to match the selected Template nucleotide
nucleotideMatchCheckbox.addEventListener('change', () => { // When the user selects/deselects the Nucleotide match? checkbox
    const selectedRadioTemplateNucleotide = document.querySelector('input[name="templateNucleotide"]:checked'); // Get the Template nucleotide radio button that is currently selected
    
    // If Nucleotide match? is checked and the selected Template nucleotide is G<>C or A<>T, then change the Coding nucleotide selection to the matching nucleotide
    if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'G') {
        RadioCodingNucleotideC.checked = true
    } else if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'C') {
        RadioCodingNucleotideG.checked = true
    } else if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'A') {
        RadioCodingNucleotideT.checked = true
    } else if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'T') {
        RadioCodingNucleotideA.checked = true
    }
})

// If the Nucleotide match? checkbox is checked, then when the user makes a Template nucleotide selection, select the matching Coding nucleotide
templateNucleotide.forEach(radioButton => { // When the user selects a Template nucleotide radio button
    radioButton.addEventListener('change', () => {
    const selectedRadioTemplateNucleotide = document.querySelector('input[name="templateNucleotide"]:checked'); // Get the Template nucleotide radio button that is currently selected

    // If Nucleotide match? is checked and the selected Template nucleotide is G<>C or A<>T, then change the Coding nucleotide selection to the matching nucleotide
    if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'G') {
        RadioCodingNucleotideC.checked = true
    } else if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'C') {
        RadioCodingNucleotideG.checked = true
    } else if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'A') {
        RadioCodingNucleotideT.checked = true
    } else if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'T') {
        RadioCodingNucleotideA.checked = true
    }
    })
})

// If the Nucleotide match? checkbox is checked, then when the user tries to make a Coding nucleotide selection, keep the selection as the match to the Template nucleotide
codingNucleotide.forEach(radioButton => { // When the user selects a Coding nucleotide radio button
    radioButton.addEventListener('change', () => {
    const selectedRadioTemplateNucleotide = document.querySelector('input[name="templateNucleotide"]:checked'); // Get the Template nucleotide radio button that is currently selected

    // If Nucleotide match? is checked and the selected Template nucleotide is G<>C or A<>T, then change the Coding nucleotide selection to the matching nucleotide
    if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'G') {
        RadioCodingNucleotideC.checked = true
    } else if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'C') {
        RadioCodingNucleotideG.checked = true
    } else if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'A') {
        RadioCodingNucleotideT.checked = true
    } else if(nucleotideMatchCheckbox.checked === true && selectedRadioTemplateNucleotide.value == 'T') {
        RadioCodingNucleotideA.checked = true
    }
    })
})