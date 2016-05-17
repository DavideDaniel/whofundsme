import React, {PropTypes} from 'react';
import CandidateMenuBar from '../CandidateMenu/CandidateMenuBar.jsx';
import CandidateDisplayContainer from './CandidateDisplayContainer.jsx';

const Candidates = ({candidates, addCandidate,delCandidate}) => {

  if (candidates != undefined && candidates.length > 0) {
    return (
      <div>
        <CandidateMenuBar addCandidate={addCandidate}/>
        <CandidateDisplayContainer delCandidate={delCandidate} candidates={candidates}/>
      </div>
    );
  } else {
    return (
      <div>
        <CandidateMenuBar addCandidate={addCandidate}/>
      </div>
    );
  }
}

Candidates.PropTypes = {
  candidates: PropTypes.array.isRequired,
  addCandidate: PropTypes.func.isRequired
}

export default Candidates;