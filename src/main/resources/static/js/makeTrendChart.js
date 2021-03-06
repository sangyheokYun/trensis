var searchWord, compareWord, date;
var dateArray, valueArray;
var trendsData;

function setDateCompareWord(){
    var dateIndex = document.getElementById("dateSelect").options.selectedIndex;
    date = document.getElementById("dateSelect").options[dateIndex].value;
    searchWord = $('h1#word').text();
    compareWord = document.getElementById("cpword").value;

    //console.log(date + "_" + searchWord);
    if(!compareWord){
        getTrendsValue();
    } else{
        getTrendsCompareValue();
    }

}

function getTrendsValue(){
    //console.log("Client(JS) : getTrendsValue - 검색량 추이");
    $.ajax({
        url: "/getTrendsValue",
        type: "GET",
        data: {
            searchWord:searchWord,
            date:date,
        },
        beforeSend: function () {
            //console.log("Client(JS) : getTrendsValue - ajax통신중");
            $('#chart_trend').hide();
            $('#searchChartLoadingImg').show().fadeIn('fast');
        },
        success: function (trends){
            const keys = Object.keys(trends);
            dateArray = new Array(keys.length); // keys.length
            valueArray = new Array(keys.length);

            for(let i=0; i<keys.length; i++){
                const key = keys[i]; //44_2007.8.1
                var arr = keys[i].split("_"); // 44, 2007.8.1
                const area = arr[0]-1; // 44
                dateArray[area] = arr[1]; // 44 < 2007.8.1
                valueArray[area] = trends[key];

                //console.log("dateArray[" + area + "] : " + arr[1]);
                //console.log("valueArray[" + area + "] : " + trends[key]);

                // console.log("dateArraySize : " + dateArray.length + " valueArraySize : " + valueArray.length);
                // console.log("key : " + key + " area : " + area + " type : " + typeof(area));
            }

            trendsData = [['Year', searchWord]];
            //console.log("Client(JS) : getTrendsValue - ajax통신완료");
            makeValue();
        },
        complete: function(){
            $('#searchChartLoadingImg').hide();
            $('#chart_trend').show();
        },
    });
}

function getTrendsCompareValue(){
    //console.log("Client(JS) : getTrendsCompareValue - 비교 단어 검색량 추이");
    $.ajax({
        url: "/getTrendsCompareValue",
        type: "GET",
        data: {
            searchWord: searchWord,
            compareWord: compareWord,
            date: date
        },
        beforeSend: function () {
            //console.log("Client(JS) : getTrendsCompareValue - ajax통신중");
            $('#chart_trend').hide();
            $('#searchChartLoadingImg').show().fadeIn('fast');
        },
        success: function (trends) {
            const keys = Object.keys(trends);
            dateArray = new Array(keys.length); // keys.length
            valueArray = new Array(keys.length);

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]; //44_2007.8.1
                var arr = keys[i].split("_"); // 44, 2007.8.1
                const area = arr[0] - 1; // 44
                dateArray[area] = arr[1]; // 44 < 2007.8.1
                valueArray[area] = trends[key];

                //console.log("dateArray[" + area + "] : " + arr[1]);
                //console.log("valueArray[" + area + "] : " + trends[key]);

                // console.log("dateArraySize : " + dateArray.length + " valueArraySize : " + valueArray.length);
                // console.log("key : " + key + " area : " + area + " type : " + typeof(area));
            }

            trendsData = [['Year', searchWord, compareWord]];
            //console.log("Client(JS) : getTrendsCompareValue - ajax통신완료");
            makeValue();
        },
        complete: function(){
            $('#searchChartLoadingImg').hide();
            $('#chart_trend').show();
        },
    });
}

function consoleTest(){
    console.log("dateArray크기 : " + dateArray.length + " valueArray크기 : " + valueArray.length);
    for(var j=0; j<dateArray.length; j++){
        console.log(dateArray[j] + " : " + valueArray[j]);
    }
    // trendsData.push([dateArray[0], valueArray[0]]);
    // console.log(trendsData);
}

function makeValue(){
    for(let i=0; i<dateArray.length; i++){
        if(!compareWord){
            trendsData.push([dateArray[i], valueArray[i][0]]);
        } else{
            trendsData.push([dateArray[i], valueArray[i][0], valueArray[i][1]]);
        }
    }
    loadTrendChart();
}

function loadTrendChart(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawTrendChart);
}

function drawTrendChart(){

    var dataTable = google.visualization.arrayToDataTable(trendsData);

    var options = {
        width:1100,
        height:360,
        chartArea:{width:'90%', height:'80%', top:10},
        legend:{position:'none'},
        hAxis: {title: '기간'},
        vAxis: {title: '검색량',minValue:0},
        //curveType:'function'
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_trend'));
    chart.draw(dataTable, options);
}