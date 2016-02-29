import React from 'react';
import ReactDOM from 'react-dom';
import {VictoryPie} from 'victory';

const VPie = ({data}) => {
  function mapData(array) {
    if (array != undefined) {
      let data = array.map((item) => {
        return {
          x: item.industry_name || item.sector_name,
          y: item.money_from_pacs + item.money_from_indivs
        }
      });
      return data;
    }
  }

  let formattedData = mapData(data);

  return (
    <VictoryPie
      data={formattedData}
      style={{
        data: {
          stroke: (data) => data.y > 100000 ? 'black':'transparent', opacity:(data)=> data.y > 100000 ? 1:0.5
        },
        labels: {
          fontSize: 12,
          padding: 300
        }
      }}
      padAngle={2}
      padding={60}
      innerRadius={10}
      height={650}
      width={650} />
  )
}

export default VPie;