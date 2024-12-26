class MyArray:
    def __init__(self, *items):
        self.__data = []
        for item in items:
            self.__data.append(item)

    def get_all(self):
        return self.__data

    def index(self, item):
        try:
            return self.__data.index(item)
        except Exception:
            return -1

    def push(self, item):
        if item not in self.__data:
            self.__data.append(item)

    def pop(self):
        if self.size() > 0:
            del self.__data[0]

    def delete(self, item):
        if self.index(item) != -1:
            self.__data.remove(item)

    def size(self):
        return len(self.__data)
