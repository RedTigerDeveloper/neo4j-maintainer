import { useEffect, useState } from "react"
import neo4jMaintainerService from "../../../../api/Neo4jMaintainerApi"

export function useNodeNames() {
    const [names, setNames] = useState<string[]>([])
    useEffect(() => {
        neo4jMaintainerService
            .getNodeNames()
            .then(data => setNames(data))
    }, [])
    return {
        names
    }
}