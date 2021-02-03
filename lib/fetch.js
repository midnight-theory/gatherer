const axios = require('axios');

/**
 * Axios plugin to retry on timeout
 * @type {function}
 * @param {object} err - Axios error object
 */
const retryFailedRequest = (err) => {
  if ((err.status === 500 && err.config && !err.config.__isRetryRequest) || err.code == "ECONNABORTED" || err.code == "ECONNRESET" || err.code == "ENOTFOUND") {
    err.config.__isRetryRequest = true;
    return axios(err.config);
  }

  throw err;
}

axios.interceptors.response.use(undefined, retryFailedRequest);
const GC_API_URL = 'https://api.gathercontent.com';

/**
 * GatherContent API Endpoints.
 * Replace `[ID]` with Project or Item ID.
 * @type {object}
 * @property {string} items - All items in a project
 * @property {string} item - Single item
 */
const GC_ENDPOINTS = {
  statuses: `${GC_API_URL}/projects/[ID]/statuses`,
  folders: `${GC_API_URL}/projects/[ID]/folders?include_trashed=false`,
  items: `${GC_API_URL}/projects/[ID]/items?include=&per_page=10`,
  item: `${GC_API_URL}/items/[ID]?include=structure`,
}

/**
 * Fetch data from GatherContent API
 * @type {function}
 * @param {string} type - API Endpoint to fetch
 * @param {string} id - Project or item ID
 * @param {object} auth - API auth credentials
 * @return {promise}
 */
const fetch = ({
  type,
  id,
  auth,
  endpoint,
  timeout = 10000,
  headers = {
    'Accept': 'application/vnd.gathercontent.v2+json',
  },
}) => {
  let url;
  if (type) {
    url = GC_ENDPOINTS[type].replace('[ID]', id);
  } else if (endpoint) {
    url = endpoint;
  }
  const config = {
    auth,
    timeout,
    headers,
  }

  return new Promise((resolve, reject) => {
    axios.get(url, config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
}

module.exports = fetch;