import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import SelectNodeInput from './SelectNodeInput';
import NameEntityInput from './NameEntityInput';
import SelectLabelInput from './SelectLabelInput';
import SaveAndCancelButtons from '../../../shared/components/SaveAndCancelButtons';
import { useNeo4jNodeFormState } from '../../../../state/hooks/useNeo4jNodeFormState';
import { KeyValueData } from '../dto/key-value-data.dto';
import { createNeo4jNode } from '../../../../../core/application/service/createNeo4jNode';
import swal from 'sweetalert';
import { CreateNeo4jNodeDTO } from '../../../../../core/application/dto/CreateNeo4jNodeDTO';
import KeyValueInput from '../../../shared/components/KeyValueInput';

export default function Neo4jNodeForm() {

  const { 
    node, nodeName, nodeLabels, nodeProperties, 
    setNode, setNodeName, setNodeLabels, resetNodeProperties, setProperties 
  } = useNeo4jNodeFormState()
  const [formValid, setFormValid] = useState(false)

  const handleOnNameChange = (name: string) => {
    setNodeName(name)
  }

  const handleOnLabelsChange = (values: string[]) => {
    setNodeLabels(values)
  }

  const handleOnKeyValueChange = (keyValueData: KeyValueData[]) => {
    setProperties(keyValueData)
  }

  const handleOnSave = async () => {
    
    if (formValid) {

      let neo4jNode: CreateNeo4jNodeDTO = {
        node,
        name: nodeName,
        labels: nodeLabels,
      }
      
      if (nodeProperties && nodeProperties.length > 0) {
        const props: Record<string, any> = {};
        for(let np of nodeProperties) {
          props[np.key] = np.value
        }
        neo4jNode = {
          ...neo4jNode,
          properties: props
        }
      }
      
      await createNeo4jNode(neo4jNode)
        .then(() => swal(`Información`, `Nodo Neo4j ${nodeName} Guardado!`, "success"))
        .catch(e => swal(`Error`, `Nodo Neo4j ${nodeName} no pudo ser guardado ${e.message}`, "error"))
        // .finally(() => handleOnCancel())

    }
  }

  const handleOnCancel = () => {
    setNode('')
    setNodeName('')
    setNodeLabels([])
    resetNodeProperties()
  }

  useEffect(() => {
    setFormValid(![node, nodeName].some(x => x === ''))
  }, [node, nodeName, nodeLabels])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SelectNodeInput value={node} onChange={setNode} />
        </Grid>
        <Grid item xs={6}>
          <NameEntityInput value={nodeName} onChange={handleOnNameChange} />
        </Grid>
        <Grid item xs={12}>
          <SelectLabelInput value={nodeLabels} onChange={handleOnLabelsChange} />
        </Grid>
        <Grid item xs={12}>
          <KeyValueInput value={nodeProperties} onChange={handleOnKeyValueChange} />
        </Grid>
        <Grid item xs={8}>
          <SaveAndCancelButtons disabled={!formValid} onSave={handleOnSave} onCancel={handleOnCancel} />
        </Grid>
      </Grid>
    </Box>
  )

}
