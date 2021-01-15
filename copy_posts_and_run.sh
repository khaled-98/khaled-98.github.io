#!/usr/bin/env bash
docker cp . website-container:/app
docker start -ia website-container