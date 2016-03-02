import { START, DONE, ERROR, parseAction, wrapPromise } from '../reduxActionsSequence/reduxActionsUtils.js';
import { getTwitterInfo } from '../../api/api.js';

const ADD_CANDIDATE = 'ADD_CANDIDATE';

export function addCandidate(name) {
  //   return (dispatch, getState)=> wrapPromise(ADD_CANDIDATE, dispatch, ()=>{
  //     return getTwitterInfo(name).then(response => {
  //
  //       console.log(result);
  //   });
  // });
}

export default function(state = {}, action = {
        type: 'UNKNOWN'
    }) {
    const {type, stage, payload} = parseAction(action);
    if (type === ADD_CANDIDATE) {
        state = Object.assign({}, state, {
            result: payload
        });
        return state;
    }

    return state;
}
