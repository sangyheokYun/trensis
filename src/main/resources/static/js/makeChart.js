var authority1, authority2, administration2, classify2;
var 공개, 취하, 소멸, 포기, 무효, 거절, 등록;
var _2000, _2001, _2002, _2003, _2004, _2005, _2006, _2007, _2008, _2009,
    _2010, _2011, _2012, _2013, _2014, _2015, _2016, _2017, _2018, _2019,
    _2020, _2021;

function searchAuthority(){
    var authorityIndex = document.getElementById("authoritySelect1").options.selectedIndex;
    authority1 = document.getElementById("authoritySelect1").options[authorityIndex].value;
    getAuthorityTotal();
}

function searchClassify(){ // onchange="searchClassify(this)"
    var authorityIndex = document.getElementById("authoritySelect2").options.selectedIndex;
    var administrationIndex = document.getElementById("administrationSelect").options.selectedIndex;
    var classifyIndex = document.getElementById("classifySelect").options.selectedIndex;

    authority2 = document.getElementById("authoritySelect2").options[authorityIndex].value;
    administration2 = document.getElementById("administrationSelect").options[administrationIndex].value;
    classify2 = document.getElementById("classifySelect").options[classifyIndex].value;
    getDocumentsYearTotal();
}

function getAuthorityTotal(){
    var searchWord = $('h1#word').text();

    $.get({
        type: "POST",
        url: "https://api.trensis.site/api/getAuthorityTotal",
        data: {
            searchWord: searchWord,
            authority: authority1
        },
        beforeSend: function () {
            $('#chart_patent').hide();
            $('#patentChartLoadingImg').show().fadeIn('fast');
        },
        success: function (total) {
            console.log("로딩완료");
            공개 = total[authority1 + "_" + "공개"];
            취하 = total[authority1 + "_" + "취하"];
            소멸 = total[authority1 + "_" + "소멸"];
            포기 = total[authority1 + "_" + "포기"];
            무효 = total[authority1 + "_" + "무효"];
            거절 = total[authority1 + "_" + "거절"];
            등록 = total[authority1 + "_" + "등록"];
            loadPatentChart();
        },
        complete: function(){
            $('#patentChartLoadingImg').hide();
            $('#chart_patent').show();
        },
        //'json'
    });
}

function getDocumentsYearTotal(){
    var searchWord = $('h1#word').text();

    $.get({
        type: "POST",
        url: "https://api.trensis.site/api/getDocumentsYearTotal",
        data: {
            searchWord:searchWord,
            authority:authority2,
            administration:administration2,
            classify:classify2
        },
        beforeSend: function () {
            $('#chart_year').hide();
            $('#yearChartLoadingImg').show().fadeIn('fast');
        },
        success: function (yearTotal){
            _2000 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2000"];
            _2001 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2001"];
            _2002 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2002"];
            _2003 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2003"];
            _2004 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2004"];
            _2005 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2005"];
            _2006 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2006"];
            _2007 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2007"];
            _2008 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2008"];
            _2009 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2009"];
            _2010 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2010"];
            _2011 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2011"];
            _2012 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2012"];
            _2013 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2013"];
            _2014 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2014"];
            _2015 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2015"];
            _2016 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2016"];
            _2017 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2017"];
            _2018 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2018"];
            _2019 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2019"];
            _2020 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2020"];
            _2021 = yearTotal[authority2 + "_" + administration2  + "_" + classify2 + "_" + "2021"];
            loadYearChart();
        },
        complete: function(){
            $('#yearChartLoadingImg').hide();
            $('#chart_year').show();
        },
        //'json'
    });
}

function loadPatentChart(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawPatentChart);
}

function drawPatentChart(){

    var data = [
        ['Name', 'Number'],
        ['공개', 공개],
        ['취하', 취하],
        ['소멸', 소멸],
        ['포기', 포기],
        ['무효', 무효],
        ['거절', 거절],
        ['등록', 등록],
    ];


    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
        pieHole: 0.4,
        width:380,
        height:360,
        chartArea:{width:'100%', height:'80%', bottom:10},
        legend:{maxLines:2, position:'top'}
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_patent'));
    chart.draw(dataTable, options);
}

function loadYearChart(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawYearChart);
}

function drawYearChart(){

    var data = [
        ['Year', 'Number'],
        ['2000', _2000],
        ['2001', _2001],
        ['2002', _2002],
        ['2003', _2003],
        ['2004', _2004],
        ['2005', _2005],
        ['2006', _2006],
        ['2007', _2007],
        ['2008', _2008],
        ['2009', _2009],
        ['2010', _2010],
        ['2011', _2011],
        ['2012', _2012],
        ['2013', _2013],
        ['2014', _2014],
        ['2015', _2015],
        ['2016', _2016],
        ['2017', _2017],
        ['2018', _2018],
        ['2019', _2019],
        ['2020', _2020],
        ['2021', _2021]
    ];

    var dataTable = google.visualization.arrayToDataTable(data);

    var options = {
        width:480,
        height:360,
        chartArea:{width:'80%', height:'80%', top:10},
        legend:{position:'none'},
        hAxis: {title: '년도'},
        vAxis: {title: 'total'}
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_year'));
    chart.draw(dataTable, options);
}