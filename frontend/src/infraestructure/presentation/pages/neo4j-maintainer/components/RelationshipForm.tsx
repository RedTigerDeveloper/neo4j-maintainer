import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SaveAndCancelButtons from '../../../shared/components/SaveAndCancelButtons';
import { Grid } from '@mui/material';
import swal from 'sweetalert';
import SelectEntityInput from './SelectEntityInput';
import NewRelationshipInput from './NewRelationshipInput';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNodeNames } from '../hooks/useNodeNames';
import { useNeo4jRelationshipFormState } from '../../../../state/hooks/useNeo4jRelationshipFormState';
import createNeo4jRelationship from '../../../../../core/application/service/createNeo4jRelationship';
import KeyValueInput from '../../../shared/components/KeyValueInput';
import { KeyValueData } from '../dto/key-value-data.dto';
import { CreateNeo4jRelationshipDTO } from '../../../../../core/application/dto/CreateNeo4jRelationshipDTO';

export function RelationshipForm() {

    const {
        name, nodeA, nodeB, properties,
        setName, setNodeA, setNodeB, setProperties
    } = useNeo4jRelationshipFormState()
    const { names } = useNodeNames()
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        setFormValid(![name, nodeA, nodeB].some(x => x === ''))
    }, [name, nodeA, nodeB])

    const uniquenames = [...new Set(names)]
    const nodeOptions = uniquenames.map(n => ({ id: n, name: n }))

    const handleOnChangePrimaryNode = (value: string) => setNodeA(value)

    const handleOnChangeSecondaryNode = (value: string) => setNodeB(value)

    const handleOnChangeName = (value: string) => setName(value)

    const handleOnKeyValueChange = (keyValueData: KeyValueData[]) => setProperties(keyValueData)

    const handleOnSave = async () => {
        if (formValid) {
            let neo4jRelatonship: CreateNeo4jRelationshipDTO = {
                name,
                nodeA,
                nodeB
            }
            if (properties && properties.length > 0) {
                const props: Record<string, any> = {}
                for(let np of properties) {
                    props[np.key] = np.value
                }
                neo4jRelatonship = {
                    ...neo4jRelatonship,
                    properties: props
                }
            }
            await createNeo4jRelationship(neo4jRelatonship)
                .then(() => swal(`Información`, `Relación Neo4j ${name} Guardada!`, "success"))
                .catch(e => swal(`Error`, `Relación Neo4j ${name} no pudo ser guardada ${e.message}`, "error"))
                // .finally(() => handleOnCancel())
        }
    }

    const handleOnCancel = () => {
        setName('')
        setNodeA('')
        setNodeB('')
        setProperties([])
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <SelectEntityInput title="Nodo Primario" value={nodeA} options={nodeOptions} onChange={handleOnChangePrimaryNode} />
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ textAlign: 'center' }}>
                        <ArrowForwardIcon color="success" sx={{ fontSize: 40 }} />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <SelectEntityInput title="Nodo Secundario" value={nodeB} options={nodeOptions} onChange={handleOnChangeSecondaryNode} />
                </Grid>
                <Grid item xs={10}>
                    <NewRelationshipInput value={name} onChange={handleOnChangeName} />
                </Grid>
                <Grid item xs={12}>
                    <KeyValueInput value={properties} onChange={handleOnKeyValueChange} />
                </Grid>
                <Grid item xs={10}>
                    <SaveAndCancelButtons disabled={!formValid} onCancel={handleOnCancel} onSave={handleOnSave} />
                </Grid>
            </Grid>
        </Box>
    )
}