const addEventListener = (object, eventName) => {
  return new Promise((resolve, _) => {
    object.addEventListener(eventName, resolve);
  });
}

const registerServiceWorker = (serviceWorkerLocation) => {
  if ("serviceWorker" in navigator) { 
    return addEventListener(window, "load")
      .then(_            => serviceWorker.register(serviceWorkerLocation))
      .then(registration => console.log(`ServiceWorker registration successful with scope: ${registration.scope}`))
      .catch(err         => console.error(`ServiceWorker registration failed: ${err}`));
  } else {
    return Promise.reject(new Error("Browser does not support service workers!"));
  }
};

const observeServiceWorkerMessages = (callback) => {
  if ("serviceWorker" in navigator) { 
    navigator.serviceWorker.addEventListener("message", callback);
  } else {
    callback(new Error("Browser does not support service workers!"));
  }
};

export {
  registerServiceWorker,
  observeServiceWorkerMessages
};
