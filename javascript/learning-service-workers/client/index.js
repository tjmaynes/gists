const { 
  registerServiceWorker,
  observeServiceWorkerMessages
} = require("./utils/register-sw");
const { fetchJSONData } = require("./utils/http-request");
const { noDataUI, dataUI } = require("./utils/ui");

const updateState = (rootNode, data, actions) => {
  if (data.length <= 0) {
    return noDataUI(rootNode, actions);
  }

  return dataUI(rootNode, data, actions);
};

const initializeApp = (rootNode, endpoint) => {
  const actions = { 
    refreshAction: () => {
      console.log("Tapped Refresh button!");
      return initializeApp(rootNode, endpoint);
    },
    clearAction:   () => {
      console.log("Tapped Clear button!");
      return updateState(rootNode, [], actions);
    }
  };

  return fetchJSONData(endpoint)
    .then(response => {
      console.log(`Finished fetching data from ${endpoint}.`);
      return response;
    })
    .then(response => updateState(rootNode, response, actions))
    .then(_ => console.log("Finished updating state!"));
};

const rootNode = document.getElementById("app");
const endpoint = "/playlists";
const serviceWorkerLocation = "/sw.js";

registerServiceWorker(serviceWorkerLocation)
  .then(_ => initializeApp(rootNode, endpoint))
  .catch(console.error);
