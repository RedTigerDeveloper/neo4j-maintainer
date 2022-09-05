import * as React from 'react';
import { Grid } from '@mui/material';
import { KeyValueData } from '../../pages/neo4j-maintainer/dto/key-value-data.dto';
import { CustomInputProps } from '../utils/CustomInputProps';
import KeyValuePreview from './KeyValuePreview';
import { KeyValueSelector } from './KeyValueSelector';

interface Props extends CustomInputProps<KeyValueData[]> { }

export default function KeyValueInput({ value, onChange }: Props) {

    const handleOnKeyValueAdded = (keyValueData: KeyValueData) => {
        const sanitized: KeyValueData = {
            ...keyValueData,
            key: keyValueData.key.replaceAll(' ', '_')
        }
        onChange([
            ...value,
            sanitized
        ])
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <KeyValueSelector onAddKeyValue={handleOnKeyValueAdded} />
            </Grid>
            <Grid item xs={12} >
                <KeyValuePreview keyValueData={value} />
            </Grid>
        </Grid>

    )
}