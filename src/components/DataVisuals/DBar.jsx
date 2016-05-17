import React, {Component} from 'react';
import BarChart from '../BarChart/BarChart.jsx';

class DBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                0, 0, 0, 0
            ],
            series: ['Finances'],
            labels: [
                'Total Recieved', 'Total Spent', 'Cash on hand', 'Debt'
            ],
            colors: ['#bebada', '#fb8072', '#8dd3c7', '#b3de69']
        }
    }

    componentWillMount() {
        this.setState({
            data: [
                [this.props.data.total],
                [this.props.data.spent],
                [this.props.data.cash_on_hand],
                [this.props.data.debt]
            ]
        });
    }

    render() {
        return (<BarChart
          data={this.state.data}
          labels={this.state.labels}
          dollarFormat
          colors={this.state.colors}
          opaque
          horizontal
          colorBySeries/>);
    }
}

export default DBar;