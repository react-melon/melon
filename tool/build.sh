#!/bin/bash

rm -rf dist lib
edp build -f
mv output/asset dist
mkdir -p lib
cp -rf dist/* lib
cp package.json lib
rm -rf output
