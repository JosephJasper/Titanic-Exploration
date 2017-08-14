/* Define initial state of variables for chart function */
var measure = "pop_Count";
var measure2 = "surv_Count";
var x_Axis = "Gender";
var grouping = "Class";
var class_Slice = "None";
var gender_Slice = "None";
var mortality_Slice = "None";
var ageRange_Slice = ["None"]; 
var fareRange_Slice = ["None"];
var port_Slice = "None";
var description_Text = "";
var fare_Range_Order = ["0 < 30","30 < 60","60 < 90","90 < 120","120 < 150","150 < 180","180 < 210","210 < 240","240 < 270", "510 < 540"];
var age_Range_Order = ["0 < 10","10 < 20","20 < 30","30 < 40","40 < 50","50 < 60","60 < 70","70 < 80","80 < 90","Unknown"];
var overall_Order = ["0 < 10","0 < 30","1","10 < 20","2","20 < 30","3","30 < 40","30 < 60","40 < 50","50 < 60","60 < 70","60 < 90","70 < 80","80 < 90","90 < 120","120 < 150","150 < 180","180 < 210","210 < 240","240 < 270", "510 < 540","Unknown", "Perished", "Survived"];
var link = "";
var link_Text = "";

/* Variables for the animation */
var initial_State = {};
/*scenario_template = {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Total Sample", ogrouping: "None", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", odescription_Text: "", olink: "", olink_Text: ""};*/
var scenarios = [
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Total Sample", ogrouping: "None", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", 
  odescription_Text: "We can see that across the entire population we have 891 passengers with a 38% survival rate.  Rather bleak overall, but let's find if digging deeper grants more context.", 
  olink: "", olink_Text: ""},
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Gender", ogrouping: "None", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None",
   odescription_Text: "We see here that females had a much higher survival rate, despite making up about 1/3 of the sample.", olink: "", olink_Text: ""},
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Age Range", ogrouping: "None", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", 
  odescription_Text: "We also see here that age had an impact on survival.  Aside from the age ranges that are very sparsely populated (from 70 to 80 and 80 to 90), we see that passengers confirmed to be 10 or younger had a 15% to 30% better survival rate than other age ranges.", 
  olink: "", olink_Text: ""},
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Age Range", ogrouping: "Gender", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", 
  odescription_Text: "Evaluating both factors at the same time seems to be the next logical step.  The result implies that there was truth to the phrase 'women and children first'.  It was interesting to read wikipedia's article and find a specific reference to the Titanic.", 
  olink: "https://en.wikipedia.org/wiki/Women_and_children_first", olink_Text: "Women and Children First"},
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Class", ogrouping: "None", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", 
  odescription_Text: "However, it appears that class is also a useful indicator for survival.  First class passengers having a 63% survival rate and trending downward across classes.", 
  olink: "", olink_Text: ""},
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Age Range", ogrouping: "Gender", oclass_Slice: "1", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", 
  odescription_Text: "Comparing survival by age and gender, filtering for first class passengers; we can see that the survival rate for females was above 90% with exception to one child under 10 who did not survive.  Additionally, most of the groupings of males had above a 24% survival rate.", 
  olink: "", olink_Text: ""},
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Age Range", ogrouping: "Gender", oclass_Slice: "2", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", 
  odescription_Text: "For second class passengers, we can see that survival rate of females is similar to first class with all ages above 80%.  For males: children under 10 had a 100% survival, but all other age groupings except 1 had a survival rate below 24%.", 
  olink: "", olink_Text: ""},
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Age Range", ogrouping: "Gender", oclass_Slice: "3", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], 
  oport_Slice: "None", odescription_Text: "We can see a large dip in the survival rate across all age ranges and genders for third class passengers.  Children under 10 drops to 52% for females and 38% for males.  For all other age ranges, female survival rate dropped to 50% and 12% for males", 
  olink: "", olink_Text: ""},
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Gender", ogrouping: "Class", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", odescription_Text: "For the purposes of informing a machine learning model or as a statistical view of the survival rate of Titanic passengers, gender, class and age appear to be key features.  However, it is important to realize that this view of the data is not the complete data set nor is it the complete story.", 
  olink: "", olink_Text: ""},
  {omeasure: "pop_Count", omeasure2: "surv_Count", ox_Axis: "Gender", ogrouping: "Class", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", 
  oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", 
  odescription_Text: "When you look at survival as a count of survivors as opposed to a rate, you can see that the survivor count is almost consistent across the classes by gender.  You can also see that the third class passengers make up more than half of the sample.  It is definitely fair to suggest that class impacted likely hood of survival, but is difficult to say there was preferential treatment while evacuating without deeper study into the incident.",
   olink: "", olink_Text: ""}
];
var animation_Run = scenarios.length;
var animation_Playing = false;
var animate_Idx = -1;

