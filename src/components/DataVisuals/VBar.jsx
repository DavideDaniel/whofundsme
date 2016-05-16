import React, {Component, PropTypes} from 'react';
import {VictoryBar, VictoryAxis, VictoryChart} from 'victory';
import d3 from 'd3';

function mapData(array) {
  if (array != undefined) {
    let data1 = array.map((item, index) => {

      return {
        y: item.money_from_pacs,
        x: (item.industry_name || item.sector_name)+' - Pac',
        fill: "tomato"
      }
    });
    let data2 = array.map((item, index) => {

      return {
        y: item.money_from_indivs,
        x: (item.industry_name || item.sector_name)+' -Individual',
        fill: "orange"
      }
    });
    let newData = [
      ...data1,
      ...data2
    ]
    return newData;
  }
}

function cleanData(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == undefined) {
      array.splice(i)
    }
  }
  return array
}

function makeLabels(array) {
  let labels = array.map((item) => {
    return item.x
  });
  return labels
}
function makeLegend(array) {
  return array.map((item) => {
    return {field: item, name: item}
  });
}

function calcPx(str){
  return parseInt(str.replace(/px/,''))
}

class VBar extends Component {
  constructor(props){
    super(props);
    this.currentScreenWidth = this.currentScreenWidth.bind(this);
    this.renderVisual = this.renderVisual.bind(this);
  }
  componentWillMount() {
    const visualContainer = d3.select('.visual-container');
        const initialScreenWidth = this.currentScreenWidth();
        const containerWidth = (initialScreenWidth < 600) ?
          { width: initialScreenWidth + 'px',  height: (initialScreenWidth * 0.5625) + 'px' } :
          { width: '600px', height: '600px' }
          // { width: '600px', height: '350px' }

        visualContainer.style(containerWidth);
        this.visual = this.renderVisual();
        window.addEventListener('resize', () => {
          const currentScreenWidth = this.currentScreenWidth();
          const currentScreenHeight = this.currentScreenHeight();
          const visualContainerWidth = visualContainer.style('width');
          if (this.currentScreenWidth() > 600 && visualContainerWidth !== '600px') {
            d3.select('svg').remove();
            visualContainer.style({
              width: '90%',
              height: '90%'
            });
            this.visual = this.renderVisual();
          }
          else if (this.currentScreenWidth() <= 600) {
            d3.select('svg').remove();
            visualContainer.style({
              width: currentScreenWidth + 'px',
              height: (currentScreenWidth * 0.5625) + 'px'
            });
            this.visual = this.renderVisual();
          }
        });
  }
  currentScreenWidth(){
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
  }
  currentScreenHeight(){
    return window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
  }

  renderVisual(w,h){
    let data = this.props.data;
    let formattedData = mapData(data);
    let cleaned = cleanData(formattedData);
    return (<VictoryChart
      padding={{
      top: 40,
      bottom: 40,
      left: 80,
      right: 80
    }}
    domainPadding={{x:20,y:20}}>
      <VictoryAxis style={{tickLabels:{fontSize:0}}}/>
    <VictoryAxis
      dependentAxis
      style={{
  grid: {
    strokeWidth: 1
  },
  axis: {stroke: "transparent"},
  label: {stroke: "transparent"}
  }}/>
  <VictoryBar
  style={{
    data: {
      width: 12
    }
  }}
  labels = {makeLabels(cleaned)}
  data={cleanData(mapData(data))}
  /></VictoryChart>);
  }
  render(){
  return (

      <div className='visual-container' />
  )}
}

VBar.PropTypes = {
  data: PropTypes.array.isRequired
}

export default VBar;


// let pallette = [{
//     fill: '#D73C4C'
//     }, {
//     fill: '#F66D3B'
//     }, {
//     fill: '#FDAD58'
//     }, {
//     fill: '#FFE185'
//     }, {
//     fill: '#D6D79E'
//     }, {
//     fill: '#E6F693'
//     }, {
//     fill: '#DCEB8C'
//     }, {
//     fill: '#AADEA2'
//     }, {
//     fill: '#62C3A5'
//     }, {
//     fill: '#2C87BF'
//     }]