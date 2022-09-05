import * as React from 'react';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  disabled?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function SaveAndCancelButtons(props: Props) {
  return (
    <Stack direction="row" spacing={2}>
      <Button disabled={props.disabled} variant="contained" startIcon={<DoneIcon />} onClick={props.onSave} >
        Guardar
      </Button>
      <Button variant="outlined" endIcon={<CloseIcon />} onClick={props.onCancel}>
        Cancelar
      </Button>
    </Stack>
  );
}