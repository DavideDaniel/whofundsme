import React, {PropTypes} from 'react';
import {VictoryBar, VictoryAxis, VictoryChart} from 'victory';
import numeral from 'numeral';

const VBarStacked = ({data}) => {

  function mapData(array) {
    if (array != undefined) {
      let newData = array.map((item) => {
        return [
          [{
            x: (item.industry_name || item.sector_name) + ('- Pacs'),
            y: item.money_from_pacs
          }, {
            x: (item.industry_name || item.sector_name) + ('- Individual'),
            y: item.money_from_indivs
          }]
        ]
      });
      return newData;
    }
  }

  function formatMoney(num){
    return numeral(num).format('0,0');
  }

  function mapFinances(data){
    let newData = [[
      {
      x: 1,
      y: data.total,
      label: 'Recieved '+formatMoney(data.total),
      fill: 'tomato'},
      { x:2, y:data.spent,label:'Spent '+formatMoney(data.spent),fill: 'gold'},
      { x:3, y:data.cash_on_hand,label:'Cash on hand '+formatMoney(data.cash_on_hand), fill:'orange'},
      { x:4, y:data.debt,label:'Debt '+formatMoney(data.debt), fill:'salmon'}]
    ]
    return newData
  }

  let formattedData = mapFinances(data);

  return (

      <VictoryBar
        stacked
       height={300} width={600} padding={{top:60,bottom:40,left:120,right:60}} style={{
        data: {
          width: 20,
          labels: {
            fontSize: 16
          }
        }
      }}
      data={formattedData}/>
  )
}

export default VBarStacked;