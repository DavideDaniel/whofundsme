import React, { PropTypes } from 'react';
import {VictoryBar, VictoryAxis, VictoryChart} from 'victory';

const VBar = ({data}) => {

  function mapData(array){
    if(array != undefined){
    let data1 = array.map((item) => {
       return {
         x: (item.industry_name || item.sector_name)+('- Pacs'),
         y: item.money_from_pacs,
         fill: "red"
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
      label="Industries"
      orientation="left"/>
    <VictoryBar
      height = {500}
      padding = {75}
      style={{
        data: {
          width: 15,
          labels: {fontSize:14}
        }
      }}
      labels = {}
      data={formattedData}/>
  </VictoryChart>

  )
}

export default VBar;