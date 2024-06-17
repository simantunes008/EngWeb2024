#!/bin/bash
mongoimport --host mongodb -d ruas -c ruas --type json --file /ruas.json --jsonArray
mongoimport --host mongodb -d users -c users --type json --file /users.json --jsonArray
