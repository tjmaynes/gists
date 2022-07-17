(ns {{namespace}}
    (:require [cheshire.core :as json]
              [clj-http.client :as client]
              [aero.core :refer (read-config)]))

(defn read-edn-file []
  (read-config (clojure.java.io/resource "config.edn")))
