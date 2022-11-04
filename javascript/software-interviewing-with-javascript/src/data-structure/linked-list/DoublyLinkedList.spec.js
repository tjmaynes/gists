import { MyDoublyLinkedList } from "./DoublyLinkedList";

describe("MyDoublyLinkedList", () => {
    let linkedList;

    beforeEach(() => {
        linkedList = new MyDoublyLinkedList();
    });
    
    describe("#append", () => {
        describe("when given an item", () => {
            it("should add the item to the end of the list", () => {
                assertLinkedList([10], linkedList.append(10));
                assertLinkedList([10, 5], linkedList.append(5));
                assertLinkedList([10, 5, 7], linkedList.append(7));
            });
        });
    });

    describe("#prepend", () => {
        describe("when given an item", () => {
            it("should add the item to the beginning of the list", () => {
                assertLinkedList([10], linkedList.prepend(10));
                assertLinkedList([5, 10], linkedList.prepend(5));
                assertLinkedList([2, 5, 10], linkedList.prepend(2));
            });
        });
    });

    describe("#insert", () => {
        describe("when given an item", () => {
            it("should add the item to a specific place in the linked list", () => {
                assertLinkedList([10], linkedList.insert(10, 0));
                assertLinkedList([10, 5], linkedList.insert(5, 1));
                assertLinkedList([10, 2, 5], linkedList.insert(2, 1));
                assertLinkedList([99, 10, 2, 5], linkedList.insert(99, 0));
            });
        });
    });

    describe("#remove", () => {
        describe("when an item exists", () => {
            beforeEach(() => {
                [10, 5, 0].forEach((item) => linkedList.append(item));
                assertLinkedList([10, 5, 0], linkedList);
            });

            it("should remove the item from a specific place in the linked list", () => {
                assertLinkedList([10, 5], linkedList.remove(2));
                assertLinkedList([5], linkedList.remove(0));
                assertLinkedList([], linkedList.remove(0));
            });
        });
    });

    function assertLinkedList(expected, actual) {
        let head = actual._head;

        let index = 0;
        while (index < expected.length) {
            expect(expected[index]).toBe(head.value);

            index += 1;
            head = head.next;
        }

        if (expected.length > 0) {
            expect(expected[index - 1]).toBe(actual._tail.value);
        } else {
            expect(actual._tail).toBeNull();
        }
    }
})