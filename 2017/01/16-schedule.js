document.addEventListener("DOMContentLoaded", function() {
  var width = 640,
      height = 480,
      chart = d3.select('#schedule-2017-01-16').append('svg')
                .attr('width', width)
                .attr('height', height);

  var train_routes = [
    {
      id: 'A',
      schedule: [
        {
          stop: 'Bleptown',
          arrival: '00:00',
          departure: '00:05'
        }, {
          stop: 'Blighttown',
          arrival: '00:30',
          departure: '00:35'
        }, {
          stop: 'Coolville',
          arrival: '01:05',
          departure: '01:10'
        }
      ]
    }, {
      id: 'B',
      schedule: [
        {
          stop: 'Bleptown',
          arrival: '02:00',
          departure: '02:05'
        }, {
          stop: 'Blighttown',
          arrival: '02:32',
          departure: '02:40'
        }, {
          stop: 'Coolville',
          arrival: '03:15',
          departure: '03:30'
        }
      ]
    }, {
      id: 'C',
      schedule: [
        {
          stop: 'Bleptown',
          arrival: '03:00',
          departure: '03:05'
        }, {
          stop: 'Blighttown',
          arrival: '04:30',
          departure: '04:35'
        }, {
          stop: 'Coolville',
          arrival: '05:25',
          departure: '05:30'
        }
      ]
    }
  ];

  var stops_list = train_routes[0].schedule.map(function(i) { return i.stop; });

  var y_scale = d3.scaleLinear()
    .domain([0, stops_list.length])
    .range([0, height])

  var location_gridlines = chart.append('g')

  location_gridlines.selectAll('line')
    .data(stops_list)
    .enter().append('line')
    .attr('x1', 50)
    .attr('y1', function(d, i) { return y_scale(i) + 10; })
    .attr('x2', width)
    .attr('y2', function(d, i) { return y_scale(i) + 10; })
    .attr('stroke', '#999')

  location_gridlines.selectAll('text')
    .data(stops_list)
    .enter().append('text')
    .attr('x', 0)
    .attr('y', function(d, i) { return y_scale(i) + 10; })
    .text(Object)

  var trips_list = train_routes.map(function(route) {
    var pairs = [];
    for (var i = 0; i < route.schedule.length - 1; i++) {
      pairs.push([route.schedule[i].departure, route.schedule[i+1].arrival]);
    }
    return pairs;
  });

  var trip_lines = chart.append('g')

  var time_scale = d3.scaleTime()
    .domain([new Date(2017, 01, 01, 0, 00), new Date(2017, 01, 01, 23, 00)])
    .range([55, width])

  function apply_time_scale(time) {
    let hours = parseInt(time.split(':')[0]),
        minutes = parseInt(time.split(':')[1]);
    return new Date(2017, 01, 01, hours, minutes);
  }

  trip_lines.selectAll('g')
    .data(trips_list)
    .enter().append('g')
    .selectAll('line')
    .data(Object)
    .enter().append('line')
    .attr('x1', function(d, i) { return time_scale(apply_time_scale(d[0])); })
    .attr('y1', function(d, i) { return y_scale(i) + 10; })
    .attr('x2', function(d, i) { return time_scale(apply_time_scale(d[1])); })
    .attr('y2', function(d, i) { return y_scale(i + 1) + 10; })
    .attr('stroke', 'black')

});
