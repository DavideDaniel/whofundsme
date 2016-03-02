import { START, DONE, ERROR, parseAction, wrapPromise } from '../reduxActionsSequence/reduxActionsUtils.js';
import { getCandidate } from '../../api/api.js';

const FETCH_CANDIDATE = 'FETCH_CANDIDATE';

export function fetchCandidate(name) {
    return (dispatch, getState)=> wrapPromise(FETCH_CANDIDATE, dispatch, ()=>{
      return getCandidate(name).then(response => {
        let result = {
          name: response.first_name+' '+response.last_name,
          state: response.state_name,
          chamber: response.chamber,
          twitter_id : response.twitter_id,
          url: response.website,
          crp_id: response.crp_id,
          party: response.party,
          bills: response.bills,
          monies: response.monies,
          industries: response.industries,
          sectors: response.sectors
        }
        return result;
    });
  });
}

export default function(state = {}, action = {
  type: 'UNKNOWN'
}) {
  const {
    type,
    stage,
    payload
  } = parseAction(action);


  return state;
}