package interviewing.exercises;

import org.junit.jupiter.api.Test;

import static interviewing.exercises.ReverseAString.reverseAString;
import static org.junit.jupiter.api.Assertions.*;

class ReverseAStringTest {
    @Test
    void whenGivenAString_itShouldReturnTheStringInReverse() {
        assertEquals("dlrow-olleh", reverseAString("hello-world"));
        assertEquals("aaaaaaaaaaa", reverseAString("aaaaaaaaaaa"));
        assertEquals("12321", reverseAString("12321"));
        assertEquals("racecar", reverseAString("racecar"));
        assertEquals("yessydO ecapS A", reverseAString("A Space Odyssey"));
    }

    @Test
    void whenGivenAnEmptyString_itShouldReturnAnEmptyString() {
        assertEquals("", reverseAString(""));
    }
}