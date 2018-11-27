export const START = 'START';
export const DONE = 'DONE';
export const ERROR = 'ERROR';

const SEPARATOR = '/';

function syncAction(type, stage, payload) {
  return {
    type: `${type}${SEPARATOR}${stage}`,
    payload,
  };
}

export function asyncAction(actionType, dispatch, promise) {
  dispatch(syncAction(actionType, START));
  return promise()
    .then(payload => {
      dispatch(syncAction(actionType, DONE, payload));
    })
    .catch(payload => {
      dispatch(syncAction(actionType, ERROR, payload));
    });
}

export function parseAction(action) {
  const { payload, type } = action;
  if (type && type.indexOf(SEPARATOR) > 0) {
    const [actionType, stageCode] = type.split(SEPARATOR);
    let stage;
    if (stageCode === START) {
      stage = START;
    } else if (stageCode === DONE) {
      stage = DONE;
    } else if (stageCode === ERROR) {
      stage = ERROR;
    }
    return {
      type: actionType,
      stage,
      payload,
    };
  }
  return {
    type,
    payload,
  };
}
