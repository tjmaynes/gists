# Asymptotic Notation and Sorting Project

> ⏳ test the time complexity of various sorting algorithms

Note that the information presented in this section is also included in the README file.

Based on the requirements, the sorting algorithms are in sorting.h, the generated arrays are in arrayGeneration.h, and the testing functions are in main.cpp. Therefore, to compile simply run:

* make clean
* make

The executable will be named main.
For this code we use console output. The project description requires file output which means we must redirect the console output. Therefore, to run the program type:

* make run

Since this is not a simple command, a shell script is provided (test.sh). The script will compile and run the code. Note that you may have update the attributes for test.sh to make it an executable file. To ensure that test.sh is an executable file type:

* chmod +x test.sh

To compile and run the code type:
* make test
