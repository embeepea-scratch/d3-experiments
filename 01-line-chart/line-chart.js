$(document).ready(function() {

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y%m").parse;

    var x = d3.time.scale()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

    var line_avg = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.avg); });

    var line_val = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.val); });

    var svg = d3.select("#vis").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("co2.csv", function(error, data) {
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.val = +d.val;
            d.avg = +d.avg;
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));
        //y.domain(d3.extent(data, function(d) { return d.avg; }));
        y.domain([300,400]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Price ($)");

        svg.append("path")
            .datum(data)
            .attr("class", "line-avg")
            .attr("d", line_avg);

        svg.append("path")
            .datum(data)
            .attr("class", "line-val")
            .attr("d", line_val);
    });

});
