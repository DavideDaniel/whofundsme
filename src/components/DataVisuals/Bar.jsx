import React from 'react';
import ReactDOM from 'react-dom';
import {BarChart} from 'react-d3-components'
class Bar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      title: ''
    }
    this.makeLabels.bind(this);
  }

  makeLabels(array){
    if(array != undefined){
    let data = array.map((item,index) => {
        return {
          label: '$ from individuals',
          values: [
            {x: item.sector_name || item.industry_name, y: item.money_from_indivs}
          ]},
        {
          label: '$ from pacs',
          values: [
            {x: item.sector_name || item.industry_name, y: item.money_from_pacs}
          ]}
    });
    return data;
    }
  }

  componentWillReceiveProps(nextProps) {
    debugger
    let newData = this.makeLabels(nextProps.data);
    this.setState({
      data: newData
    });
  }

  render() {
    return (
      <div>
        <BarChart
  data={this.state.data}
  width={400}
  height={400}
  margin={{top: 10, bottom: 50, left: 50, right: 10}}
  title={this.state.title}
/>
      </div>
    )
  }
}

export default Bar;