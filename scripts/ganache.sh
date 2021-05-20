#!/bin/sh

start_ganache(){
    echo 🧁⏳ Starting Ganache...
    nohup node_modules/.bin/ganache-cli > ganache.out &
    GANACHE_PID=$!
    while [ `cat ganache.out | grep -c Listening` -eq 0 ]
    do
        # echo Sleeping for one more second
        sleep 1
    done
    echo 🧁✔️ Ganache is up❕
}

exit_ganache(){
    kill $GANACHE_PID
    echo 🧁🛑 Ganache exited❕    
}