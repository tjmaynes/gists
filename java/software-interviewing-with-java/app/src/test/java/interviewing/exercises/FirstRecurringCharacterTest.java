package interviewing.exercises;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static interviewing.exercises.FirstRecurringCharacter.firstRecurringCharacter;
import static org.junit.jupiter.api.Assertions.assertEquals;

class FirstRecurringCharacterTest {
    @Test
    void whenARecurringCharacterExists_itShouldReturnFirstRecurringCharacter() {
        assertEquals(Optional.of(2), firstRecurringCharacter(List.of(
                2, 4, 8, 2, 5, 0, 1
        )));

        assertEquals(Optional.of(3), firstRecurringCharacter(List.of(
                3, 3, 3, 3, 3, 3
        )));

        assertEquals(Optional.empty(), firstRecurringCharacter(List.of(
                1, 2, 3, 4, 5, 6
        )));
    }
}