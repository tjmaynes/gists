package interviewing.datastructures.stack;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MyArrayStackImplTest {
    MyStack<String> subject;

    @BeforeEach
    void setup() {
        subject = new MyArrayStackImpl();
    }

    @Test
    void push_whenItemsAreAvailable_itShouldReturnAnItemByValue() {
        assertEquals("hello", subject.push("hello"));
        assertEquals("world", subject.push("world"));
        assertNull(subject.push(null));
        assertEquals("you got this", subject.push("you got this"));
    }

    @Test
    void peek_whenItemsAreAvailable_itShouldReturnTopItem() {
        assertNull(subject.peek());

        subject.push("hello");
        subject.push("world");

        assertEquals("world", subject.peek());

        subject.push("you got this");

        assertEquals("you got this", subject.peek());

        subject.pop();

        assertEquals("world", subject.peek());
    }

    @Test
    void pop_whenItemsAreAvailable_itShouldRemoveTopItem() {
        assertNull(subject.pop());

        subject.push("hello");
        subject.push("world");

        assertEquals("world", subject.pop());
        assertEquals("hello", subject.pop());

        assertNull(subject.pop());
    }
}