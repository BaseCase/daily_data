document.addEventListener("DOMContentLoaded", function() {
  var width = 640,
      height = 480,
      length = 30,
      chart = d3.select('#raindrops-2017-01-15').append('svg')
                .attr('width', width)
                .attr('height', height);

  chart.attr('style', 'background-color: #ddd')

  function random_raindrop() {
    return {
      id: Math.random() * 10000,
      pos: Math.floor(Math.random() * length)
    }
  }

  var x_scale = d3.scaleLinear()
    .domain([0, length])
    .range([0, width])

  var r_scale = d3.scaleLinear()
    .domain([length, 0])
    .range([0, 5])

  var data = d3.range(length).map(random_raindrop);

  function draw_rain() {
    var raindrops = chart.selectAll('circle')
      .data(data, function(d) { return d.id; })

    raindrops.enter().append('circle')
      .attr('cx', function(d, i) { return x_scale(d.pos); })
      .attr('cy', 0)
      .attr('r', function(d, i) { return r_scale(i); })
      .attr('fill', 'blue')

    raindrops
      .transition()
      .attr('r', function(d, i) { return r_scale(i); })

    raindrops.exit()
      .transition()
      .attr('cy', height + 20)
      .remove()

    data.shift();
    data.push(random_raindrop());
  }

  setInterval(draw_rain, 250)
});
