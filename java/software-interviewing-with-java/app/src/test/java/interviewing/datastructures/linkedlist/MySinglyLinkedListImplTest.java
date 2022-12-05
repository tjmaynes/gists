package interviewing.datastructures.linkedlist;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class MySinglyLinkedListImplTest {
    private MySinglyLinkedListImpl<Integer> subject;

    @BeforeEach
    void setup() {
        subject = new MySinglyLinkedListImpl(5, null);
    }

    @Test
    void append_whenGivenAnItem_itShouldAddToTheEndOfTheLinkedList() {
        assertLinkedList(List.of(5, 6), subject.append(6));
        assertLinkedList(List.of(5, 6, 7), subject.append(7));
    }

    @Test
    void prepend_whenGivenAnItem_itShouldAddToTheFrontOfTheLinkedList() {
        assertLinkedList(List.of(1, 5), subject.prepend(1));
        assertLinkedList(List.of(0, 1, 5), subject.prepend(0));
    }

    @Test
    void insert_whenGivenAnItem_itShouldAddItToTheLinkedList() {
        assertLinkedList(List.of(5, 1), subject.insert(1, 1));
        assertLinkedList(List.of(16, 5, 1), subject.insert(16, 0));
        assertLinkedList(List.of(3, 16, 5, 1), subject.insert(3, 0));
    }

    @Test
    void remove_whenGivenAnItem_itShouldAddItToTheLinkedList() {
        subject.insert(4, 0);
        subject.insert(3, 0);
        subject.insert(2, 0);
        subject.insert(1, 0);

        assertLinkedList(List.of(1, 2, 3, 4, 5), subject);

        assertLinkedList(List.of(1, 2, 3, 5), subject.remove(3));
        assertLinkedList(List.of(1, 3, 5), subject.remove(1));
        assertLinkedList(List.of(1, 3), subject.remove(2));
        assertLinkedList(List.of(3), subject.remove(0));
        assertLinkedList(List.of(), subject.remove(0));
        assertLinkedList(List.of(), subject.remove(0));
    }

    private void assertLinkedList(List<Integer> expected, MySinglyLinkedListImpl<Integer> linkedList) {
        SinglyListNode<Integer> head = linkedList.head;

        int index = 0;
        while (index < expected.size()) {
            assertEquals(expected.get(index), head.value);

            index += 1;
            head = head.next;
        }

        if (expected.size() > 0) {
            assertEquals(expected.get(index - 1), linkedList.tail.value, "Tail value is wrong!");
        } else {
            assertNull(linkedList.tail, "Tail value is wrong!");
        }

        assertEquals(index, expected.size());
    }
}