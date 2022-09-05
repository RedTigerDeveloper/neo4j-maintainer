# Developer Factory Frontend

Frontend mantenedor para Nodos y Relaciones de una base de datos Neo4j.

### Caracteristicas

* Creación de nodos con etiquetas y propiedades
* Creaction de relaciones con propiedades entre nodos existentes en una base de datos de neo4j


## Requisitos

* Docker
* Developer-factory-backend
* Node 17 o nvm 


Developer-factory-backend se encuentra en la siguiente url [https://github.com/bnjmnsepulveda/developer-factory-backend.git](https://github.com/bnjmnsepulveda/developer-factory-backend.git)

## Ejecutar aplicación

Lavantar backend

```bash
#/bin/bash

# get developer-factory-backend
git clone https://github.com/bnjmnsepulveda/developer-factory-backend.git
cd developer-factory-backend

# init developer-factory stack. you must have docker running locally
chmod +x up-developer-factory-stack.sh

# up stack
./up-developer-factory-stack.sh

```

Levantar frontend

```bash
#/bin/bash

# install dependencies (node 17 or higher version)
npm install

# start script
chmod +x up-frontend.sh
./up-frontend.sh

```

si todo se ejecuto sin problemas deberias tener el mantenedor corriendo en http://localhost:8080