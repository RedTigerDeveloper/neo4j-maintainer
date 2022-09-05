import { CreateNeo4jNodeDTO } from "../dto/CreateNeo4jNodeDTO";

export interface CreateNeo4jNodeRequest {
    createNode: (neo4jNode: CreateNeo4jNodeDTO) => Promise<any>;
}