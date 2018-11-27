import { createSelector } from 'reselect';

export const getStateData = state => state.stateData || {};
export const getStateList = state => state.stateList || [];
export const getLegislator = (state, props) => state.legislatorData[props.crpId] || {};
export const getStateLegislators = createSelector(
  getStateData,
  ({ legislators }) => legislators || []
);
export const getStateName = createSelector(
  getStateData,
  ({ stateName }) => stateName || null
);
export const getStateFetching = createSelector(
  getStateData,
  ({ fetching }) => fetching || {}
);
export const isLoading = createSelector(
  getStateFetching,
  ({ status }) => status === 'loading'
);
/* eslint-disable camelcase */
export const getLegislatorName = createSelector(
  getLegislator,
  ({ first_name, last_name }) => `${first_name} ${last_name}`
);

export const getLegislatorTwitterAccount = createSelector(
  getLegislator,
  ({ twitter_account }) => twitter_account || null
);

export const getLegislatorFacebookAccount = createSelector(
  getLegislator,
  ({ facebook_account }) => facebook_account || null
);

export const getMissedVotesPercent = createSelector(
  getLegislator,
  ({ missed_votes_pct }) => missed_votes_pct || 0
);
export const getVotesWithPartyPercent = createSelector(
  getLegislator,
  ({ votes_with_party_pct }) => votes_with_party_pct || 0
);
export const getLegislatorParty = createSelector(
  getLegislator,
  ({ party }) => party || null
);
export const getNextElection = createSelector(
  getLegislator,
  ({ next_election }) => next_election || null
);
export const getLegislatorTitle = createSelector(
  getLegislator,
  ({ short_title }) => short_title || ''
);

/* eslint-disable camelcase */
export const getContributors = createSelector(
  getLegislator,
  ({ contributors }) => contributors || []
);

export const getSectors = createSelector(
  getLegislator,
  ({ sectors }) => sectors || []
);

export const getIndustries = createSelector(
  getLegislator,
  ({ industries }) => industries || []
);

export const getFormattedParty = createSelector(
  getLegislatorParty,
  party => `(${party})`
);
export const getFormattedName = createSelector(
  getLegislatorTitle,
  getLegislatorName,
  getFormattedParty,
  (title, name, party) => `${title} ${name} ${party}`
);

export const getLegislatorState = createSelector(
  getLegislator,
  ({ state }) => state || null
);

export const getLegislatorSummary = createSelector(
  getLegislator,
  ({ summary }) => summary || {}
);
