import { CreateNeo4jRelationshipDTO } from "../dto/CreateNeo4jRelationshipDTO";
import Neo4jMaintainerService from "../../../infraestructure/api/Neo4jMaintainerApi";

export default async function createNeo4jRelationship(relationship: CreateNeo4jRelationshipDTO) {
    return Neo4jMaintainerService.createRelationship(relationship)
}