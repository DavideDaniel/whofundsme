import { START, DONE, ERROR, parseAction, wrapPromise } from '../reduxActionsSequence/reduxActionsUtils.js';
import { readData } from '../../api/api.js';

const FETCH_CANDIDATE_LIST = 'FETCH_CANDIDATE_LIST';
const FETCH_CANDIDATE = 'FETCH_CANDIDATE';

export function fetchCandidateList(stateChoice) {
  console.log(stateChoice)
  return (dispatch, getState) => wrapPromise(FETCH_CANDIDATE_LIST, dispatch, () => {
    return readData(stateChoice).then(response => {
      let result = {
        stateName : stateChoice,
        list : []
      };
      if (response && response.length > 0) {
        result.list = response.map(item=>{
          return {
            name: item.first_name +' '+ item.last_name,
            crp_id: item.crp_id
          }
        });
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

  if (type === FETCH_CANDIDATE_LIST) {
    if (stage === START) {
      state = Object.assign({}, state, {
        list: [],
        fetching: {
          status: 'loading',
        }
      });
      return state;
    }
    if (stage === DONE) {
      state = Object.assign({}, state, {
        stateName: payload.stateName,
        list: payload.list,
        fetching: {
          status: 'done'
        }
      });
      return state;
    }
    if (stage === ERROR) {
      state = Object.assign({}, state, {
        list: [],
        fetching: {
          status: 'error',
          statusText: payload
        }
      });
      return state;
    }
  }
  if (type === FETCH_CANDIDATE) {
    if (stage === START) {
      state = Object.assign({}, state, {
        fetching: {
          status: 'loading',
        }
      });
      return state;
    }
    if (stage === DONE) {
      debugger
      return state = {
        ...state, candidates: [...state.candidates, payload],
        fetching: {
          status: 'done'
        }
      }
      // state = Object.assign({}, state, {
      //   candidates: [...payload],
      //   fetching: {
      //     status: 'done'
      //   }
      // });
      // return state;
    }
    if (stage === ERROR) {
      state = Object.assign({}, state, {
        fetching: {
          status: 'error',
          statusText: payload
        }
      });
      return state;
    }
  }

  return state;
}