import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'd3-react-squared';

const PieSq = ({data}) => {
  function mapData(array){
    if(array != undefined){
    let data = array.map((item) => {
       return {
         id: item.industry_name || item.sector_name,
       value: item.money_from_pacs + item.money_from_indivs
     }
    });
    return data;
    }
  }

  let formattedData = mapData(data);
  
    return (
        <Chart
        chartType='pie'
        data={formattedData}
        paddingBottom='100%'
        highlight={false}
        params={
          {
            colorArray: d3.scale.category20().range(),
            colorType: 'category',
            cornerRadius: 0,
            innerRadius: 0
          }
        }/>
    )

}

export default PieSq;