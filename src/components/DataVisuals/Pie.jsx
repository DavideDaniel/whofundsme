import React from 'react';
import ReactDOM from 'react-dom';
import {PieChart} from 'react-d3'
class Pie extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      title: ''
    }
    this.addSlivers.bind(this);
  }

  addSlivers(array){
    if(array != undefined){
    let data = array.map((item) => {
        return {
          label: item.sector_name || item.industry_name,
          value: item.money_from_pacs + item.money_from_indivs
        }
    });
    return data;
    }
  }

  componentWillReceiveProps(nextProps) {
    debugger
    let slivers = this.addSlivers(nextProps.data);
    this.setState({
      data: slivers
    });
  }

  render() {
    return (
      <div>
        <PieChart data={this.state.data} width={400} height={400} radius={100} innerRadius={20} sectorBorderColor="white" title={this.state.title}/>
      </div>
    )
  }
}

export default Pie;