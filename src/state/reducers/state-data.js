import { START, DONE, ERROR, parseAction, asyncAction } from '../utils';
import { fetchLegislators } from '../../api/api';

const FETCH_CANDIDATE_LIST = 'FETCH_CANDIDATE_LIST';

export function fetchLegislatorList(stateChoice) {
  return dispatch =>
    asyncAction(FETCH_CANDIDATE_LIST, dispatch, () =>
      fetchLegislators(stateChoice).then(({ data }) => {
        const result = {
          stateName: stateChoice,
          legislators: [],
        };

        if (data && data.legislators && data.legislators.length > 0) {
          result.legislators = data.legislators;
        }

        return result;
      })
    );
}

export default function(
  state = {},
  action = {
    type: 'UNKNOWN',
  }
) {
  const { type, stage, payload } = parseAction(action);

  if (type === FETCH_CANDIDATE_LIST) {
    switch (stage) {
      case START:
        return Object.assign({}, state, {
          legislators: [],
          fetching: {
            status: 'loading',
          },
        });
      case ERROR:
        return Object.assign({}, state, {
          legislators: [],
          fetching: {
            status: 'error',
            statusText: payload,
          },
        });
      case DONE:
        return Object.assign({}, state, {
          stateName: payload.stateName,
          legislators: payload.legislators.map(l => l.crp_id),
          fetching: {
            status: 'done',
          },
        });

      default:
        return state;
    }
  }
  return state;
}
