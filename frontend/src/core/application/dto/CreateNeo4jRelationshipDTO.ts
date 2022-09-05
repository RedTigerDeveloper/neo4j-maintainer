
export interface CreateNeo4jRelationshipDTO { 
    name: string;
    nodeA: string;
    nodeB: string;
    properties?: Record<string, any>;
}
