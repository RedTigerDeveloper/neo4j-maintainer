
export interface CreateNeo4jNodeDTO{ 
    node: string;
    name: string;
    labels: string[];
    properties?: Record<string, any>;
}
