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
import Legend from '../Legend/Legend.jsx';
import numeral from 'numeral';

const colors = [
    '#bebada',
    '#fb8072',
    '#8dd3c7',
    '#b3de69',
    '#ffffb3',
    '#80b1d3',
    '#fdb462',
    '#fccde5',
    '#2196F3',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
    '#E91E63'
];
const width = 640;
const height = 240;
const margins = {
    left: 60,
    bottom: 60,
    top: 30,
    right: 80
};
const xScale = util.scale.ordinal().rangeRoundBands([
    0, width - margins.left - margins.right
], 0.25);
const yScale = util.scale.linear().rangeRound([
    height - margins.top - margins.bottom,
    0
]);

class DGroupedBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            labels: []
        }
    }
    componentWillMount() {
        let multiVals = [];
        let labelOfVals = [];
        for (var i = 0; i < this.props.data.length; i++) {
            multiVals.push([this.props.data[i].money_from_indivs, this.props.data[i].money_from_pacs]);
            labelOfVals.push(this.props.data[i].industry_name);
        }
        this.setState({
            values: [...multiVals],
            labels: [...labelOfVals]
        });
    }

    getColors(d, i) {
        if (arguments.length === 2) {
            return colors[i];
        } else {
            return colors[d];
        }
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center'
            }}>
                <Chart style={{
                    alignSelf: 'center'
                }} width={width} height={height} data={this.state.values} margin={margins}>
                    <DataSeries data={this.state.values} xScale={xScale} yScale={yScale}>
                        <Stack>
                            <BarChart style={(d, i) => ({fill: this.getColors(i)})}/>
                            <XAxis textRotation={15} tickPadding={5} tickFormat={(d, i) => this.state.labels[i]}/>
                            <YAxis tickFormat={d => {
                                return numeral(d).format('$0,0');
                            }}/>
                        </Stack>
                    </DataSeries>
                </Chart>
                <Legend wrapRow labels={['Individual donations', 'PAC donations']} colors={colors}/>
            </div>
        );
    }
}

export default DGroupedBar;