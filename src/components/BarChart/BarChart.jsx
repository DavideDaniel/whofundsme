import React, {Component} from 'react';
import Legend from '../Legend/Legend.jsx';
import './BarChart.css';
import numeral from 'numeral';
const colors = [
    '#bebada',
    '#fb8072',
    '#8dd3c7',
    '#ffffb3',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#2196F3',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
    '#E91E63'
];
function compareNumbers(a, b) {
  return a - b;
}
class BarChart extends Component {
  render(){
		let self = this,
			data = [[this.props.data[0]],[this.props.data[1]],[this.props.data[2]],[this.props.data[3]]],
			layered = this.props.grouping === 'layered' ? true : false,
			stacked = this.props.grouping === 'stacked' ? true : false,
			opaque = this.props.opaque,
		 max = 0;

		for (let i = data.length; i--; ) {
			for (let j = data[i].length; j--; ) {
				if (data[i][j] > max) {
					max = data[i][j];
				}
			}
		}

    return (
			<div className={ 'BarChart' + (this.props.horizontal ? ' horizontal' : '' ) }>
				{ data.map(function (serie, serieIndex) {
          console.log(serie,serieIndex);
				 	let sortedSerie = serie.slice(0),
				 		sum;

				 	sum = serie.reduce(function (carry, current) {
				 		return carry + current;
					}, 0);
				 	sortedSerie.sort(compareNumbers);

					return (
						<div className={ 'BarChart--serie ' + (self.props.grouping) }
				 			key={ serieIndex }
							style={{ height: self.props.height ? self.props.height: 'auto' }}
						>
						<label>{ self.props.labels[serieIndex] }</label>
						{ serie.map(function (item, itemIndex) {
							let color = self.props.colors[serieIndex], style,
								size = item / (stacked ? sum : max) * 100;

							style = {
								backgroundColor: color,
								opacity: opaque ? 1 : (item/max + .05),
								zIndex: item
							};

							if (self.props.horizontal) {
								style['width'] = size + '%';
							} else {
								style['height'] = size + '%';
							}

							if (layered && !self.props.horizontal) {
								style['right'] = ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%';
							}

						 return (
							 <div
							 	className={ 'BarChart--item ' + (self.props.grouping) }
							 	style={ style }
								key={ itemIndex }
							>
							 	<b style={{ color: color }}>{ numeral(item).format('$0,0') }</b>
							 </div>
						);
						}) }
						</div>
					);
				}) }
			</div>
		);
  }
}

export default BarChart
