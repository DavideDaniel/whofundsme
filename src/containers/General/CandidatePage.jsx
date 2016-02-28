import React, { Component, PropTypes } from 'react';
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
  }

  componentDidMount() {

    // this.init(this.props)
  }

  componentWillReceiveProps(nextProps){
    debugger
    this.setState({
      candidates: this.state.candidates.concat([nextProps.candidates])
    });
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

  render(){
    const {stateName, list, candidates} = this.props;
    return (<div {...this.props}>
      <Candidates candidates={candidates}
                  addCandidate={(candidate)=>this.handleAddCandidate(candidate)}/>
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
