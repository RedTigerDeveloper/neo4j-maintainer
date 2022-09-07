import { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux';
import { setNodeLabels, setNodeName, addNodeProperties, resetNodeProperties, setProperties } from "../ducks/neo4j-node-form.duck";
import { NodeProperties } from "../shared/node-properties.state";

export function useNeo4jNodeFormState() {
    
    const dispatch = useDispatch()
    const { nodeName, nodeLabels, properties } = useSelector((state: RootState) => state.neo4jNodeForm)

    return {
        nodeName,
        nodeLabels,
        nodeProperties: properties,
        setNodeName: (payload: string) => dispatch(setNodeName(payload)),
        setNodeLabels: (payload: string[]) => dispatch(setNodeLabels(payload)),
        addNodeProperties: (payload: NodeProperties) => dispatch(addNodeProperties(payload)),
        setProperties: (payload: NodeProperties[]) => dispatch(setProperties(payload)),
        resetNodeProperties: () => dispatch(resetNodeProperties())
    }
}