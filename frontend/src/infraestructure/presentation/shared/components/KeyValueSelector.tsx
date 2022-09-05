import React, { useState } from 'react';
import { Button, FormControl, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { KeyValueData } from '../../pages/neo4j-maintainer/dto/key-value-data.dto';

interface Props {
    onAddKeyValue: (value: KeyValueData) => void;
}

const defaultState = {
    key: '', 
    value: '' 
}

export function KeyValueSelector({ onAddKeyValue }: Props) {

    const [ state, setState] = useState<KeyValueData>(defaultState)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const handleOnAdd = (e: any) => {
        onAddKeyValue(state)
        setState(defaultState)
        setButtonDisabled(true)
    }

    const enableButtonAdd = (key: any, value: any) => {
        setButtonDisabled((key === '' || value === ''))
    }

    const handleOnChangeKey = (e: any) => {
        setState({...state, key: e.target.value})
        enableButtonAdd(e.target.value, state.value)
    }

    const handleOnChangeValue = (e: any) => {
        setState({...state, value: e.target.value})
        enableButtonAdd(state.key, e.target.value)
    }

    return (
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <TextField
                        id="key-input"
                        label="Llave"
                        value={state.key}
                        onChange={handleOnChangeKey}
                        placeholder="Ingrese la llave"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <TextField
                        id="value-input"
                        label="Valor"
                        value={state.value}
                        onChange={handleOnChangeValue}
                        placeholder="Ingrese el valor"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4} >
                <FormControl fullWidth>
                    <Button onClick={handleOnAdd} disabled={buttonDisabled} variant="contained" color="secondary" startIcon={<AddIcon />}  >
                        Agregar
                    </Button>
                </FormControl>
            </Grid>
        </Grid>
    )
}