function chart_Graph() {
  d3.select("svg")
    .selectAll("*")
    .remove();
  var chartGrouping = null
  d3.csv("./data/titanic_data_post.csv",
    function (data) {
      /* Filter data based on slicer variables */
      filteredData = data.filter(function(d) {
        return (class_Slice == "None" || class_Slice == d['Class'])
        && (gender_Slice == "None" || gender_Slice == d['Gender'])
        && (mortality_Slice =="None" || mortality_Slice == d['Mortality'])
        && ((ageRange_Slice[0] == "None" && ageRange_Slice.length == 1)|| ageRange_Slice.indexOf(d['Age Range']) !== -1)
        && ((fareRange_Slice[0] == "None" && fareRange_Slice.length == 1)|| fareRange_Slice.indexOf(d['Fare Range']) !== -1)
        && (port_Slice == "None" || port_Slice == d['Port']);
      });

      var myChart = new dimple.chart(svg, filteredData);
      myChart.setBounds(60, 20, 470, 320)

      /* Using default colors with black stroke to highlight bubbles over bars */
      myChart.defaultColors = [
        new dimple.color('#93BAD5','#000000',1),
        new dimple.color('#FC998E','#000000',1),
        new dimple.color('#FDC381','#000000',1),
        new dimple.color('#C2E587','#000000',1),
        new dimple.color('#FFF18C','#000000',1),
        new dimple.color('#C999CA','#000000',1),
        new dimple.color('#A4DCD2','#000000',1),
        new dimple.color('#D6EFD1','#000000',1),
        new dimple.color('#FFFFC2','#000000',1)
      ];

      /* Create functionality in case user wants to compare 2 features or just view one */
      if (x_Axis == grouping || grouping == "None"){
        x = myChart.addCategoryAxis("x", x_Axis);
        x.addOrderRule(overall_Order);
      } else { 
        chartGrouping = grouping
        x = myChart.addCategoryAxis("x", [x_Axis, grouping]);
        x.addOrderRule(overall_Order);
        x.addGroupOrderRule(overall_Order);
      }
      if (x_Axis == "Total Sample" && grouping !== "None") {
        x.title = "Whole Sample by " + grouping;
      } else if (x_Axis !== "None" && grouping !== "None") {
        x.title = x_Axis + " grouped by " + grouping;
      }


      var y;
      /* Title and formatting control for first y axis */
      if (measure == "surv_Count") {
        y = myChart.addMeasureAxis("y", "Survived");
        y.title = "Survivor Count";
      } else if (measure == "surv_Rate") {
        y = myChart.addMeasureAxis("y", "Survived");
        y.overrideMax = 1.0;
        y.tickFormat = d3.format(".0%");
        y.title = "Survival Rate";
      } else if (measure == "pop_Count") {
        y = myChart.addMeasureAxis("y", "Survived");
        y.title = "Population Count";
      }

      var y2;
      /* Title and formatting control for second y2 axis */
      if(measure !== measure2 && measure.substr(measure.length - 5) !== measure2.substr(measure2.length - 5)) {
        if (measure2 == "surv_Count") {
          y2 = myChart.addMeasureAxis("y", "Survived"); 
          y2.title = "Survivor Count";
        } else if (measure2 == "surv_Rate") {
          y2 = myChart.addMeasureAxis("y", "Survived");
          y2.overrideMax = 1.0;
          y2.tickFormat = d3.format(".0%");
          y2.title = "Survival Rate";
        } else if (measure2 == "pop_Count") {
          y2 = myChart.addMeasureAxis("y", "Survived");
          y2.title = "Population Count";
        }
      }

      /* Clarifying y axis titles if more than one measure selected */

      if (measure !== "none" && measure !== measure2 && measure2 !== "none" && measure.substr(measure.length - 5) !== measure2.substr(measure2.length - 5)) {
        y.title += " (bars)";
        y2.title += " (bubbles)";
      } else if (measure == "surv_Count" && measure !== measure2 && measure2 == "pop_Count") {
        y.title = "Survivor Count (bars) vs. Population Count (bubbles)"
      } else if (measure == "pop_Count" && measure !== measure2 && measure2 == "surv_Count") {
        y.title = "Population Count (bars) vs. Survivor Count (bubbles)"
      }



      /* Measure control based on selection */
      if (measure !== "none") {
        var bars = myChart.addSeries(chartGrouping, dimple.plot.bar, [x, y]);
        bars.addOrderRule(overall_Order);
        if (measure == "surv_Rate") {
          bars.aggregate = dimple.aggregateMethod.avg;
        } else if (measure == "pop_Count") {
          bars.aggregate = dimple.aggregateMethod.count;

        }
      }

      /* Measure2 control based on selection */
      if (measure2 !== "none" && measure2 !== measure) {
        /* Put both measures on the same y axis if they are both counts */
        if (measure.substr(measure.length - 5) !== measure2.substr(measure2.length - 5)) {
          var bubbles = myChart.addSeries(chartGrouping, dimple.plot.bubble, [x, y2]);
          bubbles.addOrderRule(overall_Order);
        } else {
          var bubbles = myChart.addSeries(chartGrouping, dimple.plot.bubble, [x, y]);
          bubbles.addOrderRule(overall_Order);
        }
        if (measure2 == "surv_Rate") {
          bubbles.aggregate = dimple.aggregateMethod.avg;
        } else if (measure2 == "pop_Count") {
          bubbles.aggregate = dimple.aggregateMethod.count;
        }
      }

      /* Change tool tip if measures are pop_Count.  Tooltip defaults to Survived which does not match the count aggregation */
      if (measure == "pop_Count") {
        if (grouping == "None") {
          bars.getTooltipText = function (e) {
            return [
            x_Axis + ":  " + e.x,
            "Passengers:  " + e.y
            ];
          }
        } else {
          bars.getTooltipText = function (e) {
            return [
            grouping + ":  " + e.aggField[0],
            x_Axis + ":  " + e.x,
            "Passengers:  " + e.y
            ];
          }
        }
      }

      if (measure !== "pop_Count" && measure2 == "pop_Count") {
        if (grouping == "None") {
          bubbles.getTooltipText = function (e) {
            return [
            x_Axis + ":  " + e.x,
            "Passengers:  " + e.y
            ];
          }
        } else {
          bubbles.getTooltipText = function (e) {
            return [
            grouping + ":  " + e.aggField[0],
            x_Axis + ":  " + e.x,
            "Passengers:  " + e.y
            ];
          }
        }
      }
      var filter_List ='';

      if (class_Slice != "None" || gender_Slice != "None" || mortality_Slice != "None" || 
        ageRange_Slice.length != 1 || ageRange_Slice[0] != "None" || 
        fareRange_Slice.length != 1 || fareRange_Slice[0] != "None" || 
        port_Slice != "None"){
        filter_List = 'Filtered for: '
        if (class_Slice != "None") {
          filter_List = filter_List + 'Class = ' + class_Slice + '/ ';
        }
        if (gender_Slice != "None") {
          filter_List = filter_List + 'Gender = ' + gender_Slice + '/ ';
        }
        if (mortality_Slice != "None") {
          filter_List = filter_List + 'Mortality = ' + mortality_Slice + '/ ';
        }
        if (ageRange_Slice.length != 1 || ageRange_Slice[0] != "None") {
          filter_List = filter_List + 'Age = ' + ageRange_Slice + '/ ';
        }
        if (fareRange_Slice.length != 1 || fareRange_Slice[0] != "None") {
          filter_List = filter_List + 'Fare = ' + fareRange_Slice + '/ ';
        }
        if (port_Slice != "None") {
          filter_List = filter_List + 'Port = ' + port_Slice + '/ ';
        }
      }
      if (filter_List != ''){
        filter_List = filter_List.substring(0, filter_List.length -2);
      }
      d3.select('#filter_Text')
        .text(filter_List);


      /* Evaluate need for a legend */
      if (x_Axis !== grouping && grouping !== "None"){
        legend = myChart.addLegend(65, 380, 510, 20, "left");
      }

      myChart.draw();
      d3.select('#chart_Description')
        .text(description_Text);

      d3.select('#chart_Description')
        .append("p")
        .append("a")
        .attr("href",link)
        .attr("target","_blank")
        .text(link_Text);
    }
  );

  /* Allow graph to change size and preserve aspect ratio depending on resizing */
  d3.select('svg')
    .attr('preserveAspectRatio','xMinYMin meet')
    .attr('viewBox', '0 0 590 410')
    .classed('svg-content-responsive', true)
    .attr('height', null)
    .attr('width', null);
}

