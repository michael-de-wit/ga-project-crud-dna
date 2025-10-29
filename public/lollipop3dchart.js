// Load the data from the script tag
const dataArrayForLollipop3dAsString = document.getElementById('dataArray').innerText;
const dataDots = JSON.parse(dataArrayForLollipop3dAsString);
// console.log(`pre-sort`, dataDots);

// Sorts dataDots by nucleotidePosition using array's sort method -- so that the graphic will render in order of nucleotide position
dataDots.sort((entry1, entry2) => entry1.nucleotidePosition - entry2.nucleotidePosition);
console.log(`post-sort`, dataDots);

// Select the A-Frame scene
let scene = d3.select("a-scene")
    // .append("a-sphere")
    // .attr("radius", 0.2) // Set a fixed radius for each sphere
    // .attr("position", "-0.5 1.75 -1")
    // .attr("color", `black`)


// Define scales to map data values to A-Frame coordinates
// The domain should cover the full range of your data.
// The range should define the coordinate space in your A-Frame scene.
const x_scale = d3.scaleLinear()
    .domain([-100, 100])
    .range([-5, 5]);

const y_scale = d3.scaleLinear() // Creates band scale x-axis - i.e. maps categorical range to a continuous range
            .range([1, 5]) // On-screen width
            .domain([0, 100]) // Data-perspective width; as wide as the number of x-axis categories

const z_scale = d3.scaleLinear()
    .domain([-100, 100])
    .range([4, -6]);

scene.append("a-entity")
    .attr("line","start: 0 1 -1; end: 5 1 -1; color: red")

scene.append("a-entity")
    .attr("line","start: 0 1 -1; end: 0 6 -1; color: green")

scene.append("a-entity")
    .attr("line","start: 0 1 -1; end: 0 1 -6; color: blue")

// Template nucleotides
scene.selectAll("a-sphere.starting")
    .data(dataDots)
    .enter()
    .append("a-sphere")
    .attr("radius", 0.2) // Set a fixed radius for each sphere
    // .attr("position", "0 1 -1")
    .attr('position', function(d, i) {
            let x1PosOffset = i * 45
            let x1ConvertedAngleToRadians = x1PosOffset * (Math.PI / 180);
            let x1Sine = Math.cos(x1ConvertedAngleToRadians)
            let xPos1 = -10 * x1Sine
            let x1 = x_scale(xPos1);
            
            let yPos1 = i * 4
            let y1 = y_scale(yPos1);
            
            let z1PosOffset = i * 45
            let z1ConvertedAngleToRadians = z1PosOffset * (Math.PI / 180);
            let z1Sine = Math.sin(z1ConvertedAngleToRadians)
            let zPos1 = -10 * z1Sine
            let z1 = z_scale(zPos1);

            return `${x1} ${y1} ${z1}`;
          })
    .attr("color", function(d, i) {
        if (d.templateNucleotide === 'G') {
            return "#587156"
        } else if (d.templateNucleotide === 'C') {
            return "#B62E3B"
        } else if (d.templateNucleotide === 'A') {
            return "#AFA77B"
        } else if (d.templateNucleotide === 'T') {
            return "#EAC6E6"
        }
        
    });

// Coding nucleotides
scene.selectAll("a-sphere.ending")
    .data(dataDots)
    .enter()
    .append("a-sphere")
    .attr("radius", 0.2) // Set a fixed radius for each sphere
    // .attr("position", "0 1 -1")
    .attr('position', function(d, i) {

            let x2PosOffset = i * 45
            let x2ConvertedAngleToRadians = x2PosOffset * (Math.PI / 180);
            let x2Sine = Math.cos(x2ConvertedAngleToRadians)
            let xPos2 = 10 * x2Sine
            let x2 = x_scale(xPos2);

            let yPos2 = i * 4
            let y2 = y_scale(yPos2);

            let z2PosOffset = i * 45
            let z2ConvertedAngleToRadians = z2PosOffset * (Math.PI / 180);
            let z2Sine = Math.sin(z2ConvertedAngleToRadians)
            let zPos2 = 10 * z2Sine
            let z2 = z_scale(zPos2);

            return `${x2} ${y2} ${z2}`;
            
        })
    .attr("color", function(d, i) {
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

// let zPosOffset = 0


scene.selectAll("a-entity.lollipopstick")
.data(dataDots)
.enter()
.append("a-entity")
    // .attr("line","start: 0 1 -1; end: 2 2 -2; color: black")
    .attr("line", function(d, i) {
        
            let yPos1 = i * 4
            let y1 = y_scale(yPos1);
        
            let yPos2 = i * 4
            let y2 = y_scale(yPos2);
        
            let x1PosOffset = i * 45
            let x1ConvertedAngleToRadians = x1PosOffset * (Math.PI / 180);
            let x1Sine = Math.cos(x1ConvertedAngleToRadians)
            let xPos1 = -10 * x1Sine
            let x1 = x_scale(xPos1);

            let x2PosOffset = i * 45
            let x2ConvertedAngleToRadians = x2PosOffset * (Math.PI / 180);
            let x2Sine = Math.cos(x2ConvertedAngleToRadians)
            let xPos2 = 10 * x2Sine
            let x2 = x_scale(xPos2);
            
            let z1PosOffset = i * 45
            let z1ConvertedAngleToRadians = z1PosOffset * (Math.PI / 180);
            let z1Sine = Math.sin(z1ConvertedAngleToRadians)
            let zPos1 = -10 * z1Sine
            let z1 = z_scale(zPos1);

            let z2PosOffset = i * 45
            let z2ConvertedAngleToRadians = z2PosOffset * (Math.PI / 180);
            let z2Sine = Math.sin(z2ConvertedAngleToRadians)
            let zPos2 = 10 * z2Sine
            let z2 = z_scale(zPos2);

            // console.log(`start: ${x1} ${y1} ${z1}; end: ${x2} ${y2} ${z2}; color: black`);

            return `start: ${x1} ${y1} ${z1}; end: ${x2} ${y2} ${z2}; color: black`
        })

// Add axis lines for better visualization of the 3D space
// X-axis
// scene.append("a-entity").attr("line", "start: -60 0 0; end: 60 0 0; color: #FFF;");
// // Y-axis
// scene.append("a-entity").attr("line", "start: 0 -60 0; end: 0 60 0; color: #FFF;");
// // Z-axis
// scene.append("a-entity").attr("line", "start: 0 0 -60; end: 0 0 60; color: #FFF;");

// Navigation additions from: https://claude.ai/chat/1ca4def1-b7d7-4ea6-b109-4e75ed1de386
AFRAME.registerComponent('vertical-controls', {
            init: function() {
                this.moveSpeed = 0.1;
                this.keys = {};
                
                // Track key states
                window.addEventListener('keydown', (e) => {
                    this.keys[e.key.toLowerCase()] = true;
                });
                
                window.addEventListener('keyup', (e) => {
                    this.keys[e.key.toLowerCase()] = false;
                });
            },
            
            tick: function() {
                let pos = this.el.object3D.position;
                
                // Q key to move up
                if (this.keys['q']) {
                    pos.y += this.moveSpeed;
                }
                
                // E key to move down
                if (this.keys['e']) {
                    pos.y -= this.moveSpeed;
                }
            }
        });

        // Add the component to the camera rig
        document.querySelector('#rig').setAttribute('vertical-controls', '');