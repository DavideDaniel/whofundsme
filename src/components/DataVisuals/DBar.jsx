import React, {Component} from 'react';
import BarChart from '../BarChart/BarChart.jsx';


const colors = ['#d7191c','#fdae61','#abd9e9','#2c7bb6']

class DBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [0,0,0,0],
            labels: ['Total Recieved','Total Spent','Cash on hand','Debt']
        }
    }

    componentDidMount() {
      this.setState({
          data: [this.props.data.total,this.props.data.spent,this.props.data.cash_on_hand,this.props.data.debt]
      });
    }

    render(){
      return(
        <BarChart
          data={ this.state.data }
					labels={ this.state.labels }
					colors={ colors }
          opaque={true}
					horizontal={ true }
				/>);
    }
  }

export default DBar;