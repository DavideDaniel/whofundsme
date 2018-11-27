import fetch from './fetch-client';
import legislatorsQuery from './legislators-query.graphql';
import candidateQuery from './legislator-query.graphql';

export function getTwitterInfo(twitter_id) {
  // twitterClient.get(`users/show.json?screen_name=${twitter_id}`,(e,r)=>{
  // })
}

export function fetchLegislators(state) {
  return fetch({
    operationName: 'Legislators',
    operationType: 'query',
    query: legislatorsQuery,
    variables: {
      state,
    },
  });
}

export function fetchLegislator(crpId) {
  console.log('crpId', crpId);

  return fetch({
    operationName: 'Legislator',
    operationType: 'query',
    query: candidateQuery,
    variables: {
      crp_id: crpId,
    },
  });
}
