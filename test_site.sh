#!/usr/bin/env bash
docker build -t my-website .
docker run --name website-container -it --network host my-website