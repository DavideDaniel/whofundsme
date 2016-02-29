// import React from 'react';
// import ReactDOM from 'react-dom';
// import Chart from 'd3-react-squared';
//
// const Bar = ({data, params})extends React.Component {
//   constructor(props){
//     super(props)
//     this.mapData.bind(this);
//   }
//
//   mapData(array){
//     if(array != undefined){
//     let data = array.map((item) => {
//        return {
//          id: item.industry_name || item.sector_name,
//        value: item.money_from_pacs + item.money_from_indivs
//      }
//     });
//     return data;
//     }
//   }
//
//   componentWillReceiveProps(nextProps) {
//     let newData = this.mapData(nextProps.data);
//     this.setState({
//       data: newData
//     });
//   }
//
//   render() {
//     return (
//       <div>
//         <Chart
//         chartType='bar'
//         data={this.state.data}
//         paddingBottom='100%'
//         params={
//           {
//             aspectRatio: 1,
//             colorArray: d3.scale.category20().range(),
//             colorType: 'category'
//           }
//         } />
//         </div>
//     )
//   }
// }
//
// export default Bar;