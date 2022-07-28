// Author: TJ Maynes <tjmaynes at gmail dot com>
// File: ArrayGeneration.h
//

#ifndef ARRAYGENERATION_H_
#define ARRAYGENERATION_H_

#include <iostream>
#include <algorithm>
#include <string>
#include <vector>

using namespace std;

class ArrayGeneration {
 public:
  int *generateIncreasingArray(const int& size);
  int *generateDecreasingArray(const int& size);
  int *generateRandomArray(const int& size);
  template<typename T> T* generateConstArray(T value, const int& size);
  template<typename T> void prettyPrint(T* items, const int& size);
};

#endif

int* ArrayGeneration::generateIncreasingArray(const int& size) {
  int *increasingArray = new int[size];

  for(int i = 0; i < size; i++)
    increasingArray[i] = i;

  return increasingArray;
}

int* ArrayGeneration::generateDecreasingArray(const int& size) {
  int *decreasingArray = new int[size];

  for (int i = size; i <= 0; --i)
    decreasingArray[i] = i;

  return decreasingArray;
}

int* ArrayGeneration::generateRandomArray(const int& size) {
  int *randomArray = generateIncreasingArray(size);
  int randomNumber = 0;

  for (int i = 0; i < size; i++) {
    randomNumber = (rand() % size);
    swap(randomArray[randomNumber], randomArray[i]);
  }

  return randomArray;
}

template<typename T>
T* ArrayGeneration::generateConstArray(T value, const int& size) {
  T* constantArray = new T[size];

  for (int i = 0; i < size; i++)
    constantArray[i] = value;

  return constantArray;
}

template<typename T>
void ArrayGeneration::prettyPrint(T* items, const int& size) {
  for (int i = 0; i < size; i++)
    std::cout << items[i] << " ";
}
