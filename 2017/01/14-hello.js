document.addEventListener("DOMContentLoaded", function() {
  var width = 640,
      height = 480,
      chart = d3.select('#hello-2017-01-14').append('svg')
                .attr('width', width)
                .attr('height', height);

  chart.style('background-color', '#cec39e');

  var stats = [4, 8, 1, 3, 4, 9, 2, 2, 6];
  var max = 10,
      min = 0;

  var x_scale = d3.scaleLinear()
    .domain([0, stats.length])
    .range([20, width])

  var y_scale = d3.scaleLinear()
    .domain([min, max])
    .range([height, 0])

  var y_ticks_group = chart.append('g');
  y_ticks_group.selectAll('line')
    .data(y_scale.ticks(5))
    .enter().append('line')
    .attr('x1', 0)
    .attr('y1', function(d) { return y_scale(d); })
    .attr('x2', width)
    .attr('y2', function(d) { return y_scale(d); })
    .attr('stroke', '#eee')
    .attr('stroke-width', '.5px')

  var x_ticks_group = chart.append('g');
  x_ticks_group.selectAll('line')
    .data(x_scale.ticks(10))
    .enter().append('line')
    .attr('x1', function(d, i) { return x_scale(i); })
    .attr('y1', 0)
    .attr('x2', function(d, i) { return x_scale(i); })
    .attr('y2', height)
    .attr('stroke', '#eee')
    .attr('stroke-width', '.5px')

  var line = d3.line()
    .x(function(d, i) { return x_scale(i); })
    .y(function(d, i) { return y_scale(d); })

  chart.selectAll('path')
    .data([stats])
    .enter().append('path')
    .attr('d', line)
    .attr('stroke', 'black')
    .attr('stroke-width', '4px')
    .attr('fill-opacity', 0)

  chart.selectAll('circle')
    .data(stats)
    .enter().append('circle')
    .attr('cx', function(d, i) { return x_scale(i); })
    .attr('cy', function(d, i) { return y_scale(d); })
    .attr('r', 7)
    .attr('stroke', '#fff')
    .attr('stroke-width', '3px')
    .attr('fill', '#77c')
    .on('mouseover', function() { d3.select(this).attr('r', 10).attr('fill', '#c33'); })
    .on('mouseout', function() { d3.select(this).attr('r', 7).attr('fill', '#77c'); })
});
