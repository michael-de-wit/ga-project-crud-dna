const nucleotideMatchCheckbox = document.querySelector(`#nucleotideMatchCheckbox`)
const codingNucleotideInput = document.querySelector(`#codingNucleotideInput`)


nucleotideMatchCheckbox.addEventListener('click', () => {
    if(nucleotideMatchCheckbox.checked === false) {
        codingNucleotideInput.readOnly = false
        console.log(codingNucleotideInput.readonly);
    } else {
        codingNucleotideInput.readOnly = true
        console.log(codingNucleotideInput.readonly);
    };
})
