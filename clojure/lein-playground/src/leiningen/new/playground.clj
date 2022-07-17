(ns leiningen.new.playground
  (:require [leiningen.new.templates :refer [renderer
                                             sanitize-ns
                                             multi-segment
                                             name-to-path
                                             ->files]]
            [leiningen.core.main :as main]))

(def render (renderer "playground"))

(defn playground
  "A playground project template."
  [name]
  (let [main-ns (multi-segment (sanitize-ns name))
        data {:name name
              :namespace main-ns
              :nested-dirs (name-to-path main-ns)
              :sanitized (name-to-path name)}]
    (main/info "Generating fresh 'lein new' playground project.")
    (->files data
             ["project.clj" (render "project.clj" data)]
             ["src/{{sanitized}}/core.clj" (render "core.clj" data)]
             ["resources/config.edn" (render "config.edn" data)]
             [".gitignore" (render ".gitignore" data)]
             ["README.md" (render "README.md" data)])))
