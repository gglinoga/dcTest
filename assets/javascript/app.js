var data2 = [{
        date: "2011-11-14T16:17:54Z",
        quantity: 2,
        total: 190,
        tip: 100,
        type: "tab"
    },
    {
        date: "2011-11-14T16:20:19Z",
        quantity: 2,
        total: 190,
        tip: 100,
        type: "tab"
    },
    {
        date: "2011-11-14T16:28:54Z",
        quantity: 1,
        total: 300,
        tip: 200,
        type: "visa"
    },
    {
        date: "2011-11-14T16:30:43Z",
        quantity: 2,
        total: 90,
        tip: 0,
        type: "tab"
    },
    {
        date: "2011-11-14T16:48:46Z",
        quantity: 2,
        total: 90,
        tip: 0,
        type: "tab"
    },
    {
        date: "2011-11-14T16:53:41Z",
        quantity: 2,
        total: 90,
        tip: 0,
        type: "tab"
    },
    {
        date: "2011-11-14T16:54:06Z",
        quantity: 1,
        total: 100,
        tip: 0,
        type: "cash"
    },
    {
        date: "2011-11-14T16:58:03Z",
        quantity: 2,
        total: 90,
        tip: 0,
        type: "tab"
    },
    {
        date: "2011-11-14T17:07:21Z",
        quantity: 2,
        total: 90,
        tip: 0,
        type: "tab"
    },
    {
        date: "2011-11-14T17:22:59Z",
        quantity: 2,
        total: 90,
        tip: 0,
        type: "tab"
    },
    {
        date: "2011-11-14T17:25:45Z",
        quantity: 2,
        total: 200,
        tip: 0,
        type: "cash"
    },
    {
        date: "2011-11-14T17:29:52Z",
        quantity: 1,
        total: 200,
        tip: 100,
        type: "visa"
    }
];

var data = [{
        date: "12/27/2012",
        http_404: 2,
        http_200: 190,
        http_302: 100
    },
    {
        date: "12/28/2012",
        http_404: 2,
        http_200: 10,
        http_302: 100
    },
    {
        date: "12/29/2012",
        http_404: 1,
        http_200: 300,
        http_302: 200
    },
    {
        date: "12/30/2012",
        http_404: 2,
        http_200: 90,
        http_302: 0
    },
    {
        date: "12/31/2012",
        http_404: 2,
        http_200: 90,
        http_302: 0
    },
    {
        date: "01/01/2013",
        http_404: 2,
        http_200: 90,
        http_302: 0
    },
    {
        date: "01/02/2013",
        http_404: 1,
        http_200: 10,
        http_302: 1
    },
    {
        date: "01/03/2013",
        http_404: 2,
        http_200: 90,
        http_302: 0
    },
    {
        date: "01/04/2013",
        http_404: 2,
        http_200: 90,
        http_302: 0
    },
    {
        date: "01/05/2013",
        http_404: 2,
        http_200: 90,
        http_302: 0
    },
    {
        date: "01/06/2013",
        http_404: 2,
        http_200: 200,
        http_302: 1
    },
    {
        date: "01/07/2013",
        http_404: 1,
        http_200: 200,
        http_302: 100
    }
];

var testData = [{
        year: 2012,
        hits: 1
    },
    {
        year: 2013,
        hits: 5
    }
]

var ndx = crossfilter(testData);

// var formatDate = d3.timeFormat("%m/%d/%Y").parse;
// data.forEach(function(d) {
// 	d.date = formatDate.parse(d.date);
//     d.total= d.http_404+d.http_200+d.http_302;
// });

var parseTime = d3.timeParse("%d-%m-%y");

data.forEach(function(d) {
	d.year = parseTime(d.year);
    d.total= d.hits
});

function print_filter(filter) {
    var f = eval(filter);
    if (typeof (f.length) != "undefined") {} else {}
    if (typeof (f.top) != "undefined") {
        f = f.top(Infinity);
    } else {}
    if (typeof (f.dimension) != "undefined") {
        f = f.dimension(function (d) {
            return "";
        }).top(Infinity);
    } else {}
    console.log(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
}
print_filter("data");


var dateDim = ndx.dimension(function(d) {return d.year;});
var hits = dateDim.group().reduceSum(function(d) {return d.hits;});
var minDate = dateDim.bottom(1)[0].year;
var maxDate = dateDim.top(1)[0].year;
console.log(minDate)
console.log(maxDate)
var hitslineChart = dc.lineChart("#chart-line-hitsperday")



hitslineChart
    .width(1000).height(400)
    .dimension(dateDim)
    .group(hits)
    .x(d3.scaleLinear()
        .domain([2010, 2020]))
    .y(d3.scaleLinear()
        .domain([0, 10]))
    .brushOn(false)
    .yAxisLabel('Hits per day');

dc.renderAll();

console.log(data)