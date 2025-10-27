const dataArrayAsString = document.getElementById('dataArray').innerText;
console.log(dataArrayAsString);
const data = JSON.parse(dataArrayAsString);
console.log(data);

// Modifie₫ from https://d3-graph-gallery.com/graph/lollipop_cleveland.html
// Set dimensions and margins
const margin = {top: 10, right: 30, bottom: 30, left: 30};
const width = 460 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

// Append SVG object
const svg = d3.select("#condition-state-comparison-lollipop-visualization")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Add X axis
const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

// Add Y axis
const y = d3.scaleBand()
    .range([0, height])
    .domain(data.map(d => d.condition))
    .padding(1);

svg.append("g")
    .call(d3.axisLeft(y));

// Add lines
svg.selectAll(".line")
    .data(data)
    .join("line")
    .attr("class", "line")
    .attr("x1", d => x(d.xPos1))
    .attr("x2", d => x(d.xPos2))
    .attr("y1", d => y(d.condition))
    .attr("y2", d => y(d.condition))
    .attr("stroke", "grey")
    .attr("stroke-width", "1px");

// Add circles for variable 1
svg.selectAll(".circle1")
    .data(data)
    .join("circle")
    .attr("class", "circle1")
    .attr("cx", d => x(d.xPos1))
    .attr("cy", d => y(d.condition))
    .attr("r", 6)
    .style("fill", "#69b3a2");

// Add circles for variable 2
svg.selectAll(".circle2")
    .data(data)
    .join("circle")
    .attr("class", "circle2")
    .attr("cx", d => x(d.xPos2))
    .attr("cy", d => y(d.condition))
    .attr("r", 6)
    .style("fill", "#4C4082");


