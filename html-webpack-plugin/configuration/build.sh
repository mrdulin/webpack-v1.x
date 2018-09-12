#!/bin/sh
rm -rf ./dist
webpack --colors -profile --display-modules
../../node_modules/.bin/webpack-dev-server --content-base dist/ --port 9999
