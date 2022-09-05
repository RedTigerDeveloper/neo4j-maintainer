import { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux';
import { setNode, setNodeLabels, setNodeName, addNodeProperties, resetNodeProperties, setProperties } from "../ducks/neo4j-node-form.duck";
import { NodeProperties } from "../shared/node-properties.state";

export function useNeo4jNodeFormState() {
    
    const dispatch = useDispatch()
    const { node, nodeName, nodeLabels, properties } = useSelector((state: RootState) => state.neo4jNodeForm)

    return {
        node,
        nodeName,
        nodeLabels,
        nodeProperties: properties,
        setNode: (payload: string) => dispatch(setNode(payload)),
        setNodeName: (payload: string) => dispatch(setNodeName(payload)),
        setNodeLabels: (payload: string[]) => dispatch(setNodeLabels(payload)),
        addNodeProperties: (payload: NodeProperties) => dispatch(addNodeProperties(payload)),
        setProperties: (payload: NodeProperties[]) => dispatch(setProperties(payload)),
        resetNodeProperties: () => dispatch(resetNodeProperties())
    }
}