#!/bin/bash

rm -rf dist
edp build -f
mv output/asset dist
rm -rf output
