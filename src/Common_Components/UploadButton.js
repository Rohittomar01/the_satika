import React from 'react';
import { Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styled from 'styled-components';

const VisuallyHiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const UploadButton = ({ handleFile }) => {
  return (
    <Button
      fullWidth
      component="label"
      variant="text"
      startIcon={<AddPhotoAlternateIcon sx={{ width: 30, height: 30 }} />}
    >
      Upload
      <VisuallyHiddenInput
        type="file"
        name="file"
        onChange={handleFile}
        multiple={false}
      />
    </Button>
  );
};

export default UploadButton;
