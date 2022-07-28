CFLAGS = -Wall -o
PROGRAM = main

build:
	g++ main.cpp $(CFLAGS) $(PROGRAM)

run: build
	./main > output.txt

test:
	chmod +x ./test.sh
	./test.sh

clean:
	rm -f $(PROGRAM)

.PHONY: build run test clean
