import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CustomInputProps } from '../../../shared/utils/CustomInputProps';
import { NodeNameOptionsDTO } from '../../../../../core/application/dto/NodeNameOptionsDTO';

interface SelectEntityInputProps extends  CustomInputProps<string>{
  title?: string;
  options: NodeNameOptionsDTO [];
}

export default function SelectEntityInput(props: SelectEntityInputProps) {

  const { value, onChange, options, title} = props;

  const handleOnChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  }

  return (
      <FormControl fullWidth>
        <InputLabel id="select-node">{title}</InputLabel>
        <Select
          labelId="select-node"
          id="node-select"
          value={value}
          label="Entidad"
          onChange={handleOnChange}
        >
          { options.map(o => <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>)}
        </Select>
      </FormControl>
  );
}
