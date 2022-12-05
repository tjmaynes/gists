package interviewing.datastructures.hashtable;

import interviewing.datastructures.hashtable.MyHashTableImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class MyHashTableImpTest {
    MyHashTableImp<String, Integer> subject;

    @BeforeEach
    void setup() {
        subject = new MyHashTableImp();
    }

    @Test
    void set_whenGivenAnInputThatDoesNotExistInHashTable_itShouldUpdateTheHashTable() {
        subject.set("hello", 10000);
        assertEquals(Optional.of(10000), subject.get("hello"));

        subject.set("hellos", 10004);
        assertEquals(Optional.of(10004), subject.get("hellos"));

        subject.set("world", 412412);
        assertEquals(Optional.of(412412), subject.get("world"));

        assertEquals(Optional.of(10000), subject.get("hello"));
    }

    @Test
    void remove_whenGivenAnExistingItem_itShouldRemoveTheItemFromTable() {
        subject.set("hello-world", 999999);
        assertEquals(Optional.of(999999), subject.get("hello-world"));

        Optional<Integer> result = subject.remove("hello-world");

        assertEquals(Optional.of(999999), result);
        assertEquals(Optional.empty(), subject.get("hello-world"));
    }
}