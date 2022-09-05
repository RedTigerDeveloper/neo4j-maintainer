import { EntityBase } from "./EntityBase";
import { Neo4jNode } from "./Neo4jNode";

export interface Neo4jRelationship extends EntityBase {
    parent: Neo4jNode;
    children: Neo4jNode;
}