const checkStatus = (response) => {
  return new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 300) {
      return resolve(response);
    } else {
      return reject(new Error(response.statusText));
    }
  });
}

const parse = (response) => response.json();

const fetchJSONData = (endpoint) => fetch(endpoint, {mode: 'cors'})
  .then(checkStatus)
  .then(parse);

export {
  fetchJSONData
};
