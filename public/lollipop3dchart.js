// Load the data from the data array
const dataArrayForLollipop3dAsString = document.getElementById('dataArray').innerText;
const dataDots = JSON.parse(dataArrayForLollipop3dAsString); // Make sure the data is in JSON format
// console.log(`pre-sort`, dataDots);

// Just in case (sorting also happens in server.js), sort dataDots by nucleotidePosition using array's sort method -- so that the graphic will render in order of nucleotide position
dataDots.sort((entry1, entry2) => entry1.nucleotidePosition - entry2.nucleotidePosition);
// console.log(`post-sort`, dataDots);

// Select the A-Frame scene
let scene = d3.select("a-scene")


// Define scales to map data values to A-Frame coordinates
// Domain refers to the data perspective
// Range refers to the A-frame coordinate space

// X-axis scale (left-right)
const x_scale = d3.scaleLinear()
    .domain([-100, 100])
    .range([-5, 5]);

// Y-axis scale (vertical axis)
const y_scale = d3.scaleLinear() // Creates band scale x-axis - i.e. maps categorical range to a continuous range
            .range([1, 5]) // On-screen width
            .domain([0, 100]) // Data-perspective width; as wide as the number of x-axis categories

// Z-axis scale (front-back)
const z_scale = d3.scaleLinear()
    .domain([-100, 100])
    .range([4, -6]);


// Create X-axis line (left-right)
scene.append("a-entity")
    .attr("line","start: 0 1 -1; end: 5 1 -1; color: red")

// Create Y-axis line (vertical)
scene.append("a-entity")
    .attr("line","start: 0 1 -1; end: 0 6 -1; color: green")

// Create Z-axis line (front-back)
scene.append("a-entity")
.attr("line","start: 0 1 -1; end: 0 1 -6; color: blue")


// Template nucleotides
templateNucleotideSpheres = scene.selectAll("a-sphere.starting")
    .data(dataDots) // Bind data
    .enter()
    .append("a-sphere") // Use the a-sphere A-frame primitive
    .attr("radius", 0.2) // Set a fixed radius for each sphere
    .attr('position', function(d, i) { // Set the xyz position for the sphere
        let x1PosOffset = i * 45 // To set the X position corresponding to a 45 degree movement around a circle; increase each sphere by 45 degs
        let x1ConvertedAngleToRadians = x1PosOffset * (Math.PI / 180); // Convert the degrees around the circle to radians for the sin/cos calculation
            let x1Sine = Math.cos(x1ConvertedAngleToRadians) // Calculate the X position corresponding to the 45 degree movement around the circle
            let xPos1 = -10 * x1Sine // Scale the X position in terms of the data space; opposite direction than the opposing nucleotide
            let x1 = x_scale(xPos1); // Scale the X position in terms of the visual space; opposite direction than the opposing nucleotide
            
            let yPos1 = i * 4 // Increment + scale the Y (vertical) position in the data space
            let y1 = y_scale(yPos1); // Scale the Y (vertical) position in the visual space
            
            let z1PosOffset = i * 45 // To set the Z position corresponding to a 45 degree movement around a circle; increase each sphere by 45 degs
            let z1ConvertedAngleToRadians = z1PosOffset * (Math.PI / 180); // Convert the degrees around the circle to radians for the sin/cos calculation
            let z1Sine = Math.sin(z1ConvertedAngleToRadians) // Calculate the Z position corresponding to the 45 degree movement around the circle
            let zPos1 = -10 * z1Sine // Scale the Z position in terms of the data space; opposite direction than the opposing nucleotide
            let z1 = z_scale(zPos1); // Scale the Z position in terms of the visual space; opposite direction than the opposing nucleotide

            return `${x1} ${y1} ${z1}`;
          })
    .attr("color", function(d, i) { // Assign a different color per G,C,A,T type
        if (d.templateNucleotide === 'G') {
            return "#587156"
        } else if (d.templateNucleotide === 'C') {
            return "#B62E3B"
        } else if (d.templateNucleotide === 'A') {
            return "#AFA77B"
        } else if (d.templateNucleotide === 'T') {
            return "#EAC6E6"
        }
    })
    
