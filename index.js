// import * as d3 from 'd3'
const margin = {top:20,left:50,right:20,bottom:50}
let width= 700
let height= 600

const svg = d3.select('#canvas')
            .append('svg')
            .attr('width',width)
            .attr('height',height)
            
         let g = svg.append('g')
            // .attr('transform', `translate(${margin.left},${margin.top})`)

let circles0= g.selectAll('circles')
                .data(data0).enter()

let x = d3.scaleLinear()
        .domain([d3.min(data0, d=>d.gpa*.90), 
                d3.max(data0, d=>d.gpa*1.1)])
        .range([margin.left, width-margin.right])

let y = d3.scaleLinear()
        .domain([d3.min(data0, d=>d.height*.90), 
                d3.max(data0, d=>d.height*1.1)])
        .range([ height-margin.bottom, margin.top])

let xAxisCall= d3.axisBottom(x).ticks('15');
let xAxis= svg.append('g')
            .call(xAxisCall)
            .attr('transform', `translate(0, ${height-margin.bottom})`)

svg.append('text')
    .text('Grade')
    .attr('transform', `translate(${width/2},${height-margin.bottom/3})`)

let yAxisCall = d3.axisLeft(y).ticks('5')
let yAxis= svg.append('g')
            .call(yAxisCall)
            .attr('transform', `translate(${margin.left},0)`)

circles0.append('circle')
                .attr('cx',d=>x(d.gpa))
                .attr('cy',d=>y(d.height))
                .attr('r',7)
                .attr('fill','green')
circles0.append('text')
        .text( d=>'('+d.gpa+' , '+d.height+')')
        .attr('x',d=>x(d.gpa)+7 )
        .attr('y',d=>y(d.height)+7)
        .attr('font-size',10)

let gaugeData= {'data':80}

let chart = c3.generate({
    bindto:'#chart1',
    data:{
        json:gaugeData,
        type:'gauge',
    },
    gauge:{
        label:{format: (value,ratio)=>value + '%'},
        min:0,
        max:100,
        width:25,
        // units:'%'
    }
})

d3.interval(()=>{
    let newValue = Math.floor(100*Math.random());
    let newData = {'data':newValue};
    chart.load({
        json:newData
    })
}, 2000)