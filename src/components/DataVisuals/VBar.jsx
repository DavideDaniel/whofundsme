import React, { PropTypes } from 'react';
import {VictoryBar, VictoryAxis, VictoryChart} from 'victory';

const VBar = ({data}) => {
  debugger
  function mapData(array){
    if(array != undefined){
    let data1 = array.map((item) => {
       return {
         x: (item.industry_name || item.sector_name)+('- Pacs'),
         y: item.money_from_pacs
     }
    });
    let data2 = array.map((item)=>{
     return {
       x: (item.industry_name || item.sector_name)+('- Individual'),
       y: item.money_from_indivs
     }
    });
    let newData = [...data1,...data2]
    return newData;
    }
  }

  let formattedData = mapData(data);

  return (
    <VictoryChart
    height={500}
    padding={{
      top: 75,
      bottom: 40,
      left: 40,
      right: 40
    }}
    domainPadding={{x: 20}}>
    <VictoryAxis
      label="Sectors"
      orientation="bottom"/>
    <VictoryAxis dependentAxis
      tickValues={[0, 2500, 5000, 7500, 10000]}
      style={{
        grid: {
          stroke: "grey",
          strokeWidth: 1
        },
        axis: {stroke: "transparent"},
        ticks: {stroke: "transparent"}
      }}/>
    <VictoryBar
      style={{
        data: {
          width: 15,
          fill: (data) => data.y > 0 && data.x == 'Misc Unions' ?
            "gold" : "orange"
        }
      }}
      data={formattedData}/>
  </VictoryChart>

  )
}

export default VBar;