import React, {PropTypes} from 'react';
import {VictoryBar, VictoryAxis, VictoryChart} from 'victory';
import d3 from 'd3';

const VBar = ({data}) => {
  function mapData(array) {
    if (array != undefined) {
      let data1 = array.map((item, index) => {

        return {
          y: item.money_from_pacs,
          x: (item.industry_name || item.sector_name)+' - Pac',
          fill: "tomato"
        }
      });
      let data2 = array.map((item, index) => {

        return {
          y: item.money_from_indivs,
          x: (item.industry_name || item.sector_name)+' -Individual',
          fill: "orange"
        }
      });
      let newData = [
        ...data1,
        ...data2
      ]
      return newData;
    }
  }

  function cleanData(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == undefined) {
        array.splice(i)
      }
    }
    return array
  }

  let formattedData = mapData(data);
  let cleaned = cleanData(formattedData);
  function makeLabels(array) {
    let labels = array.map((item) => {
      return item.x
    });
    return labels
  }
  function makeLegend(array) {
    return array.map((item) => {
      return {field: item, name: item}
    });
  }

  let pallette = [{
      fill: '#D73C4C'
      }, {
      fill: '#F66D3B'
      }, {
      fill: '#FDAD58'
      }, {
      fill: '#FFE185'
      }, {
      fill: '#D6D79E'
      }, {
      fill: '#E6F693'
      }, {
      fill: '#DCEB8C'
      }, {
      fill: '#AADEA2'
      }, {
      fill: '#62C3A5'
      }, {
      fill: '#2C87BF'
      }]
  return (

      <div>
        <VictoryChart
          height={600}
          width={600}
          padding={{
          top: 40,
          bottom: 40,
          left: 80,
          right: 80
        }}
        domainPadding={{x:20,y:20}}>
          <VictoryAxis style={{tickLabels:{fontSize:0}}}/>
        <VictoryAxis
          dependentAxis
          style={{
      grid: {
        strokeWidth: 1
      },
      axis: {stroke: "transparent"},
      label: {stroke: "transparent"}
      }}/>
      <VictoryBar
      style={{
        data: {
          width: 12
        }
      }}
      labels = {makeLabels(cleaned)}
      data={cleanData(cleaned)}
      /></VictoryChart>
    </div>
  )
}

export default VBar;