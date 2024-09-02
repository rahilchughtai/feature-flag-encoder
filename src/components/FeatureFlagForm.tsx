import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { FeatureFlagChipData, FeatureFlagEncoding } from '../models/featureFlagModel';
import { encodeFlags } from '../utils/encoder';


interface FeatureFlagsFormProps {
  featureFlags: FeatureFlagChipData[];
  setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlagChipData[]>>;
  flagText: string;
  setFlagText: React.Dispatch<React.SetStateAction<string>>;
  setEncodingList: React.Dispatch<React.SetStateAction<FeatureFlagEncoding[]>>;
  encodingTitle: string;
  setEncodingTitle: React.Dispatch<React.SetStateAction<string>>;
}


function FeatureFlagForm({ featureFlags, setFeatureFlags, flagText, setFlagText, setEncodingList,
  encodingTitle, setEncodingTitle
}: FeatureFlagsFormProps) {

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val.length >= 0 && val.length <= 10) {
      setFlagText(val);
    }
  }

  const handleEncodingTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setEncodingTitle(val);
  }

  const genereateEncoding = () => {
    if (featureFlags.length === 0) {
      return;
    }
    const featureFlagsCopy = [...featureFlags];
    const encoding = encodeFlags(featureFlagsCopy);
    setEncodingList((eList) => [{ encodingTitle, encoding, featureFlags: featureFlagsCopy }, ...eList]);
    setFeatureFlags([]);
    setEncodingTitle('');
    setFlagText('');
  }

  const addFeatureFlag = () => {
    if (flagText.length === 0) {
      return
    }
    setFeatureFlags(flags => [...flags, {
      key: flags.length,
      label: flagText,
      enabled: true
    }]);
    setFlagText('')
  }


  const onSpecialKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addFeatureFlag()
    }
  }

  return (
    <Box
      display={'flex'}
      sx={{flexDirection: {xs: 'column', md: 'row'}}}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'1em'}
    >
      <TextField
        onKeyDown={onSpecialKeyDown}
        onChange={handleTextChange}
        value={flagText}
        style={{ width: '10%' }}
        id="outlined-basic"
        label="Enter your feature flags"
        variant="outlined"
      />
      <TextField
        onChange={handleEncodingTitleChange}
        value={encodingTitle}
        style={{ width: '20%' }}
        id="outlined-basic"
        label="Enter a Title for your Encoding"
        variant="outlined"
      />
      <Button
        onClick={addFeatureFlag}
        style={{
          padding: '1em',
          width: '6rem'
        }} size="large" variant="contained"
        color='info'
      >
        Add
      </Button>
      <Button
        onClick={genereateEncoding}
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