#!/bin/sh

# cd src/ || exit 1;
# ls -la 
gunicorn --chdir /app server:app -w 2 --threads 2 -b 0.0.0.0:8080
