import React, {Component} from 'react';
import {
    util,
    Chart,
    DataSeries,
    BarChart,
    Pie,
    XAxis,
    YAxis,
    Stack,
    Group
} from 'diffract';

// const colors = ['#E91E63', '#2196F3', '#FF9800', '#4CAF50', '#673AB7'];
const colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#2196F3','#bc80bd','#ccebc5','#ffed6f', '#E91E63'];
const width = 640;
const height = 240;

class DDonut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total : 0,
            currValue: 0,
            currLabel: 'Sectors',
            values: [],
            labels: []
        }
    }

    componentDidMount() {
        let total = 0;
        let totalVals = [];
        let labelOfVals = [];
        for (var i = 0; i < this.props.data.length; i++) {
            total+=this.props.data[i].money_from_indivs + this.props.data[i].money_from_pacs;
            totalVals.push(this.props.data[i].money_from_indivs + this.props.data[i].money_from_pacs);
            labelOfVals.push(this.props.data[i].sector_name);
        }
        this.setState({total:total,values: [...totalVals], labels: [...labelOfVals]});
    }

    getColors(d, i) {
        if (arguments.length === 2) {
            return colors[i];
        } else {
            return colors[d];
        }

    }

    setLabel(v,i){
      this.setState({
        currValue: v,
        currLabel: this.state.labels[i]
      })
    }

    getPieChart() {
      let name = null;
      let label = name || 'Sector';
      let percent = null || Math.round((this.state.currValue/this.state.total)*100);
      let labelPercent = percent ? `${percent}%` : 'by %';
        return (
            <Chart width={width} height={height}>
                <DataSeries data={this.state.values}>
                    <Pie innerRadius={75} outerRadius={110} onClick={(e, v, i) => {this.setLabel(v,i)}} style={(d, i) => ({fill: this.getColors(i)})}>
                        <text className="donut-title" textAnchor="middle" x={0} y={0} fontSize={14}>
                            {this.state.currLabel}
                        </text>
                        <text className="donut-subtitle" textAnchor="middle" x={0} y={18} fontSize={10}>
                          {`${labelPercent}`}
                        </text>
                    </Pie>
                </DataSeries>
            </Chart>
        );
    }


    render() {
        const donut = this.getPieChart();

        return (
            <div width="640" height="480">
                {donut}
            </div>
        )
    }
}

export default DDonut;