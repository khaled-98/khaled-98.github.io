#!/usr/bin/env bash
docker build -t my-website .
docker run --rm -it --network host my-website