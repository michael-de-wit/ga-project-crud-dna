const nucleotideMatchCheckbox = document.querySelector(`#nucleotideMatchCheckbox`)
const templateNucleotide = document.querySelectorAll(`.templateNucleotide`)
const codingNucleotide = document.querySelectorAll(`.codingNucleotide`)

console.log(codingNucleotide);

let RadioCodingNucleotideG = document.querySelector('input[id="codingNucleotideG"]');
let RadioCodingNucleotideC = document.querySelector('input[id="codingNucleotideC"]');
let RadioCodingNucleotideA = document.querySelector('input[id="codingNucleotideA"]');
let RadioCodingNucleotideT = document.querySelector('input[id="codingNucleotideT"]');


nucleotideMatchCheckbox.addEventListener('change', () => {
    const selectedRadioTemplateNucleotide = document.querySelector('input[name="templateNucleotide"]:checked');
    
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

templateNucleotide.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
    const selectedRadioTemplateNucleotide = document.querySelector('input[name="templateNucleotide"]:checked');
    console.log(selectedRadioTemplateNucleotide);

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

codingNucleotide.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
    const selectedRadioTemplateNucleotide = document.querySelector('input[name="templateNucleotide"]:checked');
    console.log(selectedRadioTemplateNucleotide);

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