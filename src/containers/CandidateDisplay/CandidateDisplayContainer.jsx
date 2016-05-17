import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Row from '../../components/FlexboxGrid/Row.jsx';
import Col from '../../components/FlexboxGrid/Col.jsx';
import Box from '../../components/FlexboxGrid/Box.jsx';
import {Paper,Card,CardHeader,FlatButton,Avatar} from 'material-ui';
import VBar from '../../components/DataVisuals/VBar.jsx';
import VBarStacked from '../../components/DataVisuals/VBarStacked.jsx';
import VPie from '../../components/DataVisuals/VPie.jsx';
import CandidateBox from './CandidateBoxContainer.jsx';

class CandidateDisplayContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      candidates: []
    }
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({candidates: [...nextProps.candidates]});
  }

  // componentWillMount() {
  //   // const mapContainer = d3.select('.visual-container');
  //   //     const initialScreenWidth = this.currentScreenWidth();
  //   //     const containerWidth = (initialScreenWidth < 600) ?
  //   //       { width: initialScreenWidth + 'px',  height: (initialScreenWidth * 0.5625) + 'px' } :
  //   //       { width: '600px', height: '350px' }
  //   //       // { width: '600px', height: '350px' }
  //   //
  //   //     mapContainer.style(containerWidth);
  //   //     this.datamap = this.renderMap();
  //   //     window.addEventListener('resize', () => {
  //   //       const currentScreenWidth = this.currentScreenWidth();
  //   //       const mapContainerWidth = mapContainer.style('width');
  //   //       if (this.currentScreenWidth() > 600 && mapContainerWidth !== '600px') {
  //   //         d3.select('svg').remove();
  //   //         mapContainer.style({
  //   //           width: '90%',
  //   //           height: '30%'
  //   //         });
  //   //         this.datamap = this.renderMap();
  //   //       }
  //   //       else if (this.currentScreenWidth() <= 600) {
  //   //         d3.select('svg').remove();
  //   //         mapContainer.style({
  //   //           width: currentScreenWidth + 'px',
  //   //           height: (currentScreenWidth * 0.5625) + 'px'
  //   //         });
  //   //         this.datamap = this.renderMap();
  //   //       }
  //   //     });
  //     }

    currentScreenWidth(){
      return window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
    }

    handleClose(){
      console.log('click')
      const candidateContainer = ReactDOM.findDOMNode(this);
      const parentBox = ReactDOM.findDOMNode(this).parentNode;
      console.log(parentBox);
      console.log(candidateContainer);
      ReactDOM.unmountComponentAtNode(candidateContainer);
    }

    render(){
      const {candidates} = this.props;
      let candidateBoxes = candidates.map((candidate, index) => {
        console.log(candidate)
        return (
        <CandidateBox key={index} ref={candidate.crp_id} delCandidate={this.props.delCandidate} candidate={candidate} />
      )
    })
  return (
    <Box {...this.props}>
      <Row>
        {candidateBoxes}
    </Row>
  </Box>
    );
  }
}

function mapStateToProps(state) {
  const {
    dataByState: {
      candidates
    }
  } = state;
  return {candidates};
}
export default connect(mapStateToProps)(CandidateDisplayContainer);


