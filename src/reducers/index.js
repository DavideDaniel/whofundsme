import candidateMenuSelectField from '../actions/CandidateMenu/CandidateMenuSelectFieldActions.js';
import candidateMenuStateChoice from '../actions/CandidateMenu/CandidateMenuStateChoiceActions.js';
import candidatePage from '../actions/CandidateMenu/CandidatePageActions.js';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    dataByState: candidatePage,
    dataByState: candidateMenuSelectField,
    dataByState: candidateMenuStateChoice,
});
export default rootReducer;