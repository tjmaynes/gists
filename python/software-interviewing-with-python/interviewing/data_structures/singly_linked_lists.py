class SinglyLinkedListNode:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next


class MySinglyLinkedList:
    def __init__(self, *values):
        self.__head = None
        self.__tail = self.__head
        self.__length = 0

        for value in values:
            self.append(value)

    def append(self, value):
        if self.__length == 0:
            self.__head = SinglyLinkedListNode(value)
            self.__tail = self.__head
        else:
            new_node = SinglyLinkedListNode(value)
            if self.__tail is not None:
                self.__tail.next = new_node
                self.__tail = new_node
        self.__length += 1

    def prepend(self, value):
        if self.__length == 0:
            self.__head = SinglyLinkedListNode(value)
        else:
            new_node = SinglyLinkedListNode(value, self.__head)
            self.__head = new_node
        self.__length += 1

    def insert(self, value, index):
        new_node = SinglyLinkedListNode(value)
        prev_node = self.__traverse_to_index(index)

        if index == 0:
            new_node.next = prev_node
            self.__head = new_node
        elif prev_node is not None:
            new_node.next = prev_node.next
            prev_node.next = new_node

        if index == self.__length:
            self.__tail = new_node

        self.__length += 1

    def remove(self, value):
        if self.__head is not None and self.__head.data != value:
            prev_node = self.__head

            while prev_node.next is not None:
                if prev_node.next is not None:
                    if prev_node.next.data == value:
                        break
                prev_node = prev_node.next

            if prev_node is not None and prev_node.next is not None:
                prev_node.next = prev_node.next.next
            else:
                raise Exception(
                    "Value '{}' not found in SinglyLinkedList".format(value)
                )
        elif self.__head is not None:
            self.__head = self.__head.next

        self.__length -= 1

    def __traverse_to_index(self, index):
        curr = self.__head
        for i in range(index - 1):
            if curr is not None:
                curr = curr.next
        return curr

    def size(self):
        return self.__length

    def to_list(self):
        if self.__length == 0:
            return []

        result = []
        curr = self.__head
        while curr is not None:
            result.append(curr.data)
            curr = curr.next
        return result
