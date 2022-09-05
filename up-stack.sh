#!/bin/bash

# docker ps -aq | xargs docker rm 2>/dev/null
# docker image ls -q | xargs docker rmi -f 2>/dev/null

export NEO4J_URI="bolt://localhost:7687"
export NEO4J_USER="neo4j"
export NEO4J_PASS="1234"
export REACT_APP_NEO4J_MAINTAINER_URL="neo4j-backend"

docker-compose up