// Coding nucleotides
scene.selectAll("a-sphere.ending")
    .data(dataDots) // Bind data
    .enter()
    .append("a-sphere") // Use the a-sphere A-frame primitive
    .attr("radius", 0.2) // Set a fixed radius for each sphere
    // .attr("position", "0 1 -1")
    .attr('position', function(d, i) { // Set the xyz position for the sphere

            let x2PosOffset = i * 45 // To set the X position corresponding to a 45 degree movement around a circle; increase each sphere by 45 degs
            let x2ConvertedAngleToRadians = x2PosOffset * (Math.PI / 180); // Convert the degrees around the circle to radians for the sin/cos calculation
            let x2Sine = Math.cos(x2ConvertedAngleToRadians) // Calculate the X position corresponding to the 45 degree movement around the circle
            let xPos2 = 10 * x2Sine // Scale the X position in terms of the data space; opposite direction than the opposing nucleotide
            let x2 = x_scale(xPos2); // Scale the X position in terms of the visual space; opposite direction than the opposing nucleotide

            let yPos2 = i * 4 // Increment + scale the Y (vertical) position in the data space
            let y2 = y_scale(yPos2); // Scale the Y (vertical) position in the visual space

            let z2PosOffset = i * 45 // To set the Z position corresponding to a 45 degree movement around a circle; increase each sphere by 45 degs
            let z2ConvertedAngleToRadians = z2PosOffset * (Math.PI / 180); // Convert the degrees around the circle to radians for the sin/cos calculation
            let z2Sine = Math.sin(z2ConvertedAngleToRadians) // Calculate the Z position corresponding to the 45 degree movement around the circle
            let zPos2 = 10 * z2Sine // Scale the Z position in terms of the data space; opposite direction than the opposing nucleotide
            let z2 = z_scale(zPos2); // Scale the Z position in terms of the visual space; opposite direction than the opposing nucleotide

            return `${x2} ${y2} ${z2}`;
            
        })
    .attr("color", function(d, i) { // Assign a different color per G,C,A,T type
        if (d.codingNucleotide === 'G') {
            return "#587156"
        } else if (d.codingNucleotide === 'C') {
            return "#B62E3B"
        } else if (d.codingNucleotide === 'A') {
            return "#AFA77B"
        } else if (d.codingNucleotide === 'T') {
            return "#EAC6E6"
        }
    });

scene.selectAll("a-entity.lollipopstick")
.data(dataDots)
.enter()
.append("a-entity")
    // .attr("line","start: 0 1 -1; end: 2 2 -2; color: black")
    .attr("line", function(d, i) {
        
            // Y position connecting to the Template nucleotide
            let yPos1 = i * 4
            let y1 = y_scale(yPos1);
        
            // Y position connecting to the Coding nucleotide
            let yPos2 = i * 4
            let y2 = y_scale(yPos2);
        
            // X position connecting to the Template nucleotide
            let x1PosOffset = i * 45
            let x1ConvertedAngleToRadians = x1PosOffset * (Math.PI / 180);
            let x1Sine = Math.cos(x1ConvertedAngleToRadians)
            let xPos1 = -10 * x1Sine
            let x1 = x_scale(xPos1);

            // X position connecting to the Coding nucleotide
            let x2PosOffset = i * 45
            let x2ConvertedAngleToRadians = x2PosOffset * (Math.PI / 180);
            let x2Sine = Math.cos(x2ConvertedAngleToRadians)
            let xPos2 = 10 * x2Sine
            let x2 = x_scale(xPos2);
            
            // Z position connecting to the Template nucleotide
            let z1PosOffset = i * 45
            let z1ConvertedAngleToRadians = z1PosOffset * (Math.PI / 180);
            let z1Sine = Math.sin(z1ConvertedAngleToRadians)
            let zPos1 = -10 * z1Sine
            let z1 = z_scale(zPos1);

            // Z position connecting to the Coding nucleotide
            let z2PosOffset = i * 45
            let z2ConvertedAngleToRadians = z2PosOffset * (Math.PI / 180);
            let z2Sine = Math.sin(z2ConvertedAngleToRadians)
            let zPos2 = 10 * z2Sine
            let z2 = z_scale(zPos2);

            return `start: ${x1} ${y1} ${z1}; end: ${x2} ${y2} ${z2}; color: black`
        })


// A-frame navigation additions from: https://claude.ai/chat/1ca4def1-b7d7-4ea6-b109-4e75ed1de386
AFRAME.registerComponent('vertical-controls', {
            init: function() {
                this.moveSpeed = 0.1;
                this.keys = {};
                
                // Enable upward movement with the keyboard 
                window.addEventListener('keydown', (e) => {
                    this.keys[e.key.toLowerCase()] = true;
                });
                
                // Enable downward movement with the keyboard 
                window.addEventListener('keyup', (e) => {
                    this.keys[e.key.toLowerCase()] = false;
                });
            },
            
            tick: function() {
                let pos = this.el.object3D.position;
                
                // Q key to move upward
                if (this.keys['q']) {
                    pos.y += this.moveSpeed;
                }
                
                // E key to move downward
                if (this.keys['e']) {
                    pos.y -= this.moveSpeed;
                }
            }
        });

        // Add the component to the camera rig
        document.querySelector('#rig').setAttribute('vertical-controls', '');