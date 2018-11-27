import { START, ERROR, DONE, parseAction, asyncAction } from '../utils';
import { fetchLegislator } from '../../api/api';

const FETCH_CANDIDATE = 'FETCH_CANDIDATE';
const FETCH_CANDIDATE_LIST = 'FETCH_CANDIDATE_LIST';

export function fetchLegislatorByCrpId(crpId) {
  return dispatch =>
    asyncAction(FETCH_CANDIDATE, dispatch, () =>
      fetchLegislator(crpId).then(({ data }) => ({
        crpId: data.legislator.crp_id,
        industries: data.legislator.industries,
        sectors: data.legislator.sectors,
        contributors: data.legislator.contributors,
      }))
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
      case DONE: {
        const reduced = payload.legislators.reduce(
          (prev, curr) =>
            Object.assign(prev, {
              [curr.crp_id]: curr,
            }),
          {}
        );
        return {
          ...state,
          ...reduced,
        };
      }

      default:
        return state;
    }
  }
  if (type === FETCH_CANDIDATE) {
    switch (stage) {
      case START:
        return Object.assign({}, state, {
          fetching: {
            status: 'loading',
          },
        });
      case ERROR:
        return Object.assign({}, state, {
          fetching: {
            status: 'error',
            statusText: payload,
          },
        });
      case DONE:
        return Object.assign({}, state, {
          [payload.crpId]: {
            ...(state[payload.crpId] || {}),
            industries: payload.industries,
            contributors: payload.contributors,
            sectors: payload.sectors,
          },
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
