import os
from neo4j import GraphDatabase
from flask import Flask, request
from flask_cors import CORS
from flasgger.utils import swag_from
from flasgger import Swagger


NEO4J_CONFIG = {
    'uri': os.environ['NEO4J_URI'],
    'user': os.environ['NEO4J_USER'],
    'pass': os.environ['NEO4J_PASS']
}


class Neo4jNode:

    labels = []
    properties = dict()

    def __init__(self, node, name):
        self.node = node
        self.name = name

    @staticmethod
    def from_dict(json):
        neo4j_node = Neo4jNode(node=json['node'], name=json['name'])
        if json.get('labels') is not None:
            neo4j_node.labels = json['labels']
        if json.get('properties') is not None:
            neo4j_node.properties = json['properties']
        return neo4j_node

    def __repr__(self):
        return f"Neo4jNode(name={self.name}, node={self.node}, labels={self.labels}, properties={self.properties})"


class Neo4jRelationship:

    properties = dict()

    def __init__(self, name, node_a, node_b):
        self.name = name
        self.node_a = node_a
        self.node_b = node_b

    @staticmethod
    def from_dict(value):
        relation = Neo4jRelationship(
            value['name'],
            value['node_a'],
            value['node_b']
        )
        if 'properties' in value:
            relation.properties = value['properties']
        return relation

    def __repr__(self):
        return f"Neo4jRelationship(name={self.name}, nodeA={self.node_a}, nodeB={self.node_b}, properties={self.properties})"


class Neo4jConnection:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def write(self, query_operation, **kwargs):
        with self.driver.session() as session:
            return session.write_transaction(query_operation, **kwargs)

    def read(self, query_operation, **kwargs):
        with self.driver.session() as session:
            return session.read_transaction(query_operation, **kwargs)


def log_query(query, params):
    # format query
    formatted_query = ''
    for x in query.strip().split('\n'):
        formatted_query += f'{x.strip()}\n'
    query = formatted_query.strip()
    # append properties
    for k, v in params.items():
        key = f'${k}'
        value = f'"{v}"' if not v.isdigit() else f'{v}'
        query = query.replace(key, value)
    # write logfile
    with open('queries/operations.cql', 'a') as f:
        close_query = ';' if query[-1] != ';' else ''
        final_query = f'{query}{close_query}\n'
        print(final_query)
        f.write(final_query)


def create_neo4j_connection():
    return Neo4jConnection(
        NEO4J_CONFIG['uri'],
        NEO4J_CONFIG['user'],
        NEO4J_CONFIG['pass']
    )


def write_on_neo4j(query):
    neo4j_connection = None
    try:
        neo4j_connection = create_neo4j_connection()
        return neo4j_connection.write(query)
    finally:
        if neo4j_connection is not None:
            neo4j_connection.close()


def read_from_neo4j(query):
    neo4j_connection = None
    try:
        neo4j_connection = create_neo4j_connection()
        return neo4j_connection.read(query)
    finally:
        if neo4j_connection is not None:
            neo4j_connection.close()


def create_neo4j_node(neo4j_node: Neo4jNode):

    query_labels = [neo4j_node.node]
    query_labels.extend(neo4j_node.labels)
    query_labels = ':'.join(query_labels)

    properties = {'name': neo4j_node.name}
    properties = {**properties, **neo4j_node.properties}
    query_properties = ', '.join('{0}: ${0}'.format(n) for n in properties)

    def create_node(tx):
        query = f"CREATE (n:{query_labels} {{ {query_properties} }}) RETURN n"
        log_query(query, properties)
        tx.run(query, **properties)

    return write_on_neo4j(create_node)


def create_neo4j_relationship(neo4j_relationship: Neo4jRelationship):

    properties = {
        'nodeA': neo4j_relationship.node_a,
        'nodeB': neo4j_relationship.node_b
    }
    properties = {**properties, **neo4j_relationship.properties}
    query_properties = ', '.join('{0}: ${0}'.format(n) for n in neo4j_relationship.properties)

    def create_relationship(tx):
        query = f"""
            MATCH (na), (nb) 
               WHERE na.name = $nodeA AND nb.name = $nodeB 
            CREATE (na)-[r:{neo4j_relationship.name} {{ {query_properties} }}]->(nb) 
        """
        log_query(query, properties)
        tx.run(query, **properties)

    return write_on_neo4j(create_relationship)


def get_neo4j_labels():

    def query(tx):
        return [row[0] for row in tx.run('call db.labels()')]

    return read_from_neo4j(query)


def get_neo4j_node_names():

    def query(tx):
        return [row['node_name'] for row in tx.run('MATCH (n) RETURN n.name AS node_name')]

    return read_from_neo4j(query)


app = Flask(__name__)
CORS(app)
Swagger(app)


def response(data=None, message='OK', status=200):
    return {
        'data': data,
        'message': message,
        'status': status
    }


@app.route('/', methods=['GET'])
@swag_from('./apidocs/root.yml')
def root():
    return response(data={
        'app': 'Neo4j-maintainer app'
    })


@app.route('/neo4j/node/name', methods=['GET'])
@swag_from('./apidocs/neo4j-node-names.yml')
def get_neo4j_node_name_request():
    return response(data=get_neo4j_node_names())


@app.route('/neo4j/node/label', methods=['GET'])
@swag_from('./apidocs/neo4j-node-labels.yml')
def get_neo4j_node_label_request():
    return response(data=get_neo4j_labels())


@app.route('/neo4j/node', methods=['POST'])
@swag_from('./apidocs/create-neo4j-node.yml')
def create_neo4j_node_request():
    body = request.get_json()
    neo4j_node = Neo4jNode.from_dict(body)
    create_neo4j_node(neo4j_node)
    return response(
        status=201,
        message=f'Neo4j Node(={neo4j_node.name}) Created'
    )


@app.route("/neo4j/relationship", methods=['POST'])
@swag_from('./apidocs/create-neo4j-relationship.yml')
def create_neo4j_relationship_request():
    body = request.get_json()
    neo4j_relationship = Neo4jRelationship.from_dict(body)
    create_neo4j_relationship(neo4j_relationship)
    return response(
        status=201,
        message=f'Neo4j Node(={neo4j_relationship.name}) Created)'
    )


if __name__ == '__main__':
    app.run(debug=True)


