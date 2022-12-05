package interviewing.datastructures.linkedlist;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class MyDoublyLinkedListTest {
    private MyDoublyLinkedListImpl<Integer> subject;

    @BeforeEach
    void setup() {
        subject = new MyDoublyLinkedListImpl();
    }

    @Test
    void append_whenGivenAnItem_itShouldAddToTheEndofTheLinkedList() {
        assertLinkedList(List.of(1), subject.append(1));
        assertLinkedList(List.of(1, 5), subject.append(5));
        assertLinkedList(List.of(1, 5, 10), subject.append(10));
    }

    @Test
    void prepend_whenGivenAnItem_itShouldAddToTheFrontOfTheLinkedList() {
        assertLinkedList(List.of(1), subject.prepend(1));
        assertLinkedList(List.of(5, 1), subject.prepend(5));
        assertLinkedList(List.of(0, 5, 1), subject.prepend(0));
    }

    @Test
    void insert_whenGivenAnItem_itShouldAddItToTheLinkedList() {
        assertLinkedList(List.of(1), subject.insert(1, 0));
        assertLinkedList(List.of(1, 1), subject.insert(1, 1));
        assertLinkedList(List.of(16, 1, 1), subject.insert(16, 0));
        assertLinkedList(List.of(3, 16, 1, 1), subject.insert(3, 0));
        assertLinkedList(List.of(3, 16, 5, 1, 1), subject.insert(5, 2));
    }

    @Test
    void remove_whenGivenAnItem_itShouldAddItToTheLinkedList() {
        subject.insert(5, 0);
        subject.insert(4, 0);
        subject.insert(3, 0);
        subject.insert(2, 0);
        subject.insert(1, 0);

        assertLinkedList(List.of(1, 2, 3, 4, 5), subject);

        assertLinkedList(List.of(1, 2, 3, 4, 5), subject.remove(-1));
        assertLinkedList(List.of(1, 2, 3, 4, 5), subject.remove(10));

        assertLinkedList(List.of(1, 2, 3, 5), subject.remove(3));
        assertLinkedList(List.of(1, 3, 5), subject.remove(1));
        assertLinkedList(List.of(1, 3), subject.remove(2));
        assertLinkedList(List.of(3), subject.remove(0));
        assertLinkedList(List.of(), subject.remove(0));
        assertLinkedList(List.of(), subject.remove(0));
    }

    @Test
    void lookup_whenAnItemIsAvailable_itShouldReturnTheItemByIndex() {
        subject.insert(5, 0);
        subject.insert(4, 0);
        subject.insert(3, 0);
        subject.insert(2, 0);
        subject.insert(1, 0);

        assertEquals(Optional.empty(), subject.lookup(-1));
        assertEquals(Optional.of(1), subject.lookup(0));
        assertEquals(Optional.of(2), subject.lookup(1));
        assertEquals(Optional.of(3), subject.lookup(2));
        assertEquals(Optional.of(4), subject.lookup(3));
        assertEquals(Optional.of(5), subject.lookup(4));
        assertEquals(Optional.empty(), subject.lookup(5));
    }

    /* This one is difficult, need to come back to this later. */
    @Test
    void reverse_whenItemsExist_shouldReverseTheItemsInTheLinkedList() {
        subject.insert(5, 0);
        subject.insert(4, 0);
        subject.insert(3, 0);
        subject.insert(2, 0);
        subject.insert(1, 0);

        assertLinkedList(List.of(1, 2, 3, 4, 5), subject);

        assertLinkedList(List.of(5, 4, 3, 2, 1), subject.reverse());
    }

    private void assertLinkedList(List<Integer> expected, MyDoublyLinkedListImpl<Integer> linkedList) {
        DoublyListNode<Integer> head = linkedList.head;

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