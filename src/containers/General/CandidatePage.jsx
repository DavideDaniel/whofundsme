import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Candidates from '../CandidateDisplay/Candidates.jsx';
import CandidateMenuBar from '../CandidateMenu/CandidateMenuBar.jsx';
import CandidateDisplayContainer from '../CandidateDisplay/CandidateDisplayContainer.jsx';
import {fetchCandidate} from '../../actions/index.js';
class CandidatePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      candidates: []
    }
    this.handleAddCandidate = this.handleAddCandidate.bind(this);
    this.handleRemoveCandidate = this.handleRemoveCandidate.bind(this);
  }

  componentWillMount() {

  }
  componentDidMount() {
    // this.init(this.props)

  }

  componentWillReceiveProps(nextProps){
   this.setState({candidates: [...nextProps.candidates]});
  }

  componentWillUnmount() {

  }

  init(){

  }

  handleAddCandidate(candidate){

    const {dispatch} = this.props;
    dispatch(fetchCandidate(candidate));
    // dispatch(addCandidate(candidate))
  }

  handleRemoveCandidate(crpId){
    let cands = this.props.candidates;
    for (var i = 0; i < cands.length; i++) {
      if(cands[i].crp_id == crpId){
        return cands.shift(i);
      }
    }
    this.setState({candidates:cands})
  }

  render(){
    const {stateName, list, candidates} = this.props;
    return (<div {...this.props}>
      <Candidates candidates={candidates}
                  addCandidate={(candidate)=>this.handleAddCandidate(candidate)}
                  delCandidate={(e,candidate)=>this.handleRemoveCandidate(candidate)}/>
    </div>);
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
