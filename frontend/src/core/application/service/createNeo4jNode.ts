import Neo4jMaintainerService from "../../../infraestructure/api/Neo4jMaintainerApi";
import { CreateNeo4jNodeDTO } from "../dto/CreateNeo4jNodeDTO";

const transformValue = (value: string) => value? value.replaceAll(' ', '_') : ''

export async function createNeo4jNode(neo4jNode: CreateNeo4jNodeDTO) {
    const newNode: CreateNeo4jNodeDTO = { 
        ...neo4jNode,
        labels: neo4jNode.labels.map(l => transformValue(l))
    }
    return Neo4jMaintainerService.createNode(newNode)
}