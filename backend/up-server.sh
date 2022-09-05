#!/bin/bash
clear;


export NEO4J_URI="bolt://localhost:7687"
export NEO4J_USER="neo4j"
export NEO4J_PASS="1234"

gunicorn --reload -w 2 --threads 2 -b 0.0.0.0:8080 server:app
