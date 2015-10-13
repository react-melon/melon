#!/bin/bash

rm -rf dist
edp build -f -s amd
mv output/asset dist
rm -rf output
