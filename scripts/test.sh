#!/bin/bash
parent_folder=$(dirname "${BASH_SOURCE[0]}")
source $parent_folder/ganache.sh

start_ganache
find . -type f -name "*.out" -delete
truffle test
if [ $CI ];
then
  codechecks
fi
exit_ganache