/* Function to collect all options selected from the Fare Range slicer */
function fareRangeUpdate() {
  fareRange_Slice = []
  fareArray = d3.select('#fare')['_groups'][0][0]['selectedOptions'];
  fareArrayLength = fareArray.length;
  for (i = 0; i < fareArrayLength; i++) {
    fareRange_Slice.push(fareArray[i]['value']);
  }
}

/* Function to collect all options selected from the Age Range slicer */
function ageRangeUpdate() {
  ageRange_Slice = []
  ageArray = d3.select('#age')['_groups'][0][0]['selectedOptions'];
  ageArrayLength = ageArray.length;
  for (i = 0; i < ageArrayLength; i++) {
    ageRange_Slice.push(ageArray[i]['value']);
  } 
}

/* Rewrite variables  based on a preset scenario */
function variable_Rewrite(object) {
  measure = object.omeasure;
  measure2 = object.omeasure2;
  x_Axis = object.ox_Axis;
  grouping = object.ogrouping;
  class_Slice = object.oclass_Slice;
  gender_Slice = object.ogender_Slice;
  mortality_Slice = object.omortality_Slice;
  ageRange_Slice = object.oageRange_Slice;
  fareRange_Slice = object.ofareRange_Slice;
  port_Slice = object.oport_Slice;
  description_Text = object.odescription_Text;
  link = object.olink;
  link_Text = object.olink_Text;
  chart_Graph();
}

