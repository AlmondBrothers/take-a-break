app.directive('chart', function () {
  const link = (scope, el) => {
    const data = scope.data;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const element = el[0];
    const width = element.clientWidth;
    const height = element.clientHeight;
    const min = Math.min(width, height);
    const pie = d3.pie().sort(null);
    
    const arc = d3.arc()
      .outerRadius(min / 2 * 0.9)
      .innerRadius(min / 2 * 0.7);
    
    const svg = d3.select(element).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`); 
    
    let arcs = svg.selectAll('path').data(pie(data))
      .enter().append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i));
        
    const type = svg.append('text')
      .attr('dy', '-1em')
      .style('text-anchor', 'middle')
      .style('font-size', '40px')
      .attr('class', 'inside');
          
    const title = svg.append('text')
      .attr('dy', '.5em')
      .style('text-anchor', 'middle')
      .style('font-size', '80px')
      .attr('class', 'inside');


    scope.$watch('info', data => {
      title.text(data.title);
      type.text(data.type);
    }, true);

    scope.$watch('data', data => {
      const duration = 750;
      arcs = arcs.data(pie(data));
      arcs.transition()
        .duration(duration)
        .attrTween('d', arcTween);

      arcs.enter()
        .append('path')
        .attr('fill', (d, i) => color(i))
        .each(d => this._current = { startAngle: 2 * Math.PI, endAngle: 2 * Math.PI })
        .transition()
        .duration(duration)
        .attrTween('d', arcTween);
    });

    function arcTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(0);
      return t => arc(i(t));
    }
  };

  return { link, Restrict: 'E', scope: { data: '=', info: '=' } };
});
