package interviewing.exercises;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static interviewing.exercises.MergeSortedArrays.mergeSortedArrays;
import static org.junit.jupiter.api.Assertions.*;

class MergeSortedArraysTest {
    @Test
    void whenGivenTwoValidArrays_itShouldMergeTheTwoArraysTogether() {
        List<Integer> arr1 = Arrays.asList(0, 2, 8, 14, 55);
        List<Integer> arr2 = Arrays.asList(1, 14, 77);
        List<Integer> expected = Arrays.asList(0, 1, 2, 8, 14, 14, 55, 77);

        assertEquals(expected, mergeSortedArrays(arr1, arr2));

        arr1 = Arrays.asList(0, 2, 8);
        arr2 = Arrays.asList(1, 14, 77, 99);
        expected = Arrays.asList(0, 1, 2, 8, 14, 77, 99);

        assertEquals(expected, mergeSortedArrays(arr1, arr2));
    }
}