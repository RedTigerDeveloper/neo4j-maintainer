import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { CustomInputProps } from '../../../shared/utils/CustomInputProps';



export default function NameEntityInput(props: CustomInputProps<string>) {
 
  const { value, onChange, ...rest } = props;
  const [error, setError] = useState({ error: false })

  const handleOnChange = (event: any) => {
    onChange(event.target.value)
    setError({ error: (event.target.value === '')})
  }

  return (
    <FormControl fullWidth>
        <TextField
          id="outlined-name"
          error={error.error}
          {...rest}
          label="Nombre"
          // value={transformValue(value)}
          value={value}
          placeholder="Ingrese el nombre del nodo"
          onChange={handleOnChange}
        />
      </FormControl>
  );
}
