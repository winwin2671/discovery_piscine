#! /bin/bash

if (($# == 0)) #check numbers of user input 
then
    echo "No arguments supplied"
fi

for i in $@; #check array of user files input
do 
mkdir ex$i
done


