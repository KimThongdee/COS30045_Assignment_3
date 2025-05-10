function init() {
    const w = 900; // Wider width
    const h = 400; // Taller height
    const barPadding = 5;

    d3.csv("OECD Dataset.csv").then(function(data) {
        const dataset = data.map(d => ({
            year: +d.Year,
            country: d.Country,
            rate: +d.Rate
        }));

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        const xScale = d3.scaleBand()
            .domain(dataset.map((d, i) => i))
            .range([0, w])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d.rate)])
            .nice()
            .range([h - 40, 20]); // leave room for text above bars

        // Add bars
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(i))
            .attr("y", d => yScale(d.rate))
            .attr("width", xScale.bandwidth())
            .attr("height", d => h - 40 - yScale(d.rate))
            .attr("fill", d => d.country === "Australia" ? "steelblue" : "tomato");

        // Add values on bars
        svg.selectAll("text.values")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class", "values")
            .text(d => d.rate)
            .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.rate) - 8)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#000");

        // Add labels (year)
        svg.selectAll("text.labels")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class", "labels")
            .text(d => `${d.year} (${d.country === "Australia" ? "AUS" : "US"})`)
            .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr("y", h - 20)
            .attr("text-anchor", "middle")
            .attr("font-size", "11px")
            .attr("fill", "#333");
    });
}

window.onload = init;
