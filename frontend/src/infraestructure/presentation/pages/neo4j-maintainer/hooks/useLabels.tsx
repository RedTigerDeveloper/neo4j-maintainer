import { useEffect, useState } from "react"
import neo4jMaintainerService from "../../../../api/Neo4jMaintainerApi"

export function useLabels() {
    const [labels, setLabels] = useState<string[]>([])
    useEffect(() => {
        neo4jMaintainerService
            .getLabels()
            .then(data => setLabels(data))
    }, [])
    return {
        labels
    }
}