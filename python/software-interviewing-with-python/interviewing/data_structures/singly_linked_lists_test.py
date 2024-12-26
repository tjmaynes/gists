from singly_linked_lists import MySinglyLinkedList

import unittest


class TestMySinglyLinkedList(unittest.TestCase):
    def test_init_whenGivenDefaultValues_itShouldAddValuesToLinkedList(self):
        sut = MySinglyLinkedList(2, 3, 4)

        self.assertEqual([2, 3, 4], sut.to_list())

    def test_init_whenNotGivenDefaultValues_itShouldContainEmptyData(self):
        sut = MySinglyLinkedList()

        self.assertEqual([], sut.to_list())

    def test_append_whenGivenAnValue_itShouldAddValueToEndOfLinkedList(self):
        sut = MySinglyLinkedList()

        sut.append(1)
        sut.append(2)
        sut.append(3)

        self.assertEqual([1, 2, 3], sut.to_list())

    def test_prepend_whenGivenAnValue_itShouldAddValueToFrontOfLinkedList(self):
        sut = MySinglyLinkedList()

        sut.prepend(1)
        sut.prepend(2)
        sut.prepend(3)

        self.assertEqual([3, 2, 1], sut.to_list())

    def test_insert_whenGivenAnValueAndIndex_itShouldAddValueToIndexOfLinkedList(self):
        sut = MySinglyLinkedList(1, 2, 3)

        sut.insert(4, 1)
        sut.insert(5, 3)
        sut.insert(6, 5)
        sut.insert(7, 0)

        self.assertEqual([7, 1, 4, 2, 5, 3, 6], sut.to_list())

    def test_remove_whenGivenAnValue_itShouldRemoveValueToIndexOfLinkedList(self):
        sut = MySinglyLinkedList(1, 2, 3, 4, 5)

        sut.remove(2)
        sut.remove(1)
        sut.remove(4)

        self.assertEqual([3, 5], sut.to_list())

    def test_remove_whenGivenANonExistantValue_itShouldThrowException(self):
        sut = MySinglyLinkedList(1)

        with self.assertRaisesRegex(
            Exception, "Value '2' not found in SinglyLinkedList"
        ):
            sut.remove(2)
