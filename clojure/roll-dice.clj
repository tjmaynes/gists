(defn get-random-integer
  ([max] (rand-nth (range 1 max)))
  ([min max] (rand-nth (range min max))))

(defn roll-dice
  ([] (roll-dice 2 6))
  ([max] (roll-dice 1 max))
  ([number-of-die max] (take number-of-die (repeatedly #(get-random-integer max))))
  ([number-of-die max extra] (concat (roll-dice number-of-die max) (list extra))))
