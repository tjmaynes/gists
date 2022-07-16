package interviewing.exercises;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FirstRecurringCharacter {
    public static <T> Optional<T> firstRecurringCharacter(List<T> items) {
        Map<T, Boolean> recurrence = new HashMap();
        for (T item : items) {
            if (recurrence.getOrDefault(item, false))
                return Optional.of(item);
            recurrence.put(item, true);
        }
        return Optional.empty();
    }
}
