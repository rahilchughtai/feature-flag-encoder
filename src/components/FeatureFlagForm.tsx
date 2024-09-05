import { Box, Button, SxProps, TextField, Theme } from '@mui/material'
import React, { createContext, useContext, useState } from 'react'


interface FeatureFlagsFormProps {
  children: React.ReactNode;
}
const FlagFormContext = createContext<{ flagText: string, setFlagText: React.Dispatch<React.SetStateAction<string>> }>({ flagText: '', setFlagText: () => { } });

function FeatureFlagForm({ children }: FeatureFlagsFormProps) {
  const [flagText, setFlagText] = useState('')
  return (
    <FlagFormContext.Provider value={{ flagText, setFlagText }} >
      <Box
        display={'flex'}
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'1em'}
      >
        {children}
      </Box>
    </FlagFormContext.Provider>
  )
}

interface FeatureFlagsTextFieldProps {
  onAddFeatureFlag: (flagText: string) => void;
  sx?: SxProps<Theme> | undefined
}



function FeatureFlagsTextField({ onAddFeatureFlag, sx }: FeatureFlagsTextFieldProps) {
  const { flagText, setFlagText } = useContext(FlagFormContext)

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val.length >= 0 && val.length <= 10) {
      setFlagText(val);
    }
  }

  const onSpecialKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      onAddFeatureFlag(flagText)
      setFlagText('')
    }
  }

  return (
    <TextField
      onKeyDown={onSpecialKeyDown}
      onChange={handleTextChange}
      value={flagText}
      sx={sx}
      id="outlined-basic"
      label="Enter your feature flags"
      variant="outlined"
    />
  )
}


interface AddButtonProps {
  onAddFeatureFlag: (flagText: string) => void;
}

function AddButton({ onAddFeatureFlag }: AddButtonProps) {
  const { flagText, setFlagText } = useContext(FlagFormContext)


  const handleAdd = () => {
    if (flagText.length === 0) {
      return;
    }
    onAddFeatureFlag(flagText)
    setFlagText('')
  }
  return (
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
  )
}



interface EncodeButtonProps {
  onGenereateEncoding: () => void;
}

function EncodeButton({ onGenereateEncoding }: EncodeButtonProps) {

  return (
    <Button
      onClick={onGenereateEncoding}
      color='primary' style={{
        padding: '1em',
        width: '6rem'
      }} size="large" variant="contained">
      Encode
    </Button>
  )
}



interface EncodingTextFieldProps {
  onEncodingTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  encodingTitle: string;
  sx?: SxProps<Theme> | undefined
}

function EncodingTextField({ onEncodingTitleChange, encodingTitle, sx }: EncodingTextFieldProps) {
  return (
    <TextField
      onChange={onEncodingTitleChange}
      value={encodingTitle}
      sx={sx}
      id="outlined-basic"
      label="Enter a Title for your Encoding"
      variant="outlined"
    />
  )
}


FeatureFlagForm.FlagTextField = FeatureFlagsTextField
FeatureFlagForm.AddButton = AddButton
FeatureFlagForm.EncodeButton = EncodeButton
FeatureFlagForm.EncodingTextField = EncodingTextField



export default FeatureFlagForm