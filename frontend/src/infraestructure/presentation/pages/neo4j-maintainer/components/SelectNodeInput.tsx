import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { getNodeTypes } from '../../../../../core/domain/service/getNodeTypes';
import { CustomInputProps } from '../../../shared/utils/CustomInputProps';

interface NodeOptionType {
  inputValue?: string;
  title: string;
}

const filter = createFilterOptions<NodeOptionType>();

export default function SelectNodeInput(props: CustomInputProps<string>) {

  const { value, onChange } = props;
  const [error, setError] = useState({ error: false })

  const validate = (value: string) => {
    setError({ error: (value === '')})
    onChange(value)
  }

  const handleOnChange = (event: any, newValue: any) => {
    if (typeof newValue === 'string') {
      validate(newValue);
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      validate(newValue.inputValue);
    } else if (newValue) {
      validate(newValue.title);
    }
  }

  const filterOptions = (options: NodeOptionType[], params: any) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.title);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        title: `Crear Nodo "${inputValue}"`,
      });
    }
    return filtered;
  }

  const getOptionLabel = (option: any) => {
    // Value selected with enter, right from the input
    if (typeof option === 'string') {
      return option;
    }
    // Add "xxx" option created dynamically
    if (option.inputValue) {
      return option.inputValue;
    }
    // Regular option
    return option.title;
  }

  const nodeOptions = getNodeTypes().map(x => ({ title: x }as NodeOptionType))

  return (
    <Autocomplete
      value={value}
      onChange={handleOnChange}
      filterOptions={filterOptions}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="node-type"
      options={nodeOptions}
      getOptionLabel={getOptionLabel}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField error={error.error} {...params} label="Nodo" />
      )}
    />
  );
}

