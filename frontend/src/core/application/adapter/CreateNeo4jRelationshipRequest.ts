import { CreateNeo4jRelationshipDTO } from "../dto/CreateNeo4jRelationshipDTO";

export interface CreateNeo4jRelationshipRequest {
    createRelationship: (neo4jRelationship: CreateNeo4jRelationshipDTO) => Promise<any>;
}