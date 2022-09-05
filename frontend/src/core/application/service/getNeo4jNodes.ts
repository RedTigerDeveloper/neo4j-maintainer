import { Neo4jNode } from "../../domain/model/Neo4jNode";

export function getAllNeo4jNodes():  Neo4jNode[]{
    return [
        {
            id: 'a',
            node: 'Framekork',
            name: 'Nestjs',
            labels: ['Frameworks', 'Backend']
        },
        {
            id: 'b',
            node: 'Language',
            name: 'typescript',
            labels: ['Languages', 'Fullstack']
        }
    ]
}