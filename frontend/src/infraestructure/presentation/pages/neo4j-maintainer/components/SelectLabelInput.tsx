import React from 'react';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { Autocomplete, TextField } from '@mui/material';
import { CustomInputProps } from '../../../shared/utils/CustomInputProps';
import { useLabels } from '../hooks/useLabels';


export default function SelectLabelInput(props: CustomInputProps<string[]>) {
  
 const { value, onChange} = props;

 const { labels } = useLabels()

  return (
    <div>
      <FormControl fullWidth>
        <Autocomplete
        multiple
        id="autocomplete-labels"
        value={value}
        options={labels.map((option) => option)}
        onChange={(event: any, newValues: string[]) => {
          onChange(newValues)
        }}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) => value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Etiquetas"
            placeholder="Etiquetas nodo"
          />
        )}
      />
      </FormControl>
    </div>
  );
}
