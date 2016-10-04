#!/bin/bash
for i in `seq 1 3`; do
  for j in `seq 101 133`; do
    casperjs bigc.js $i $j
  done
done