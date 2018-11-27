import fetch from 'isomorphic-fetch';
import { v4 } from 'uuid';
import { API_PATH } from '../config';

const DEFAULT_METHOD = 'GET';
const DEFAULT_HEADERS = {
  'Accept-Encoding': 'gzip, deflate, br',
  'Content-Type': 'application/json; charset=UTF-8',
  Accept: 'application/json',
  Connection: 'keep-alive',
  DNT: '1',
  Origin: API_PATH,
};

const defaultFetchArgs = {
  method: 'GET',
  headers: DEFAULT_HEADERS,
};

export const fetchClient = (
  url,
  { headers = DEFAULT_HEADERS, method = DEFAULT_METHOD } = defaultFetchArgs
) =>
  fetch(url, {
    method,
    headers: {
      ...headers,
      'X-B3-TraceId': v4(),
    },
  });

const OPERATION_METHODS = {
  mutation: 'POST',
  query: 'GET',
};

export const defaultArgs = {
  operationType: 'query',
  operationName: undefined,
  hash: undefined,
  variables: undefined,
  domain: API_PATH,
  method: undefined,
  mutation: undefined,
  query: undefined,
};

export const noHashAndOperationError = new Error(
  'graphql-fetch requires a hash, mutation or query'
);

/**
 * graphqlFetch is a thin wrapper around isomorphic-fetch with
 * some best practices and requirements for Nike Digital baked in
 * @param {Object} params
 * @property  {String} operationType          - type of graphql operation - query by default, mutation
 * @property  {String} operationName          - a human readable enum for hash
 * @property  {String} token                  - user auth token
 * @property  {String} visitId                - user visitor id
 * @property  {String} visitorId              - user visit id
 * @property  {String} hash                   - a whitelisted hash from GRAND server
 * @property  {String} variables              - variables to use with a persisted query
 * @property  {String} appName                - app name to identify the requesting app
 * @property  {String} appId                  - app id for downstream services
 * @property  {String} callerId               - caller id for downstream services
 * @property  {String} domain                 - domain property to override host domain of api endpoint
 * @property  {String} cloudStack             - cloudStack to use specific cluster
 * @property  {String} method                 - method property for fetch options
 * @return  Promise
 */
export default function graphqlFetch({ ...args } = defaultArgs) {
  const {
    operationType = 'query',
    operationName,
    hash,
    variables,
    domain = API_PATH,
    method,
  } = args;
  console.log('domain', domain);

  console.log('API_PATH', API_PATH);

  const operation = args[operationType];

  if (!operation && !hash) {
    throw noHashAndOperationError;
  }

  const url = `${domain}/?${hash ? `hash=${hash}&` : ''}${
    operation ? `${operationType}=${operation}&` : ''
  }&operationName=${operationName}&variables=${JSON.stringify(variables)}`;

  const options = {
    headers: DEFAULT_HEADERS,
    method: method || OPERATION_METHODS[operationType],
  };

  if (operationType === 'mutation') {
    options.body = JSON.stringify({
      hash,
      variables,
      [operationType]: operation,
      operationName,
    });
  }

  return fetchClient(url, options)
    .then(resp => (resp.ok ? resp.json() : resp))
    .catch(error => {
      if (process.env.LOG_GRAPHQL_FETCH_ERRORS) {
        console.error({ options, error }); // eslint-disable-line
      }
      return Promise.reject(new Error(`Error for hash=${hash}`));
    });
}
