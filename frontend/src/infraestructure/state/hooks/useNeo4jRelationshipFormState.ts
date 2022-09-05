import { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux';
import { setName, setNodeA, setNodeB, setProperties } from "../ducks/neo4j-relationship-form.duck";
import { NodeProperties } from "../shared/node-properties.state";

export function useNeo4jRelationshipFormState() {
    
    const dispatch = useDispatch()
    const { name, nodeA, nodeB, properties } = useSelector((state: RootState) => state.neo4jRelationshipForm)

    return {
        name, 
        nodeA, 
        nodeB,
        properties,
        setName: (payload: string) => dispatch(setName(payload)),
        setNodeA: (payload: string) => dispatch(setNodeA(payload)),
        setNodeB: (payload: string) => dispatch(setNodeB(payload)),
        setProperties: (payload: NodeProperties[]) => dispatch(setProperties(payload))
    }
}