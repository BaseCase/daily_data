document.addEventListener("DOMContentLoaded", function() {
  var width = 640,
      height = 480,
      chart = d3.select('#intro-to-geo-2017-02-04').append('svg')
                .attr('width', width)
                .attr('height', height);

  var albers_projection = d3.geoAlbers()
    .scale(300)
    .center([25, 25]);
  var path = d3.geoPath(albers_projection);

  chart.append('path')
  .datum(usa_json)
    .attr('stroke', 'black')
    .attr('fill', 'white')
    .attr('d', path);
});
