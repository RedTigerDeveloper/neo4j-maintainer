# Developer Factory Frontend

## `Neo4j-maintainer` para Nodos y Relaciones de base de datos orientada a grafos Neo4j .

### Caracteristicas

* 1 file python script backend
* swagger backend
* Creación de nodos con etiquetas y propiedades
* Creaction de relaciones con propiedades entre nodos existentes en una base de datos de neo4j
* registro de queries 


## Requisitos

* Docker
* Node 17 o nvm 



## Ejecutar aplicación

Levantar stack completo

```bash
#/bin/bash

# ypu need docker service running on your machine 
# up stack
./up-stack.sh
# open neo4j-maintainer on http://localhost

```

Levantar backend 

```bash
#/bin/bash

# option 1
cd backend/

# neo4j database 
export NEO4J_URI="bolt://localhost:7687"
export NEO4J_USER="neo4j"
export NEO4J_PASS="1234"

gunicorn --reload -w 2 --threads 2 -b 0.0.0.0:8080 server:app
# option 2
cd backend/
./up-server.sh

```

Levantar frontend

```bash
#/bin/bash

# install dependencies (node 17 or higher version)
npm install

# option 1 
export REACT_APP_NEO4J_MAINTAINER_URL="http://localhost:8080"
npm run start
# option 2
./up-frontend.sh

```

si todo se ejecuto sin problemas deberias tener el mantenedor corriendo en http://localhost:80