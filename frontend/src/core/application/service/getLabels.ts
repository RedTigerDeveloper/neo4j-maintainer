import Neo4jMaintainerService from "../../../infraestructure/api/Neo4jMaintainerApi";

export async function getLabels() {
    try {
        return await Neo4jMaintainerService.getLabels()
    } catch(e) {
        return []
    }
}