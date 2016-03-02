import React, {PropTypes} from 'react';
import {VictoryBar, VictoryAxis, VictoryChart} from 'victory';

const VBarStacked = ({data}) => {

  function mapData(array) {
    if (array != undefined) {
      let newData = array.map((item) => {
        let miniArray = [
          {
            x: (item.industry_name || item.sector_name) + ('- Pacs'),
            y: item.money_from_pacs
          }, {
            x: (item.industry_name || item.sector_name) + ('- Individual'),
            y: item.money_from_indivs
          }
        ]
        return miniArray
      });

      return newData;
    }
  }

  let formattedData = mapData(data);
  debugger
  return (
      <VictoryBar
        stacked
        dataAttributes={[{fill:'tomato',fill:'orange'}]}
       height={500} padding={75} style={{
        data: {
          width: 15,
          labels: {
            fontSize: 14
          }
        }
      }}
      data={formattedData}/>

  )
}

export default VBarStacked;