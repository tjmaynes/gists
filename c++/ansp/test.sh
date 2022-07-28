#!/bin/sh

clear

if
    time g++ main.cpp
then
    time ./a.out > output.txt
fi
