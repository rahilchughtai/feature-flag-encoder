import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { FeatureFlagChipData, FeatureFlagEncoding } from '../models/featureFlagModel';
import { encodeFlags } from '../utils/encoder';


interface FeatureFlagsFormProps {
  featureFlags: FeatureFlagChipData[];
  encodingTitle: string;
  onEncodingTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGenereateEncoding: () => void;
  onAddFeatureFlag: (flagText: string) => void;

}


function FeatureFlagForm({ onAddFeatureFlag, encodingTitle, onEncodingTitleChange, onGenereateEncoding }: FeatureFlagsFormProps) {
  const [flagText, setFlagText] = useState('');
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val.length >= 0 && val.length <= 10) {
      setFlagText(val);
    }
  }


  const handleAdd = () => {
    if (flagText.length === 0) {
      return;
    }
    onAddFeatureFlag(flagText)
    setFlagText('')
  }

  const onSpecialKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      onAddFeatureFlag(flagText)
    }
  }

  return (
    <Box
      display={'flex'}
      sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'1em'}
    >
      <TextField
        onKeyDown={onSpecialKeyDown}
        onChange={handleTextChange}
        value={flagText}
        sx={{ width: { xs: '70%', md: '20%' } }}
        id="outlined-basic"
        label="Enter your feature flags"
        variant="outlined"
      />
      <TextField
        onChange={onEncodingTitleChange}
        value={encodingTitle}
        sx={{ width: { xs: '70%', md: '20%' } }}
        id="outlined-basic"
        label="Enter a Title for your Encoding"
        variant="outlined"
      />
      <Button
        onClick={handleAdd}
        style={{
          padding: '1em',
          width: '6rem'
        }} size="large" variant="contained"
        color='info'
      >
        Add
      </Button>
      <Button
        onClick={onGenereateEncoding}
        color='primary' style={{
          padding: '1em',
          width: '6rem'
        }} size="large" variant="contained">
        Encode
      </Button>
    </Box>
  )
}

export default FeatureFlagForm