function run_Animation() {
  /* Capture initial state, may be useful if I add a play button */
  initial_State.omeasure = measure;
  initial_State.omeasure2 = measure2;
  initial_State.ox_Axis = x_Axis;
  initial_State.ogrouping = grouping;
  initial_State.oclass_Slice = class_Slice;
  initial_State.ogender_Slice = gender_Slice;
  initial_State.omortality_Slice = mortality_Slice;
  initial_State.oageRange_Slice = ageRange_Slice; 
  initial_State.ofareRange_Slice = fareRange_Slice;
  initial_State.oport_Slice = port_Slice;
  initial_State.odescription_Text = description_Text;
  initial_State.olink = link;
  initial_State.olink_Text = link_Text;

  /* Hide controls and Data Dictionary during animation */
  d3.select('#form_change')
    .style('display','none');

  d3.select('#variable_Description')
    .style('display','none');

  var animate_Interval = setInterval(function() {
    if (animate_Idx > -1 && animate_Idx < animation_Run) {
      d3.select("#intro_text")
        .style('display','none')

      variable_Rewrite(scenarios[animate_Idx]);
    }

    animate_Idx++;

    if(animate_Idx >= animation_Run + 1) {
        clearInterval(animate_Interval);

        /* Reset variables and expose controls and Data Dictionary after animation */
        variable_Rewrite(initial_State);
        d3.select('#form_change')
          .style('display','inherit');

        d3.select('#variable_Description')
          .style('display','inherit');        

        }}, 10000);






}
