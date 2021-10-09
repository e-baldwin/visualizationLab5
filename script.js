/*d3.csv('coffee-house-chains.csv').then(data=>{
	console.log('coffee-house-chains', data);
    data.forEach(function(d) {
        d.stores = +d.stores;
        d.revenue = +d.revenue;
        
        
     });*/
     //console.log("coffeehouse", data);

    let type = document.querySelector("#updates").value;
    
     console.log(type);

    const margin = ({top: 50, right: 40, bottom: 50, left: 80})
    const width = 700 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom; 

     var svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 
    
    const xScale = d3
        .scaleBand()
        .rangeRound([0,width])
        //.domain(data.map(d => d.company))
        .paddingInner(0.1)
        //console.log('xScale', xScale);

    const yScale = d3
        .scaleLinear()
        //.domain([0,d3.max(data, function(d) {return d.stores;})])//[d3.min(data, function(d){return d.stores;})
        .rangeRound([height,0])

    

    
    /*const yAxis =  d3.axisLeft()
        .scale(yScale)
    
    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);
    
    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5, "s")
    
    // Draw the axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis); */
    
    svg.append("text")
        .attr("class", "axisLabel")
        .attr("text-anchor", "end")
        .attr("x", 300)
        .attr("y", height + 35)
        .text("Company");
    /*svg.append("text")
        .attr("class", "axisLabel")
        .attr("text-anchor", "end")
        .attr("x", -140)
        .attr("y", -55)
        .attr("transform", "rotate(-90)")
        .text("Stores");*/

    

//})


function update(data, type){
    
    xScale.domain(data.map(d => d.company))

	yScale.domain([0,d3.max(data, function(d) {return d[type];})])

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5, "s")
    const yAxis =  d3.axisLeft()
        .scale(yScale)
   

    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);


    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    
    svg.append("text")
        .attr("class", "axisLabel")
        .attr("text-anchor", "end")
        .attr("x", -140)
        .attr("y", -55)
        .attr("transform", "rotate(-90)")
        .text("yaxis")    

	var bar = svg.selectAll("rect")
        .data(data)
       /* .enter()
        .append("rect")
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){return height - yScale(d[type]);})
            .attr("x", function(d){return xScale(d.company);})
            .attr("y", function(d){return yScale(d[type]);})
            .style("fill", d3.color("blue"))*/
    
        
       
    bar
        .enter().append("rect")
        .merge(bar)
        .transition()
        .duration(1000)
        //.attr('x',end)
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){return height - yScale(d[type]);})
        .attr("x", function(d){return xScale(d.company);})
        .attr("y", function(d){return yScale(d[type]);})
        .style("fill", d3.color("blue"))
    
    bar
        .exit()
        .remove(); 

    
}
d3.csv('coffee-house-chains.csv').then(data=>{
    //let type = document.querySelector("#updates").value;
        //console.log(type);
    
	//console.log('coffee-house-chains', data);
    data.forEach(function(d) {
        d.stores = +d.stores;
        d.revenue = +d.revenue;
        
        
     });
     update(data,type);
    });

