import React from 'react';
import ReactDOM from 'react-dom';
import {Chart} from 'd3-react-squared';

class PieSq extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      title: ''
    }
    this.mapData.bind(this);
  }

  mapData(array){
    let formatData = (obj) => {
    for (var key of Object.keys(obj)) {
      return { labels: key, values: [obj[key]] }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    debugger
    let newData = this.mapData(nextProps.data);
    this.setState({
      data: newData
    });
  }

  render() {
    return (
        <Chart
        chartType='pie'
        data={this.state.data}
        paddingBottom='100%'
        params={
          {
            colorArray: d3.scale.category20().range(),
            colorType: 'category',
            cornerRadius: 20,
            innerRadius: 100
          }
        }
      />
    )
  }
}

export default PieSq;