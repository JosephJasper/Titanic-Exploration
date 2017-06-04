/* Define initial state of variables for chart function */
var measure = "pop_Count";
var measure2 = "surv_Rate";
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
var overall_Order = ["0 < 10","0 < 30","1","10 < 20","2","20 < 30","3","30 < 40","30 < 60","40 < 50","50 < 60","60 < 70","60 < 90","70 < 80","80 < 90","90 < 120","120 < 150","150 < 180","180 < 210","210 < 240","240 < 270", "510 < 540","Unknown"];

/* Variables for the animation */
var initial_State = {};
/*scenario_template = {omeasure: "none", omeasure2: "none", ox_Axis: "Total Sample", ogrouping: "None", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", oageRange_Slice: ["None"], ofareRange_Slice: "None", oport_Slice: ["None"], odescription_Text: ""};*/
var scenarios = [
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Total Sample", ogrouping: "None", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", odescription_Text: ""},
  {omeasure: "pop_Count", omeasure2: "surv_Rate", ox_Axis: "Total Sample", ogrouping: "None", oclass_Slice: "None", ogender_Slice: "None", omortality_Slice: "None", oageRange_Slice: ["None"], ofareRange_Slice: ["None"], oport_Slice: "None", odescription_Text: ""}];
var animation_Run = scenarios.length;
var animation_Playing = false;

function chart_graph() {
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
      myChart.setBounds(60, 40, 470, 320)

      /* Using default colors with black stroke to highlight dots over bars */
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
        y2.title += " (dots)";
      } else if (measure == "surv_Count" && measure !== measure2 && measure2 == "pop_Count") {
        y.title = "Survivor Count (bars) vs. Population Count (dots)"
      } else if (measure == "pop_Count" && measure !== measure2 && measure2 == "surv_Count") {
        y.title = "Population Count (bars) vs. Survivor Count (dots)"
      }






      if (measure !== "none") {
        var bars = myChart.addSeries(chartGrouping, dimple.plot.bar, [x, y]);
        bars.addOrderRule(overall_Order);

        /* Measure control based on selection */
        if (measure == "surv_Rate") {
          bars.aggregate = dimple.aggregateMethod.avg;
        } else if (measure == "pop_Count") {
          bars.aggregate = dimple.aggregateMethod.count;

        }
      }

      if (measure2 !== "none" && measure2 !== measure) {
        /* Put both measures on the same y axis if they are both counts */
        if (measure.substr(measure.length - 5) !== measure2.substr(measure2.length - 5)) {
          var dots = myChart.addSeries(chartGrouping, dimple.plot.bubble, [x, y2]);
          dots.addOrderRule(overall_Order);
        } else {
          var dots = myChart.addSeries(chartGrouping, dimple.plot.bubble, [x, y]);
          dots.addOrderRule(overall_Order);
        }
          /* Measure2 control based on selection */
        if (measure2 == "surv_Rate") {
          dots.aggregate = dimple.aggregateMethod.avg;
        } else if (measure2 == "pop_Count") {
          dots.aggregate = dimple.aggregateMethod.count;
        }
      }

      /* Evaluate need for a legend */
      if (x_Axis !== grouping && grouping !== "None"){
        myChart.addLegend(65, 10, 510, 20, "left");
      }

      myChart.draw();
      d3.select('#chart_Description')
        .text(description_Text);

    }
  );

  /* Allow graph to change size and preserve aspect ratio depending on resizing */
  d3.select('svg')
    .attr('preserveAspectRatio','xMinYMin meet')
    .attr('viewBox', '0 0 590 450')
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
}

function run_animation() {
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

  /* Hide controls and Data Dictionary during animation */
  d3.select('#form_change')
    .style('display','none');

  d3.select('#variable_Description')
    .style('display','none');







  /* Reset variables and expose controls and Data Dictionary after animation */
  variable_Rewrite(initial_State);
  d3.select('#form_change')
    .style('display','inherit');

  d3.select('#variable_Description')
    .style('display','inherit');
}
