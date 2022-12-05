package interviewing.datastructures.array;

import interviewing.exceptions.ItemNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class MyArrayImpTest {
    private MyArrayImp subject;

    @BeforeEach
    public void setup() {
        subject = new MyArrayImp();
    }

    @Test
    void get_whenItemsAreAvailable_itShouldBeAbleToGetItemByIndex() throws RuntimeException {
        Arrays.asList(10, 12).forEach(subject::push);

        assertEquals(10, subject.get(0));
        assertEquals(12, subject.get(1));
    }

    @Test
    void get_whenItemIsNotInMyArray_throwsItemNotFoundException() {
        assertThrows(ItemNotFoundException.class, () -> { subject.get(-1); });
        assertThrows(ItemNotFoundException.class, () -> { subject.get(1000000); });
    }

    @Test
    void push_whenPushingAnItem_itShouldNotAddADuplicateEntry() throws RuntimeException {
        assertEquals(0, subject.push(10));
        assertEquals(1, subject.push(12));
        assertEquals(2, subject.push(14));
        assertEquals(2, subject.push(14));

        assertEquals(Arrays.asList(10, 12, 14), subject.getAll());
    }

    @Test
    void pop_whenItemsAreAvailable_shouldReturnLastItem() {
        Arrays.asList(10, 12, 14).forEach(subject::push);

        assertEquals(14, subject.pop());
        assertEquals(Arrays.asList(10, 12), subject.getAll());

        assertEquals(12, subject.pop());
        assertEquals(Arrays.asList(10), subject.getAll());
    }

    @Test
    void pop_whenMyArrayIsEmpty_throwsItemNotFoundException() {
        assertThrows(ItemNotFoundException.class, () -> { subject.pop(); });
    }

    @Test
    void delete_whenSpecifiedItemIsAvailable_shouldReturnDeletedItem() {
        Arrays.asList(10, 12, 14, 16).forEach(subject::push);

        subject.delete(2);
        assertEquals(Arrays.asList(10, 12, 16), subject.getAll());

        subject.delete(1);
        assertEquals(Arrays.asList(10, 16), subject.getAll());
    }

    @Test
    void delete_whenGivenANonExistantIndex_throwsIndexOutOfBoundsException() {
        assertThrows(IndexOutOfBoundsException.class, () -> { subject.delete(-1); });

        Arrays.asList(10, 12, 14).forEach(subject::push);

        assertThrows(IndexOutOfBoundsException.class, () -> { subject.delete(4); });
    }

    @Test
    void size_returnsTheLengthOfTheArray() {
        assertEquals(0, subject.size());

        Arrays.asList(10, 12, 14).forEach(subject::push);

        assertEquals(3, subject.size());
    }
}