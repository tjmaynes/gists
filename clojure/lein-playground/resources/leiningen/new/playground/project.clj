(defproject {{name}} "0.1.0-SNAPSHOT"
  :description "Work, play, and try out new or old things!"
  :license {:name "MIT" :url "https://opensource.org/licenses/MIT"}

  :min-lein-version "2.0.0"

  :dependencies [[org.clojure/clojure "1.9.0"]
                 [cheshire "5.8.0"]
                 [clj-http "3.7.0"]
                 [aero "1.1.2"]]

  :source-paths ["src"]
  
  :repl-options {:init-ns {{namespace}}})
