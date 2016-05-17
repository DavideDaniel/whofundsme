import React, {Component, PropTypes} from 'react';
import Legend from '../Legend/Legend.jsx';
import './BarChart.css';
import numeral from 'numeral';

function sortNums(a, b) {
    return a - b;
}

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            max: 0
        }
    }

    componentDidMount() {
        let data = this.props.data,
            layered = this.props.grouping === 'layered'
                ? true
                : false,
            stacked = this.props.grouping === 'stacked'
                ? true
                : false,
            opaque = this.props.opaque,
            max = 0;
        for (let i = data.length; i--;) {
            for (let j = data[i].length; j--;) {
                if (data[i][j] > max) {
                    max = data[i][j];
                }
            }
        }
        this.setState({data: data, layered: layered, stacked: stacked, opaque: opaque, max: max});
    }

    render() {
        let self = this;
        let max = self.state.max;
        let opaque = this.props.opaque;
        if (this.props.data.length) {
            let data = this.props.data;
            return (
                <div className={'BarChart' + (this.props.horizontal
                    ? ' horizontal'
                    : '')}>
                    {data.map((series, seriesIndex) => {

                        let sum = series.length > 1
                            ? series.reduce((carry, current) => {
                                return carry + current;
                            }, 0)
                            : series[seriesIndex];

                        return (
                            <div className={'BarChart--series ' + (self.props.grouping)} key={seriesIndex} style={{
                                height: self.props.height
                                    ? self.props.height
                                    : 'auto'
                            }}>
                                <label>{self.props.labels[seriesIndex]}</label>
                                {series.map((item, itemIndex) => {
                                    let color = self.props.colorBySeries
                                            ? self.props.colors[seriesIndex]
                                            : self.props.colors[itemIndex],
                                        style,
                                        size = item / (self.state.stacked
                                            ? sum
                                            : max) * 100;
                                    style = {
                                        backgroundColor: color,
                                        opacity: opaque
                                            ? 1
                                            : (item / max + .05),
                                        zIndex: item
                                    };

                                    if (self.props.horizontal) {
                                        style['width'] = size + '%';
                                    } else {
                                        style['height'] = size + '%';
                                    }

                                    if (self.state.layered && !self.props.horizontal) {
                                        let sortedSeries = series.slice(0);
                                        sortedSeries.sort(sortNums);
                                        style['right'] = ((sortedSeries.indexOf(item) / (series.length + 1)) * 100) + '%';
                                    }

                                    return (
                                        <div className={'BarChart--item ' + (self.props.grouping)} style={style} key={itemIndex}>
                                            <b style={{
                                                color: color
                                            }}>
                                                {(self.props.dollarFormat
                                                    ? numeral(item).format('$0,0')
                                                    : item)}</b>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}

                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

BarChart.PropTypes = {
    data: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired
}
export default BarChart
