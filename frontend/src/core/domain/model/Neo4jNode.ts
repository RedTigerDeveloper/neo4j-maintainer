import { EntityBase } from "./EntityBase";

export interface Neo4jNode extends EntityBase {
    node: string;
    labels: string[];
}