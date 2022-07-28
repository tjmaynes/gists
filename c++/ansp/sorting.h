// Author: TJ Maynes <tjmaynes at gmail dot com>
// File: Sorting.h
//

#ifndef SORTING_H_
#define SORTING_H_

#include "arrayGeneration.h"
#include <queue>

bool isRandomPivot;

class Sorting {
 public:
  template<typename T> void insertionSort(T* items, const int& size);
  template<typename T> void bubbleSort(T* items, const int& size);
  template<typename T> void selectionSort(T* items, const int& size);
  template<typename T> void quickSort(T* items, const int& size);
  template<typename T> void mergeSort(T* items, const int& size);
  template<typename T> bool isSorted(T* items, const int& size);
  template<typename T> void prettyPrint(T* items, const int& size);
 private:
  template<typename T> void quick_sort(T *items, int low, int high);
  template<typename T> int partition(T *items, int low, int high);
  template<typename T> void merge_sort(T *items, int low, int high);
  template<typename T> void merge(T *items, int low, int middle, int high);
};

#endif

template<typename T>
void Sorting::bubbleSort(T *items, const int& size) {
    for (int i = 0; i < size; i++)
        for (int j = 0; j < size; j++)
            if (items[j] < items[j+1])
                swap(items[j], items[j+1]);
}

template<typename T>
void Sorting::insertionSort(T *items, const int& size) {
    int j = 0;
    for (int i = 0; i < size; i++) {
        j = i;
        while ((items[j] < items[j+1]) && (j > 0)) {
            swap(items[j], items[j+1]);
            j -= 1;
        }
    }
}

template<typename T>
void Sorting::selectionSort(T *items, const int& size) {
    int min = 0;
    for (int i = 0; i < size; i++) {
        min = i;
        for (int j = i + 1; j < size + 1; j++)
            if (items[j] < items[min])
                min = j;
        if (i != min)
            swap(items[i], items[min]);
    }
}

template<typename T>
void Sorting::mergeSort(T *items, const int& size) {
    int low = 0;
    int high = size - 1;
    merge_sort(items, low, high);
}

template<typename T>
void Sorting::merge_sort(T *items, int low, int high) {
    if (low < high) {
        int middle = (high + low)/2;
        merge_sort(items, low, middle); // lower half
        merge_sort(items, middle + 1, high); //upper half
        merge(items, low, middle, high);
    }
}

template<typename T>
void Sorting::merge(T *items, int low, int middle, int high) {
    int i = 0;
    std::queue <T> left, right;
    
    // setup lower half in queue left
    for (i = low; i <= middle; i++)
        left.push(items[i]);

    // setup upper half in queue right
    for (i = middle + 1; i < high; i++)
        right.push(items[i]);

    while(!(left.empty() || right.empty())) {
        if (left.front() < right.front()) {
            T left_front = left.front();
            items[i++] = left_front;
            left.pop();
        } else {
            T right_front = right.front();
            items[i++] = right_front;
            right.pop();
        }
    }

    // push whatever is leftover from left queue to items
    while(!left.empty()) {
        T left_front = left.front();
        items[i++] = left_front;
        left.pop();
    }

    // push whatever is leftover from right queue to items
    while(!right.empty()) {
        T right_front = right.front();
        items[i++] = right_front;
        right.pop();
    }
}

template<typename T>
void Sorting::quickSort(T *items, const int& size) {
    int low = 0;
    int high = size - 1;
    quick_sort(items, low, high);
}

template<typename T>
void Sorting::quick_sort(T *items, int low, int high) {
    if (low < high) {
        int p = partition(items, low, high);
        quick_sort(items, low, p - 1);
        quick_sort(items, p + 1, high);
    }
}

template<typename T>
int Sorting::partition(T *items, int low, int high) {
    int pivot = high;
    int temp = low;

    for (int j = low; j < high; j++)
        if(items[j] < items[pivot]) {
            swap(items[temp], items[j]);
            temp += 1;
        }

    swap(items[temp], items[high]);

    return temp;
}

template<typename T>
void Sorting::prettyPrint(T *items, const int& size) {
    for (int i = 0; i < size; i++)
        std::cout << items[i] << " " << std::endl;
}
