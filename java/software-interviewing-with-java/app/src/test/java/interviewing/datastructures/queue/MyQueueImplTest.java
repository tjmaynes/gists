package interviewing.datastructures.queue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MyQueueImplTest {
    private MyQueue<String> subject;
    
    @BeforeEach
    void setup() {
        subject = new MyQueueImpl<>();
    }

    @Test
    void peek_whenItemsAreAvailable_shouldReturnTheFirstItemInQueue() {
        assertNull(subject.peek());

        subject.enqueue("hello");
        subject.enqueue("world");

        assertEquals("hello", subject.peek());
    }

    @Test
    void enqueue_whenItemsAreAvailable_shouldReturnTheItemAddedToQueue() {
        assertEquals("hello", subject.enqueue("hello"));
        assertEquals("world", subject.enqueue("world"));

        subject.dequeue();

        assertEquals("world", subject.peek());
    }

    @Test
    void dequeue_whenItemsAreAvailable_shouldReturnTheItemRemovedFromQueue() {
        assertNull(subject.dequeue());

        subject.enqueue("hello");
        subject.enqueue("world");
        subject.enqueue("you got this");

        assertEquals("hello", subject.dequeue());
        assertEquals("world", subject.peek());

        assertEquals("world", subject.dequeue());
        assertEquals("you got this", subject.peek());

        assertEquals("you got this", subject.dequeue());
        assertNull(subject.dequeue());
        assertNull(subject.peek());
    }
}