#!/bin/sh
# node genEntry.js
NODE_ENV=production
../../node_modules/.bin/webpack --progress -p
node server.js