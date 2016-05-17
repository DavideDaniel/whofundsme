import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CandidateMenuBar from '../CandidateMenu/CandidateMenuBar.jsx';
import CandidateBox from '../CandidateDisplay/CandidateBoxContainer.jsx';
import {fetchCandidate} from '../../actions/index.js';
import Row from '../../components/FlexboxGrid/Row.jsx';
import Box from '../../components/FlexboxGrid/Box.jsx';
class CandidatePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      candidates: null
    }
    this.handleAddCandidate = this.handleAddCandidate.bind(this);
    this.handleRemoveCandidate = this.handleRemoveCandidate.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({candidates: [...nextProps.candidates]});
  }

  handleAddCandidate(candidate){
    const {dispatch} = this.props;
    dispatch(fetchCandidate(candidate));
  }

  handleRemoveCandidate(crpId){
    let cands = this.props.candidates;
    for (var i = 0; i < cands.length; i++) {
      if(cands[i].crp_id == crpId){
        return cands.shift(i);
      }
    }
    this.setState({candidates:cands}) // TODO - fix state
  }

  render(){
    const {stateName, list} = this.props;

    if (this.state.candidates != undefined && this.state.candidates.length > 0) {
      let candidateBoxes = this.state.candidates.map((candidate, index) => {
        return (
        <CandidateBox key={index} ref={candidate.crp_id} delCandidate={(e,crpId)=>this.handleRemoveCandidate(crpId)} candidate={candidate} />
      )
    });

      return (
        <div {...this.props}>
          <CandidateMenuBar addCandidate={(candidate)=>this.handleAddCandidate(candidate)}/>
            <Box>
              <Row>
                {candidateBoxes}
            </Row>
          </Box>
        </div>
      );
    } else {
      return (
        <div {...this.props}>
          <CandidateMenuBar addCandidate={(candidate)=>this.handleAddCandidate(candidate)}/>
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
    const {dataByState: {candidates, stateName, stateList, list}} = state;
    return {
        candidates,
        stateList,
        stateName,
        list
    };
}

export default connect(mapStateToProps)(CandidatePage);
